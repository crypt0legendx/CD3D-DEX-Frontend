import { ChainId, Token } from 'cd3d-dex-libs-sdk'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

/**
 * Token instances created from token info.
 */
export class WrappedTokenInfo extends Token {

    tokenInfo

    tags

    constructor(tokenInfo, tags) {
        super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name)
        this.tokenInfo = tokenInfo
        this.tags = tags
    }

    get logoURI() {
        return this.tokenInfo.logoURI;
    }
}

/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST = {
    [ChainId.MAINNET]: {},
    [ChainId.TESTNET]: {}
}

const listCache =
    typeof WeakMap !== 'undefined' ? new WeakMap() : null

export function listToTokenMap(list) {
    const result = listCache?.get(list)
    if (result) return result

    const map = list.tokens.reduce(
        (tokenMap, tokenInfo) => {
            const tags =
                tokenInfo.tags
                    ?.map(tagId => {
                        if (!list.tags?.[tagId]) return undefined
                        return { ...list.tags[tagId], id: tagId }
                    })
                    ?.filter((x) => Boolean(x)) ?? []
            const token = new WrappedTokenInfo(tokenInfo, tags)
            if (tokenMap[token.chainId][token.address] !== undefined) throw Error('Duplicate tokens.')
            return {
                ...tokenMap,
                [token.chainId]: {
                    ...tokenMap[token.chainId],
                    [token.address]: token
                }
            }
        },
        { ...EMPTY_LIST }
    )
    listCache?.set(list, map)
    return map
}

export function useTokenList(url) {
    const lists = useSelector(state => state.lists.byUrl)
    return useMemo(() => {
        if (!url) return EMPTY_LIST
        const current = lists[url]?.current
        if (!current) return EMPTY_LIST
        try {
            return listToTokenMap(current)
        } catch (error) {
            console.error('Could not show token lists due to error', error)
            return EMPTY_LIST
        }
    }, [lists, url])
}

export function useSelectedListUrl() {
    return useSelector(state => state.lists.selectedListUrl)
}

export function useSelectedTokenList() {
    return useTokenList(useSelectedListUrl())
}

export function useSelectedListInfo() {
    const selectedUrl = useSelectedListUrl()
    const listsByUrl = useSelector(state => state.lists.byUrl)
    const list = selectedUrl ? listsByUrl[selectedUrl] : undefined
    return {
        current: list?.current ?? null,
        pending: list?.pendingUpdate ?? null,
        loading: list?.loadingRequestId !== null
    }
}

// returns all downloaded current lists
export function useAllLists() {
    const lists = useSelector(state => state.lists.byUrl)

    return useMemo(
        () =>
            Object.keys(lists)
                .map(url => lists[url].current)
                .filter((l) => Boolean(l)),
    [lists]
    )
}
