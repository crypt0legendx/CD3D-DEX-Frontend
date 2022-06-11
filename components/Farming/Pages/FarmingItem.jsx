import React, {useCallback, useState} from "react";
import Image from "next/image";
import {Typography} from "@material-ui/core";
import {Percent, JSBI} from "cd3d-dex-libs-sdk";
import {Button} from "@mui/material";

import {BASE_ADD_LIQUIDITY_URL} from "../../../constants";
import getLiquidityUrlPathParts from '../../../utils/getLiquidityUrlPathParts'
import {getBscScanLink} from "../../../utils";
import {getAddress} from "../../../helpers/addressHelper";
import {getBalanceAmount, getBalanceNumber, getDecimalAmount} from "../../../utils/formatBalance";
import {useLpTokenPrice} from "../../../state/farms/hooks";
import {useAppDispatch} from "../../../state";
import {fetchFarmUserDataAsync} from "../../../state/farms";
import useApproveFarm from "../hooks/useApproveFarm";
import {useERC20} from "../../../hooks/useContract";
import ConnectButton from "../../ConnectWalletButton";
import {BIG_ZERO} from "../../../utils/bigNumber";
import styles from "../../../styles/farming.module.css";


const FarmingItem = ({farm, account, displayApr, cd3dPrice, onStack, onUnstack}) => {
    const { pid, lpTokenBalanceMC } = farm
    const { allowance, tokenBalance, stakedBalance, earnings } = farm.userData || {}
    const [requestedApproval, setRequestedApproval] = useState(false)

    const lpPrice = useLpTokenPrice(farm.lpSymbol)
    const dispatch = useAppDispatch()

    const liquidityUrlPathParts = getLiquidityUrlPathParts({
        quoteTokenAddress: farm.quoteToken.address,
        tokenAddress: farm?.token?.address,
    })

    const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
    const lpAddress = getAddress(farm.lpAddresses);
    const totalValueFormatted =
        farm.liquidity && farm.liquidity.gt(0)
            ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
            : '-'
    const earnLabel = farm.dual ? farm.dual.earnLabel : 'CD3D + Fees';
    const isApproved = account && allowance && allowance.isGreaterThan(0)

    const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
    const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(cd3dPrice).toNumber() : 0;

    const stakedPercent = (farm.lpTotalInQuoteToken && stakedBalance && lpTokenBalanceMC.isGreaterThan(BIG_ZERO)) ? new Percent(stakedBalance.toNumber(), lpTokenBalanceMC.toNumber()) : undefined;
    console.log('total', stakedPercent);

    const lpContract = useERC20(lpAddress)
    const { onApprove } = useApproveFarm(lpContract)
    const handleApprove = useCallback(async () => {
        try {
            setRequestedApproval(true)
            await onApprove()
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
        } catch (e) {
            //toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            console.error(e)
        } finally {
            setRequestedApproval(false)
        }
    }, [onApprove, dispatch, account, pid])

    let actionWidget;
    if (!isApproved) {

        if(requestedApproval){
            actionWidget = (
                <div className={styles.form_row}>
                    <Button variant="contained" fullWidth={true} size={'large'} disabled={true}>
                        Enabling Contract
                    </Button>
                </div>
            );
        } else if(!account) {
            actionWidget = (
                <ConnectButton />
            );
        } else {
            actionWidget = (
                <div className={styles.form_row}>
                    <Button variant="contained" onClick={handleApprove} fullWidth={true} size={'large'}>
                        Enable Contract
                    </Button>
                </div>
            );
        }
    } else {
        actionWidget = (
            <div className={styles.form_row}>
                <Button variant="contained" onClick={() => onUnstack({pid, max: stakedBalance, stakedBalance, tokenName: farm.lpSymbol, multiplier: farm.multiplier, apr: farm.apr, displayApr, addLiquidityUrl, cd3dPrice})} fullWidth={true} size={'large'} className={styles.outlined}>
                    Claim CD3D
                </Button>
                <div style={{width: "20px"}}/>
                <Button variant="contained" onClick={() => onStack({pid, max: tokenBalance, stakedBalance, tokenName: farm.lpSymbol, multiplier: farm.multiplier, apr: farm.apr, displayApr, addLiquidityUrl, cd3dPrice })} fullWidth={true} size={'large'}>
                    Stake LP
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.farmingContent}>
            <div className={styles.form_image}>
                <Image src={'/assets/images/busd-cd3d.png'} alt={''} height={'70px'} width={'60px'} objectFit={"contain"}/>
            </div>
            <div className={styles.form_header}>
                <h1 className={styles.form_title1}>{ farm.lpSymbol?.toUpperCase()??'-' }</h1>
                <h1 className={styles.form_title2}>{ displayApr??'-' }%</h1>
                <span className={styles.form_subtitle}>APR</span>
            </div>
            <div className={styles.form_divider}/>
            <div className={styles.form_body}>
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">Earn</Typography>
                    <div className={styles.form_row} style={{marginBottom: 0}}>
                        <Image src={"/assets/images/cd3d.png"} height={19} width={16} objectFit={"contain"}/>
                        <Typography className={styles.row_label} variant="subtitle2">
                            &nbsp;&nbsp;{earnLabel}
                        </Typography>
                    </div>
                </div>
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">Total Liquidity</Typography>
                    <Typography className={styles.row_label} variant="subtitle2">{totalValueFormatted}</Typography>
                </div>
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">My Share</Typography>
                    <Typography className={styles.row_label} variant="subtitle2">{stakedPercent && stakedPercent.greaterThan(JSBI.BigInt(0)) ? `${stakedPercent.toFixed(6)}%` : '-'}</Typography>
                </div>
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">CD3D Earned</Typography>
                    <Typography className={styles.row_label} variant="subtitle2">${earningsBusd > 0?`${earningsBusd.toFixed(2)}`:'0'}</Typography>
                </div>
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">{farm.lpSymbol?.toUpperCase()??'-'} Staked</Typography>
                    <Typography className={styles.row_label} variant="subtitle2">${stakedBalance > 0? getBalanceNumber(stakedBalance.times(lpPrice.toNumber())).toFixed(2): '0'}</Typography>
                </div>
                {actionWidget}
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">
                        <a href={addLiquidityUrl} target='_blank'>
                            Get { farm.lpSymbol?.toUpperCase()??'-' }
                        </a>
                    </Typography>
                    <Typography className={styles.row_label} variant="subtitle2">
                        <a href={getBscScanLink(lpAddress, 'address')} target='_blank'>
                            View Contract
                        </a>
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default FarmingItem;
