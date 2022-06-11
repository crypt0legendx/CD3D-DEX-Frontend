import { ethers } from 'ethers'
import { simpleRpcProvider } from './providers'
// import { poolsConfig } from '../constants'
// import { PoolCategory } from '../constants/types'
// import tokens from '../constants/tokens'

// Addresses
import {
    getAddress,
    // getPancakeProfileAddress,
    // getPancakeRabbitsAddress,
    // getBunnyFactoryAddress,
    // getBunnySpecialAddress,
    // getLotteryV2Address,
    getMasterChefAddress,
    // getPointCenterIfoAddress,
    // getClaimRefundAddress,
    // getTradingCompetitionAddress,
    // getEasterNftAddress,
    // getCakeVaultAddress,
    // getPredictionsAddress,
    // getChainlinkOracleAddress,
    getMulticallAddress,
    // getBunnySpecialCakeVaultAddress,
    // getBunnySpecialPredictionAddress,
    // getBunnySpecialLotteryAddress,
    // getFarmAuctionAddress,
    // getAnniversaryAchievement,
    // getNftMarketAddress,
    // getNftSaleAddress,
    // getPancakeSquadAddress,
} from './addressHelpers'

// ABI
// import profileABI from '../constants/abis/pancakeProfile.json'
// import pancakeRabbitsAbi from '../constants/abis/pancakeRabbits.json'
// import bunnyFactoryAbi from '../constants/abis/bunnyFactory.json'
// import bunnySpecialAbi from '../constants/abis/bunnySpecial.json'
import bep20Abi from '../constants/abis/erc20.json'
// import erc721Abi from '../constants/abis/erc721.json'
// import lpTokenAbi from '../constants/abis/lpToken.json'
import cd3dAbi from '../constants/abis/cd3d.json'
// import ifoV1Abi from '../constants/abis/ifoV1.json'
// import ifoV2Abi from '../constants/abis/ifoV2.json'
// import pointCenterIfo from '../constants/abis/pointCenterIfo.json'
// import lotteryV2Abi from '../constants/abis/lotteryV2.json'
import masterChef from '../constants/abis/masterchef.json'
// import sousChef from '../constants/abis/sousChef.json'
// import sousChefV2 from '../constants/abis/sousChefV2.json'
// import sousChefBnb from '../constants/abis/sousChefBnb.json'
// import claimRefundAbi from '../constants/abis/claimRefund.json'
// import tradingCompetitionAbi from '../constants/abis/tradingCompetition.json'
// import easterNftAbi from '../constants/abis/easterNft.json'
// import cakeVaultAbi from '../constants/abis/cakeVault.json'
// import predictionsAbi from '../constants/abis/predictions.json'
// import chainlinkOracleAbi from '../constants/abis/chainlinkOracle.json'
import MultiCallAbi from '../constants/abis/Multicall.json'
// import bunnySpecialCakeVaultAbi from '../constants/abis/bunnySpecialCakeVault.json'
// import bunnySpecialPredictionAbi from '../constants/abis/bunnySpecialPrediction.json'
// import bunnySpecialLotteryAbi from '../constants/abis/bunnySpecialLottery.json'
// import farmAuctionAbi from '../constants/abis/farmAuction.json'
// import anniversaryAchievementAbi from '../constants/abis/anniversaryAchievement.json'
// import nftMarketAbi from '../constants/abis/nftMarket.json'
// import nftSaleAbi from '../constants/abis/nftSale.json'
// import pancakeSquadAbi from '../constants/abis/pancakeSquad.json'
// import erc721CollectionAbi from '../constants/abis/erc721collection.json'
import {PoolCategory, poolsConfig} from "../constants";
import tokens from "../constants/tokens";

