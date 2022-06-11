import { CurrencyAmount, ETHER, JSBI, Percent, Price } from 'cd3d-dex-libs-sdk'
import {useCallback, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PairState, usePair } from '../../data/Reserves'
import { useTotalSupply } from '../../data/TotalSupply'

import { wrappedCurrency, wrappedCurrencyAmount } from '../../utils/wrappedCurrency'
import { useCurrencyBalances } from '../wallet/hooks'
import { typeInput } from './actions'
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {tryParseAmount} from "../../utils";
import {Field} from "../../constants";

const ZERO = JSBI.BigInt(0)

export function useMintState() {
    return useSelector((state) => state.mint)
}

export function useDerivedMintInfo(
    currencyA,
    currencyB
) {
    const { account, chainId } = useActiveWeb3React()

    const { independentField, typedValue, otherTypedValue } = useMintState()

    const dependentField = independentField === Field.CURRENCY_A ? Field.CURRENCY_B : Field.CURRENCY_A

    // tokens
    const currencies = useMemo(
        () => ({
            [Field.CURRENCY_A]: currencyA ?? undefined,
            [Field.CURRENCY_B]: currencyB ?? undefined,
        }),
        [currencyA, currencyB]
    )

    // pair
    const [pairState, pair] = usePair(currencies[Field.CURRENCY_A], currencies[Field.CURRENCY_B])
    const totalSupply = useTotalSupply(pair?.liquidityToken)

    console.log('parestate', pairState, totalSupply, pair)
    const noLiquidity =
        pairState === PairState.NOT_EXISTS || Boolean(totalSupply && JSBI.equal(totalSupply.raw, ZERO))

    // balances
    const balances = useCurrencyBalances(account ?? undefined, [
        currencies[Field.CURRENCY_A],
        currencies[Field.CURRENCY_B],
    ])
    const currencyBalances = {
        [Field.CURRENCY_A]: balances[0],
        [Field.CURRENCY_B]: balances[1],
    }

    // amounts
    const independentAmount = tryParseAmount(typedValue, currencies[independentField])
    const dependentAmount = useMemo(() => {
        if (noLiquidity) {
            if (otherTypedValue && currencies[dependentField]) {
                return tryParseAmount(otherTypedValue, currencies[dependentField])
            }
            return undefined
        }
        if (independentAmount) {
            // we wrap the currencies just to get the price in terms of the other token
            const wrappedIndependentAmount = wrappedCurrencyAmount(independentAmount, chainId)
            const [tokenA, tokenB] = [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
            if (tokenA && tokenB && wrappedIndependentAmount && pair) {
                const dependentCurrency = dependentField === Field.CURRENCY_B ? currencyB : currencyA
                const dependentTokenAmount =
                    dependentField === Field.CURRENCY_B
                        ? pair.priceOf(tokenA).quote(wrappedIndependentAmount)
                        : pair.priceOf(tokenB).quote(wrappedIndependentAmount)
                return dependentCurrency === ETHER ? CurrencyAmount.ether(dependentTokenAmount.raw) : dependentTokenAmount
            }
            return undefined
        }
        return undefined
    }, [noLiquidity, otherTypedValue, currencies, dependentField, independentAmount, currencyA, chainId, currencyB, pair])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const parsedAmounts = {
        [Field.CURRENCY_A]: independentField === Field.CURRENCY_A ? independentAmount : dependentAmount,
        [Field.CURRENCY_B]: independentField === Field.CURRENCY_A ? dependentAmount : independentAmount,
    }

    const price = useMemo(() => {
        if (noLiquidity) {
            const { [Field.CURRENCY_A]: currencyAAmount, [Field.CURRENCY_B]: currencyBAmount } = parsedAmounts
            if (currencyAAmount && currencyBAmount) {
                return new Price(currencyAAmount.currency, currencyBAmount.currency, currencyAAmount.raw, currencyBAmount.raw)
            }
            return undefined
        }
        const wrappedCurrencyA = wrappedCurrency(currencyA, chainId)
        return pair && wrappedCurrencyA ? pair.priceOf(wrappedCurrencyA) : undefined
    }, [chainId, currencyA, noLiquidity, pair, parsedAmounts])

    // liquidity minted
    const liquidityMinted = useMemo(() => {
        const { [Field.CURRENCY_A]: currencyAAmount, [Field.CURRENCY_B]: currencyBAmount } = parsedAmounts
        const [tokenAmountA, tokenAmountB] = [
            wrappedCurrencyAmount(currencyAAmount, chainId),
            wrappedCurrencyAmount(currencyBAmount, chainId),
        ]
        if (pair && totalSupply && tokenAmountA && tokenAmountB) {
            return pair.getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB)
        }
        return undefined
    }, [parsedAmounts, chainId, pair, totalSupply])

    const poolTokenPercentage = useMemo(() => {
        if (liquidityMinted && totalSupply) {
            return new Percent(liquidityMinted.raw, totalSupply.add(liquidityMinted).raw)
        }
        return undefined
    }, [liquidityMinted, totalSupply])

    let error
    if (!account) {
        error = 'Connect Wallet'
    }

    if (pairState === PairState.INVALID) {
        error = error ?? 'Invalid pair'
    }

    if (!parsedAmounts[Field.CURRENCY_A] || !parsedAmounts[Field.CURRENCY_B]) {
        error = error ?? 'Enter an amount'
    }

    const { [Field.CURRENCY_A]: currencyAAmount, [Field.CURRENCY_B]: currencyBAmount } = parsedAmounts

    if (currencyAAmount && currencyBalances?.[Field.CURRENCY_A]?.lessThan(currencyAAmount)) {
        error = `Insufficient ${currencies[Field.CURRENCY_A]?.symbol} balance`
    }

    if (currencyBAmount && currencyBalances?.[Field.CURRENCY_B]?.lessThan(currencyBAmount)) {
        error = `Insufficient ${currencies[Field.CURRENCY_B]?.symbol} balance`
    }

    return {
        dependentField,
        currencies,
        pair,
        pairState,
        currencyBalances,
        parsedAmounts,
        price,
        noLiquidity,
        liquidityMinted,
        poolTokenPercentage,
        error,
    }
}

export function useMintActionHandlers(
    noLiquidity
) {
    const dispatch = useDispatch()

    const onFieldAInput = useCallback((event) => {
            dispatch(typeInput({ field: Field.CURRENCY_A, typedValue: event.target.value, noLiquidity: noLiquidity === true }))
        }, [ noLiquidity ]);
    const onFieldBInput = useCallback((event) => {
            dispatch(typeInput({ field: Field.CURRENCY_B, typedValue: event.target.value, noLiquidity: noLiquidity === true }))
        }, [ noLiquidity ]);

    return {
        onFieldAInput,
        onFieldBInput,
    }
}
