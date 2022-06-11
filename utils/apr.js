import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, CD3D_PER_YEAR } from '../constants'
import lpAprs from '../constants/lpAprs.json'

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
    stakingTokenPrice,
    rewardTokenPrice,
    totalStaked,
    tokenPerBlock,
) => {
    const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
    const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
    return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cd3dPriceUsd CD3D price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @param farmAddress Farm Address
 * @returns Farm Apr
 */
export const getFarmApr = (
    poolWeight,
    cd3dPriceUsd,
    poolLiquidityUsd,
    farmAddress
) => {
    const yearlyCd3dRewardAllocation = poolWeight ? poolWeight.times(CD3D_PER_YEAR) : new BigNumber(NaN)
    const cd3dRewardsApr = yearlyCd3dRewardAllocation.times(cd3dPriceUsd).div(poolLiquidityUsd).times(100)
    let cd3dRewardsAprAsNumber = null
    console.log('apr', yearlyCd3dRewardAllocation, cd3dPriceUsd, poolLiquidityUsd);
    if (!cd3dRewardsApr.isNaN() && cd3dRewardsApr.isFinite()) {
        cd3dRewardsAprAsNumber = cd3dRewardsApr.toNumber()
    }
    const lpRewardsApr = lpAprs[farmAddress?.toLocaleLowerCase()] ?? 0
    return { cd3dRewardsApr: cd3dRewardsAprAsNumber, lpRewardsApr }
}

export default null
