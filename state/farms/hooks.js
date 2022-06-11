import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../index'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getBalanceAmount } from '../../utils/formatBalance'
import { farmsConfig } from '../../constants'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync, nonArchivedFarms } from '.'
import {deserializeToken} from "../../utils/tokenHelpers";
import useRefresh from "../../hooks/useRefresh";
import {NETWORK_CHAIN_ID} from "../../connectors";
import {ChainId} from "cd3d-dex-libs-sdk";

const deserializeFarmUserData = (farm) => {
    return {
        allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
        tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
        stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
        earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
    }
}

const deserializeFarm = (farm) => {
    const { lpAddresses, lpSymbol, pid, dual, multiplier, isCommunity, quoteTokenPriceBusd, tokenPriceBusd } = farm

    return {
        lpAddresses,
        lpSymbol,
        pid,
        dual,
        multiplier,
        isCommunity,
        quoteTokenPriceBusd,
        tokenPriceBusd,
        token: deserializeToken(farm.token),
        quoteToken: deserializeToken(farm.quoteToken),
        userData: deserializeFarmUserData(farm),
        tokenAmountTotal: farm.tokenAmountTotal ? new BigNumber(farm.tokenAmountTotal) : BIG_ZERO,
        lpTokenBalanceMC: farm.lpTokenBalanceMC ? new BigNumber(farm.lpTokenBalanceMC) : BIG_ZERO,
        lpTotalInQuoteToken: farm.lpTotalInQuoteToken ? new BigNumber(farm.lpTotalInQuoteToken) : BIG_ZERO,
        lpTotalSupply: farm.lpTotalSupply ? new BigNumber(farm.lpTotalSupply) : BIG_ZERO,
        tokenPriceVsQuote: farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO,
        poolWeight: farm.poolWeight ? new BigNumber(farm.poolWeight) : BIG_ZERO,
    }
}

export const usePollFarmsPublicData = (includeArchive = false) => {
    const dispatch = useAppDispatch()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
        const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

        dispatch(fetchFarmsPublicDataAsync(pids))
    }, [includeArchive, dispatch, slowRefresh])
}

export const usePollFarmsWithUserData = (includeArchive = false) => {
    const dispatch = useAppDispatch()
    const { slowRefresh } = useRefresh()
    const { account } = useWeb3React()

    useEffect(() => {
        const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
        const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)
        dispatch(fetchFarmsPublicDataAsync(pids))

        if (account) {
            dispatch(fetchFarmUserDataAsync({ account, pids }))
        }
    }, [includeArchive, dispatch, slowRefresh, account])
}

/**
 * Fetches the "core" farms data used globally
 * 251 = CD3D-BNB LP
 * 252 = BUSD-BNB LP
 */
export const usePollCoreFarmData = () => {
    const dispatch = useAppDispatch()
    const { fastRefresh } = useRefresh()

    useEffect(() => {
        dispatch(fetchFarmsPublicDataAsync([1, 2]))
    }, [dispatch, fastRefresh])
}

export const useFarms = () => {
    const farms = useSelector((state) => state.farms)
    const deserializedFarmsData = farms.data.map(deserializeFarm)
    console.log('state farms', deserializedFarmsData);
    const { loadArchivedFarmsData, userDataLoaded } = farms
    return {
        loadArchivedFarmsData,
        userDataLoaded,
        data: deserializedFarmsData,
    }
}

export const useFarmFromPid = (pid) => {
    const farm = useSelector((state) => state.farms.data.find((f) => f.pid === pid))
    return deserializeFarm(farm)
}

export const useFarmFromLpSymbol = (lpSymbol) => {
    const farm = useSelector((state) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
    return deserializeFarm(farm)
}

export const useFarmFromTokenSymbols = (symbol1, symbol2) => {
    console.log('farm', symbol1, symbol2);
    const farm = useSelector((state) =>
        state.farms.data.find((f) => (f.token.symbol === symbol1 && f.quoteToken.symbol === symbol2) || (f.token.symbol === symbol2 && f.quoteToken.symbol === symbol1)))
    if(!farm) return undefined;
    return deserializeFarm(farm)
}

export const useFarmUser = (pid) => {
    const { userData } = useFarmFromPid(pid)
    const { allowance, tokenBalance, stakedBalance, earnings } = userData
    return {
        allowance,
        tokenBalance,
        stakedBalance,
        earnings,
    }
}

// Return the base token price for a farms, from a given pid
export const useBusdPriceFromPid = (pid) => {
    const farm = useFarmFromPid(pid)
    return farm && new BigNumber(farm.tokenPriceBusd)
}

export const useLpTokenPrice = (symbol) => {
    const farm = useFarmFromLpSymbol(symbol)
    const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid)
    let lpTokenPrice = BIG_ZERO

    if (farm.lpTotalSupply.gt(0) && farm.lpTotalInQuoteToken.gt(0)) {
        // Total value of base token in LP
        const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
        // Double it to get overall value in LP
        const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
        // Divide total value of all tokens, by the number of LP tokens
        const totalLpTokens = getBalanceAmount(farm.lpTotalSupply)
        lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
    }

    return lpTokenPrice
}

// /!\ Deprecated , use the BUSD hook in /hooks

export const usePriceCd3dBusd = () => {
    const cd3dBnbFarm = useFarmFromPid(1)

    const cd3dPriceBusdAsString = cd3dBnbFarm.tokenPriceBusd

    const cd3dPriceBusd = useMemo(() => {
        return new BigNumber(cd3dPriceBusdAsString)
    }, [cd3dPriceBusdAsString])

    return cd3dPriceBusd
}
