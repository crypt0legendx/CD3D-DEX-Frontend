import { MaxUint256 } from '@ethersproject/constants'
import {TokenAmount, ETHER, ChainId, CurrencyAmount, WETH} from 'cd3d-dex-libs-sdk'
import { useCallback, useMemo } from 'react'
import { ROUTER_ADDRESS, Field } from '../constants'
import { useTokenAllowance } from '../data/Allowances'
import { useTransactionAdder, useHasPendingApproval } from '../state/transactions/hooks'
import { computeSlippageAdjustedAmounts } from '../utils/prices'
import { calculateGasMargin } from '../utils'
import { useTokenContract } from './useContract'
import useActiveWeb3React from "./useActiveWeb3React";
import {NETWORK_CHAIN_ID} from "../connectors";
import tokens from "../constants/tokens";
import {showToast} from "../utils/toast";

export const ApprovalState = {
    UNKNOWN: 0,
    NOT_APPROVED: 1,
    PENDING: 2,
    APPROVED: 3,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
    amountToApprove,
    spender
) {
    const { account } = useActiveWeb3React()
    const token = amountToApprove instanceof TokenAmount ? amountToApprove.token : ( amountToApprove instanceof CurrencyAmount && NETWORK_CHAIN_ID === ChainId.TESTNET ? WETH[ChainId.TESTNET]: undefined)
    const currentAllowance = useTokenAllowance(token, account ?? undefined, spender)
    const pendingApproval = useHasPendingApproval(token?.address, spender)

    // check the current approval status
    const approvalState = useMemo(() => {
        if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
        if (amountToApprove.currency === ETHER && NETWORK_CHAIN_ID === ChainId.MAINNET) return ApprovalState.APPROVED
        // we might not have enough data to know whether or not we need to approve
        if (!currentAllowance) return ApprovalState.UNKNOWN

        // amountToApprove will be defined if currentAllowance is
        return currentAllowance.lessThan(amountToApprove)
            ? pendingApproval
                ? ApprovalState.PENDING
                : ApprovalState.NOT_APPROVED
            : ApprovalState.APPROVED
    }, [amountToApprove, currentAllowance, pendingApproval, spender])

    const tokenContract = useTokenContract(token?.address)
    const addTransaction = useTransactionAdder()

    const approve = useCallback(async () => {
        if (approvalState !== ApprovalState.NOT_APPROVED) {
            console.error('approve was called unnecessarily')
            return
        }
        if (!token) {
            console.error('no token')
            return
        }

        if (!tokenContract) {
            console.error('tokenContract is null')
            return
        }

        if (!amountToApprove) {
            console.error('missing amount to approve')
            return
        }

        if (!spender) {
            console.error('no spender')
            return
        }

        let useExact = false
        const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
            // general fallback for tokens who restrict approval amounts
            useExact = true
            return tokenContract.estimateGas.approve(spender, amountToApprove.raw.toString())
        })

        // eslint-disable-next-line consistent-return
        return tokenContract
            .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
                gasLimit: calculateGasMargin(estimatedGas),
            })
            .then((response) => {
                addTransaction(response, {
                    summary: `Approve ${amountToApprove.currency.symbol}`,
                    approval: { tokenAddress: token.address, spender },
                })
                showToast("success", "Approved!", "Remove Liquidity Approved");
            })
            .catch((error) => {
                console.error('Failed to approve token', error);
                showToast("error", "Transaction Failed", error?.message ?? '');
                throw error
            })
    }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction])

    console.log('approve', token, approvalState);
    return [approvalState, approve]
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(trade, allowedSlippage = 0) {
    const amountToApprove = useMemo(
        () => (trade ? computeSlippageAdjustedAmounts(trade, allowedSlippage)[Field.CURRENCY_A] : undefined),
        [trade, allowedSlippage]
    )
    return useApproveCallback(amountToApprove, ROUTER_ADDRESS)
}
