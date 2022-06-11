import React, {useCallback, useState} from "react";
import styles from "../../../styles/farming.module.css";
import {Box, Container, Grid} from "@mui/material";
import FarmingItem from "./FarmingItem";
import {useWeb3React} from "@web3-react/core";
import {useFarms, usePollFarmsWithUserData, usePriceCd3dBusd} from "../../../state/farms/hooks";
import BigNumber from "bignumber.js";
import { getFarmApr } from '../../../utils/apr'
import { latinise } from '../../../utils/latinise'
import {NETWORK_CHAIN_ID} from "../../../connectors";
import FarmingDialog from "./FarmingDialog";
import FarmingBanner from "./FarmingBanner";
import Image from "next/image";
import FarmingWithdraw from "./FarmingWithdraw";


const getDisplayApr = (cd3dRewardsApr, lpRewardsApr) => {
    if (cd3dRewardsApr && lpRewardsApr) {
        return (cd3dRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    if (cd3dRewardsApr) {
        return cd3dRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    return null
}

const FarmingForm = () => {
    const [{ showModal, stakeParams, showWithdrawModal, unStakeParams }, setFarmingState] = useState({
        showModal: false,
        showWithdrawModal: false,
        stakeParams: {},
        unStakeParams: {}
    });

    const { account } = useWeb3React();
    const cd3dPrice = usePriceCd3dBusd();
    const [query, setQuery] = useState('');

    const isActive = true;
    const isArchived = false;

    usePollFarmsWithUserData(isArchived)

    const farmsList = useCallback(
        (farmsToDisplay) => {
            let farmsToDisplayWithAPR = farmsToDisplay.map((farm) => {
                if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
                    return farm
                }
                const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
                const { cd3dRewardsApr, lpRewardsApr } = isActive
                    ? getFarmApr(new BigNumber(farm.poolWeight), cd3dPrice, totalLiquidity, farm.lpAddresses[NETWORK_CHAIN_ID])
                    : { cd3dRewardsApr: 0, lpRewardsApr: 0 }

                return { ...farm, apr: cd3dRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
            })

            if (query) {
                const lowercaseQuery = latinise(query.toLowerCase())
                farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm) => {
                    return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery) || farm.lpAddresses[NETWORK_CHAIN_ID] === query
                })
            }
            return farmsToDisplayWithAPR
        },
        [cd3dPrice, query, isActive],
    )

    const { data: farmsLP, userDataLoaded } = useFarms();
    const archivedFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X');
    const farms = farmsList(archivedFarms);
    console.log("🚀 ~ file: FarmingForm.jsx ~ line 72 ~ FarmingForm ~ farms", farms)

    let totalLiquidity = new BigNumber(0);
    farms.forEach(farm => totalLiquidity = totalLiquidity.plus(farm.liquidity));

    console.log('farms', farms, cd3dPrice, totalLiquidity);

    return (
        <div className={styles.container}>
            <div className={styles.bannerImg}>
                <Image src={'/assets/images/tech.png'} alt={''} height={'450px'} width={'550px'} objectFit={"contain"}/>
            </div>
            <FarmingBanner
                total={totalLiquidity.toNumber()}
                onSearch={(address) => setQuery(address)}
            />
            <Box className={styles.farmingFormContainer}>
                <Grid container className={styles.form_wrapper}>
                    {
                        farms.map(farm =>
                            <Grid key={farm.pid} item xs={12} sm={6} md={6} lg={4} xl={4} >
                                <FarmingItem
                                    farm={farm}
                                    displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                                    onStack={(params) => setFarmingState(prevState => ({...prevState, showModal: true, stakeParams: params}))}
                                    onUnstack={(params) => setFarmingState(prevState => ({...prevState, showWithdrawModal: true, unStakeParams: params}))}
                                    cd3dPrice={cd3dPrice}
                                    account={account}
                                />
                            </Grid>
                        )
                    }
                </Grid>
                <FarmingDialog
                    params={stakeParams}
                    account={account}
                    show={showModal}
                    onDismiss={() =>  setFarmingState(prevState => ({...prevState, showModal: false, stakeParams: {}}))}
                />
                <FarmingWithdraw
                    params={unStakeParams}
                    account={account}
                    show={showWithdrawModal}
                    onDismiss={() =>  setFarmingState(prevState => ({...prevState, showWithdrawModal: false, unStakeParams: {}}))}
                />
            </Box>
        </div>
    );
}

export default FarmingForm;
