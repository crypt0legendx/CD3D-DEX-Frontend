import { ChainId } from 'cd3d-dex-libs-sdk'
import addresses from '../constants/contracts'
import {NETWORK_CHAIN_ID} from "../connectors";

export const getAddress = (address) => {
    return address[NETWORK_CHAIN_ID] ? address[NETWORK_CHAIN_ID] : address[ChainId.MAINNET]
}

export const getMasterChefAddress = () => {
    return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
    return getAddress(addresses.multiCall)
}
// export const getLotteryV2Address = () => {
//     return getAddress(addresses.lotteryV2)
// }
// export const getPancakeProfileAddress = () => {
//     return getAddress(addresses.pancakeProfile)
// }
// export const getPancakeRabbitsAddress = () => {
//     return getAddress(addresses.pancakeRabbits)
// }
// export const getBunnyFactoryAddress = () => {
//     return getAddress(addresses.bunnyFactory)
// }
// export const getClaimRefundAddress = () => {
//     return getAddress(addresses.claimRefund)
// }
// export const getPointCenterIfoAddress = () => {
//     return getAddress(addresses.pointCenterIfo)
// }
// export const getBunnySpecialAddress = () => {
//     return getAddress(addresses.bunnySpecial)
// }
// export const getTradingCompetitionAddress = () => {
//     return getAddress(addresses.tradingCompetition)
// }
// export const getEasterNftAddress = () => {
//     return getAddress(addresses.easterNft)
// }
// export const getCakeVaultAddress = () => {
//     return getAddress(addresses.cakeVault)
// }
// export const getPredictionsAddress = () => {
//     return getAddress(addresses.predictions)
// }
// export const getChainlinkOracleAddress = () => {
//     return getAddress(addresses.chainlinkOracle)
// }
// export const getBunnySpecialCakeVaultAddress = () => {
//     return getAddress(addresses.bunnySpecialCakeVault)
// }
// export const getBunnySpecialPredictionAddress = () => {
//     return getAddress(addresses.bunnySpecialPrediction)
// }
// export const getBunnySpecialLotteryAddress = () => {
//     return getAddress(addresses.bunnySpecialLottery)
// }
// export const getFarmAuctionAddress = () => {
//     return getAddress(addresses.farmAuction)
// }
// export const getAnniversaryAchievement = () => {
//     return getAddress(addresses.AnniversaryAchievement)
// }
// export const getNftMarketAddress = () => {
//     return getAddress(addresses.nftMarket)
// }
// export const getNftSaleAddress = () => {
//     return getAddress(addresses.nftSale)
// }
// export const getPancakeSquadAddress = () => {
//     return getAddress(addresses.pancakeSquad)
// }
