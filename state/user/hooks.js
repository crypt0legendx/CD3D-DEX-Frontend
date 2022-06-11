import { ChainId, Pair, Token } from 'cd3d-dex-libs-sdk'
import flatMap from 'lodash.flatmap'
import { useCallback, useMemo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from '../../constants'

// eslint-disable-next-line import/no-cycle
import { useAllTokens } from '../../hooks/Tokens'

import {
    addSerializedPair,
    addSerializedToken,
    removeSerializedToken,
    updateUserDarkMode,
    updateUserDeadline,
    updateUserExpertMode,
    updateUserSlippageTolerance,
    muteAudio,
    unmuteAudio,
} from './actions'
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {GAS_PRICE_GWEI} from "../../utils/tokenHelpers";
import {NETWORK_CHAIN_ID} from "../../connectors";


function serializeToken(token) {
    return {
        chainId: token.chainId,
        address: token.address,
        decimals: token.decimals,
        symbol: token.symbol,
        name: token.name,
    }
}

function deserializeToken(serializedToken) {
    return new Token(
        serializedToken.chainId,
        serializedToken.address,
        serializedToken.decimals,
        serializedToken.symbol,
        serializedToken.name
    )
}

export function useUserSlippageTolerance() {
    const dispatch = useDispatch()
    const userSlippageTolerance = useSelector((state) => {
        return state.user.userSlippageTolerance
    })

    const setUserSlippageTolerance = useCallback(
        (slippageTolerance) => {
            dispatch(updateUserSlippageTolerance({ userSlippageTolerance: slippageTolerance }))
        },
        [dispatch]
    )

    return [userSlippageTolerance, setUserSlippageTolerance]
}

export function useUserDeadline() {
    const dispatch = useDispatch()
    const userDeadline = useSelector((state) => {
        return state.user.userDeadline
    })

    const setUserDeadline = useCallback(
        (deadline) => {
            dispatch(updateUserDeadline({ userDeadline: deadline }))
        },
        [dispatch]
    )

    return [userDeadline, setUserDeadline]
}

export function useAddUserToken() {
    const dispatch = useDispatch()
    return useCallback(
        (token) => {
            dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
        },
        [dispatch]
    )
}

export function useRemoveUserAddedToken() {
    const dispatch = useDispatch()
    return useCallback(
        (chainId, address) => {
            dispatch(removeSerializedToken({ chainId, address }))
        },
        [dispatch]
    )
}

export function useUserAddedTokens() {
    const { chainId } = useActiveWeb3React()
    const serializedTokensMap = useSelector(({ user: { tokens } }) => tokens)

    return useMemo(() => {
        if (!chainId) return []
        return Object.values(serializedTokensMap[chainId] ?? {}).map(deserializeToken)
    }, [serializedTokensMap, chainId])
}

function serializePair(pair) {
    return {
        token0: serializeToken(pair.token0),
        token1: serializeToken(pair.token1),
    }
}

export function usePairAdder(){
    const dispatch = useDispatch()

    return useCallback(
        (pair) => {
            dispatch(addSerializedPair({ serializedPair: serializePair(pair) }))
        },
        [dispatch]
    )
}

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]) {
    return new Token(tokenA.chainId, Pair.getAddress(tokenA, tokenB), 18, 'CD3D-LP', 'CD3D LPs')
}

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs() {
    const { chainId } = useActiveWeb3React()
    const tokens = useAllTokens()

    // pinned pairs
    const pinnedPairs = useMemo(() => (chainId ? PINNED_PAIRS[chainId] ?? [] : []), [chainId])

    // pairs for every token against every base
    const generatedPairs = useMemo(
        () =>
            chainId
                ? flatMap(Object.keys(tokens), (tokenAddress) => {
                    const token = tokens[tokenAddress]
                    // for each token on the current chain,
                    return (
                        // loop though all bases on the current chain
                        (BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                            // to construct pairs of the given token with each base
                            .map((base) => {
                                if (base.address === token.address) {
                                    return null
                                }
                                return [base, token]
                            })
                            .filter((p) => p !== null)
                )
                })
                : [],
        [tokens, chainId]
    )

    // pairs saved by users
    const savedSerializedPairs = useSelector(({ user: { pairs } }) => pairs)

    const userPairs = useMemo(() => {
        if (!chainId || !savedSerializedPairs) return []
        const forChain = savedSerializedPairs[chainId]
        if (!forChain) return []

        return Object.keys(forChain).map((pairId) => {
            return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)]
        })
    }, [savedSerializedPairs, chainId])

    const combinedList = useMemo(() => userPairs.concat(generatedPairs).concat(pinnedPairs), [
        generatedPairs,
        pinnedPairs,
        userPairs,
    ])

    return useMemo(() => {
        // dedupes pairs of tokens in the combined lists
        const keyed = combinedList.reduce((memo, [tokenA, tokenB]) => {
            const sorted = tokenA.sortsBefore(tokenB)
            const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`
            if (memo[key]) return memo
            memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA]
            return memo
        }, {})

        return Object.keys(keyed).map((key) => keyed[key])
    }, [combinedList])
}


export function useGasPrice() {
    const userGas = useSelector((state) => state.user.gasPrice)
    return NETWORK_CHAIN_ID === ChainId.MAINNET.toString() ? userGas : GAS_PRICE_GWEI.testnet
}