const getContract = (abi, address, signer) => {
    const signerOrProvider = signer ?? simpleRpcProvider
    return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address, signer) => {
    return getContract(bep20Abi, address, signer)
}
// export const getErc721Contract = (address, signer) => {
//     return getContract(erc721Abi, address, signer)
// }
// export const getLpContract = (address, signer) => {
//     return getContract(lpTokenAbi, address, signer)
// }
// export const getIfoV1Contract = (address, signer) => {
//     return getContract(ifoV1Abi, address, signer)
// }
// export const getIfoV2Contract = (address, signer) => {
//     return getContract(ifoV2Abi, address, signer)
// }
// export const getSouschefContract = (id, signer) => {
//     const config = poolsConfig.find((pool) => pool.sousId === id)
//     const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
//     return getContract(abi, getAddress(config.contractAddress), signer)
// }
// export const getSouschefV2Contract = (id, signer) => {
//     const config = poolsConfig.find((pool) => pool.sousId === id)
//     return getContract(sousChefV2, getAddress(config.contractAddress), signer)
// }
// export const getPointCenterIfoContract = (signer) => {
//     return getContract(pointCenterIfo, getPointCenterIfoAddress(), signer)
// }
export const getCd3dContract = (signer) => {
    return getContract(cd3dAbi, tokens.cd3d.address, signer)
}
// export const getProfileContract = (signer) => {
//     return getContract(profileABI, getPancakeProfileAddress(), signer) as PancakeProfileContract
// }
// export const getPancakeRabbitContract = (signer) => {
//     return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress(), signer)
// }
// export const getBunnyFactoryContract = (signer) => {
//     return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), signer)
// }
// export const getBunnySpecialContract = (signer) => {
//     return getContract(bunnySpecialAbi, getBunnySpecialAddress(), signer)
// }
// export const getLotteryV2Contract = (signer) => {
//     return getContract(lotteryV2Abi, getLotteryV2Address(), signer)
// }
export const getMasterchefContract = (signer) => {
    return getContract(masterChef, getMasterChefAddress(), signer)
}
// export const getClaimRefundContract = (signer) => {
//     return getContract(claimRefundAbi, getClaimRefundAddress(), signer)
// }
// export const getTradingCompetitionContract = (signer) => {
//     return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(), signer)
// }
// export const getEasterNftContract = (signer) => {
//     return getContract(easterNftAbi, getEasterNftAddress(), signer)
// }
// export const getCakeVaultContract = (signer) => {
//     return getContract(cakeVaultAbi, getCakeVaultAddress(), signer)
// }
//
// export const getPredictionsContract = (signer) => {
//     return getContract(predictionsAbi, getPredictionsAddress(), signer)
// }
//
// export const getChainlinkOracleContract = (signer) => {
//     return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), signer)
// }
export const getMulticallContract = (signer) => {
    return getContract(MultiCallAbi, getMulticallAddress(), signer)
}
// export const getBunnySpecialCakeVaultContract = (signer) => {
//     return getContract(bunnySpecialCakeVaultAbi, getBunnySpecialCakeVaultAddress(), signer)
// }
// export const getBunnySpecialPredictionContract = (signer) => {
//     return getContract(bunnySpecialPredictionAbi, getBunnySpecialPredictionAddress(), signer)
// }
// export const getBunnySpecialLotteryContract = (signer) => {
//     return getContract(bunnySpecialLotteryAbi, getBunnySpecialLotteryAddress(), signer)
// }
// export const getFarmAuctionContract = (signer) => {
//     return getContract(farmAuctionAbi, getFarmAuctionAddress(), signer)
// }
// export const getAnniversaryAchievementContract = (signer) => {
//     return getContract(anniversaryAchievementAbi, getAnniversaryAchievement(), signer)
// }
// export const getNftMarketContract = (signer) => {
//     return getContract(nftMarketAbi, getNftMarketAddress(), signer)
// }
// export const getNftSaleContract = (signer) => {
//     return getContract(nftSaleAbi, getNftSaleAddress(), signer)
// }
// export const getPancakeSquadContract = (signer) => {
//     return getContract(pancakeSquadAbi, getPancakeSquadAddress(), signer)
// }
// export const getErc721CollectionContract = (signer, address) => {
//     return getContract(erc721CollectionAbi, address, signer)
// }
