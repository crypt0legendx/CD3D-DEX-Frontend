import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import farmsConfig from '../../constants/farms'
import isArchivedPid from '../../utils/farmHelpers'
import priceHelperLpsConfig from '../../constants/priceHelperLps'
import fetchFarms from './fetchFarms'
import fetchFarmsPrices from './fetchFarmsPrices'
import {
    fetchFarmUserEarnings,
    fetchFarmUserAllowances,
    fetchFarmUserTokenBalances,
    fetchFarmUserStakedBalances,
} from './fetchFarmUser'

const noAccountFarmConfig = farmsConfig.map((farm) => ({
    ...farm,
    userData: {
        allowance: '0',
        tokenBalance: '0',
        stakedBalance: '0',
        earnings: '0',
    },
}))

const initialState = {
    data: noAccountFarmConfig,
    loadArchivedFarmsData: false,
    userDataLoaded: false,
}

export const nonArchivedFarms = farmsConfig.filter(({ pid }) => !isArchivedPid(pid))

// Async thunks
export const fetchFarmsPublicDataAsync = createAsyncThunk(
    'farms/fetchFarmsPublicDataAsync',
    async (pids) => {
        const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))

        // Add price helper farms
        //const farmsWithPriceHelpers = farmsToFetch.concat(priceHelperLpsConfig)

        const farms = await fetchFarms(farmsToFetch)
        //const farms = await fetchFarms(farmsWithPriceHelpers)
        console.log('fetch farms', farms);

        const farmsWithPrices = await fetchFarmsPrices(farms)

        // Filter out price helper LP config farms
        const farmsWithoutHelperLps = farmsWithPrices.filter((farm) => {
            return farm.pid || farm.pid === 0
        })

        return farmsWithoutHelperLps
    },
)

export const fetchFarmUserDataAsync = createAsyncThunk(
    'farms/fetchFarmUserDataAsync',
    async ({ account, pids }) => {
        const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))
        const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch)
        const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch)
        const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch)
        const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch)

        console.log('fetch farms user data', farmsToFetch, userFarmAllowances, userFarmTokenBalances, userStakedBalances, userFarmEarnings);

        return userFarmAllowances.map((farmAllowance, index) => {
            return {
                pid: farmsToFetch[index].pid,
                allowance: userFarmAllowances[index],
                tokenBalance: userFarmTokenBalances[index],
                stakedBalance: userStakedBalances[index],
                earnings: userFarmEarnings[index],
            }
        })
    },
)

export const farmsSlice = createSlice({
    name: 'Farms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Update farms with live data
        builder.addCase(fetchFarmsPublicDataAsync.fulfilled, (state, action) => {
            state.data = state.data.map((farm) => {
                const liveFarmData = action.payload.find((farmData) => farmData.pid === farm.pid)
                return { ...farm, ...liveFarmData }
            })
        })

        // Update farms with user data
        builder.addCase(fetchFarmUserDataAsync.fulfilled, (state, action) => {
            action.payload.forEach((userDataEl) => {
                const { pid } = userDataEl
                const index = state.data.findIndex((farm) => farm.pid === pid)
                state.data[index] = { ...state.data[index], userData: userDataEl }
            })
            state.userDataLoaded = true
        })
    },
})

export default farmsSlice.reducer
