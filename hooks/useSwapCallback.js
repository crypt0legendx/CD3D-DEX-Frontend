import { JSBI, Percent, Router, TradeType } from 'cd3d-dex-libs-sdk'
import { useMemo } from 'react'
import { BIPS_BASE, DEFAULT_DEADLINE_FROM_NOW, INITIAL_ALLOWED_SLIPPAGE } from '../constants'
import { useTransactionAdder } from '../state/transactions/hooks'
import isZero, { calculateGasMargin, getRouterContract, isAddress, shortenAddress } from '../utils'
import {useENS} from './useENS'
import useActiveWeb3React from "./useActiveWeb3React";

class SwapCallbackState {
    static INVALID = 1
    static LOADING = 2
    static VALID = 3
}

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param deadline the deadline for the trade
 * @param recipientAddressOrName
 */
function useSwapCallArguments(
    trade, // trade to execute, required
    allowedSlippage= INITIAL_ALLOWED_SLIPPAGE, // in bips
    deadline = DEFAULT_DEADLINE_FROM_NOW, // in seconds from now
    recipientAddressOrName // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
) {
    const { account, chainId, library } = useActiveWeb3React()

    const { address: recipientAddress } = useENS(recipientAddressOrName)
    const recipient = recipientAddressOrName === null ? account : recipientAddress

    return useMemo(() => {
        if (!trade || !recipient || !library || !account || !chainId) return []

        const contract = getRouterContract(chainId, library, account)
        if (!contract) {
            return []
        }

        const swapMethods = []

        swapMethods.push(
            // @ts-ignore
            Router.swapCallParameters(trade, {
                feeOnTransfer: false,
                allowedSlippage: new Percent(JSBI.BigInt(Math.floor(allowedSlippage)), BIPS_BASE),
                recipient,
                ttl: deadline,
            })
        )

        if (trade.tradeType === TradeType.EXACT_INPUT) {
            swapMethods.push(
                // @ts-ignore
                Router.swapCallParameters(trade, {
                    feeOnTransfer: true,
                    allowedSlippage: new Percent(JSBI.BigInt(Math.floor(allowedSlippage)), BIPS_BASE),
                    recipient,
                    ttl: deadline,
                })
            )
        }

        return swapMethods.map((parameters) => ({ parameters, contract }))
    }, [account, allowedSlippage, chainId, deadline, library, recipient, trade])
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
    trade, // trade to execute, required
    allowedSlippage = INITIAL_ALLOWED_SLIPPAGE, // in bips
    deadline = DEFAULT_DEADLINE_FROM_NOW, // in seconds from now
) {
    const { account, chainId, library } = useActiveWeb3React()

    const swapCalls = useSwapCallArguments(trade, allowedSlippage, deadline, null)

    const addTransaction = useTransactionAdder()

    const recipient = account;

    return useMemo(() => {
        if (!trade || !library || !account || !chainId) {
            return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' }
        }
        if (!recipient) {
            return { state: SwapCallbackState.LOADING, callback: null, error: null }
        }

        return {
            state: SwapCallbackState.VALID,
            callback: async function onSwap() {
                const estimatedCalls = await Promise.all(
                    swapCalls.map((call) => {
                        const {
                            parameters: { methodName, args, value },
                            contract,
                        } = call
                        const options = !value || isZero(value) ? {} : { value }

                        console.log('args', args, methodName, value);
                        return contract.estimateGas[methodName](...args, options)
                            .then((gasEstimate) => {
                                return {
                                    call,
                                    gasEstimate,
                                }
                            })
                            .catch((gasError) => {
                                console.info('Gas estimate failed, trying eth_call to extract error', call)

                                return contract.callStatic[methodName](...args, options)
                                    .then((result) => {
                                        console.info('Unexpected successful call after failed estimate gas', call, gasError, result)
                                        return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') }
                                    })
                                    .catch((callError) => {
                                        console.info('Call threw error', call, callError)
                                        let errorMessage
                                        switch (callError.reason) {
                                            case 'CD3DRouter: INSUFFICIENT_OUTPUT_AMOUNT':
                                            case 'CD3DRouter: EXCESSIVE_INPUT_AMOUNT':
                                                errorMessage =
                                                    'This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.'
                                                break
                                            default:
                                                errorMessage = `The transaction cannot succeed due to error: ${callError.reason}. This is probably an issue with one of the tokens you are swapping.`
                                        }
                                        return { call, error: new Error(errorMessage) }
                                    })
                            })
                    })
                )

                // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
                const successfulEstimation = estimatedCalls.find(
                    (el, ix, list) =>
                    'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1])
            )

                if (!successfulEstimation) {
                    const errorCalls = estimatedCalls.filter((call) => 'error' in call)
                    if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error
                    throw new Error('Unexpected error. Please contact support: none of the calls threw an error')
                }

                const {
                    call: {
                        contract,
                        parameters: { methodName, args, value },
                    },
                    gasEstimate,
                } = successfulEstimation

                return contract[methodName](...args, {
                    gasLimit: calculateGasMargin(gasEstimate),
                    ...(value && !isZero(value) ? { value, from: account } : { from: account }),
                })
                    .then(async (response) => {
                        const inputSymbol = trade.inputAmount.currency.symbol
                        const outputSymbol = trade.outputAmount.currency.symbol
                        const inputAmount = trade.inputAmount.toSignificant(3)
                        const outputAmount = trade.outputAmount.toSignificant(3)

                        const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`
                        const withRecipient = recipient === base

                        addTransaction(response, {
                            summary: withRecipient,
                        })

                        await response.wait();
                        return response.hash
                    })
                    .catch((error) => {
                        // if the user rejected the tx, pass this along
                        if (error?.code === 4001) {
                            throw new Error('Transaction rejected.')
                        } else {
                            // otherwise, the error was unexpected and we need to convey that
                            console.error(`Swap failed`, error, methodName, args, value)
                            throw new Error(`Swap failed: ${error.message}`)
                        }
                    })
            },
            error: null,
        }
    }, [trade, library, account, chainId, recipient, swapCalls, addTransaction])
}

export default useSwapCallback
