import React, {useMemo, useState} from "react";
import Modal from 'react-modal';
import styles from "../../../styles/Dialog.module.css";
import {Typography} from "@material-ui/core";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Button from "@mui/material/Button";
import {Chip, FormControl, InputAdornment, InputLabel} from "@mui/material";
import {formatNumber, getFullDisplayBalance} from "../../../utils/formatBalance";
import BigNumber from "bignumber.js";
import {useLpTokenPrice} from "../../../state/farms/hooks";
import {getInterestBreakdown} from "../../../utils/compoundApyHelpers";
import {fetchFarmUserDataAsync} from "../../../state/farms";
import FarmingDialogInput from "./FarmingDailogInput";
import {showToast} from "../../../utils/toast";
import useUnstakeFarms from "../hooks/useUnstakeFarms";
import {useAppDispatch} from "../../../state";

const FarmingWithdraw = (props) => {
    const dispatch = useAppDispatch();
    const {show, account, onDismiss, loading, onConfirm, params} = props;
    if(!params.pid){
        return null;
    }
    const {pid, max, stakedBalance, tokenName, multiplier, apr, displayApr, addLiquidityUrl, cd3dPrice} = params;
    const [input, setInput] = useState("");
    const [pendingTx, setPendingTx] = useState(false)
    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(max)
    }, [max])

    const { onUnstake } = useUnstakeFarms(pid)
    const lpTokensToStake = new BigNumber(input)
    const fullBalanceNumber = new BigNumber(fullBalance)
    const lpPrice = useLpTokenPrice(tokenName)
    const usdToStake = lpTokensToStake.times(lpPrice)

    const interestBreakdown = getInterestBreakdown({
        principalInUSD: !lpTokensToStake.isNaN() ? usdToStake.toNumber() : 0,
        apr,
        earningTokenPrice: cd3dPrice.toNumber(),
    })

    console.log('ROI', cd3dPrice, interestBreakdown, lpTokensToStake, usdToStake, apr);
    const annualRoi = cd3dPrice.times(interestBreakdown[3])
    const formattedAnnualRoi = formatNumber(
        annualRoi.toNumber(),
        annualRoi.gt(10000) ? 0 : 2,
        annualRoi.gt(10000) ? 0 : 2,
    )

    const onSubmit = async () => {
        setPendingTx(true)
        try {
            await onUnstake(input)
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
            showToast("success", "Claimed!", "Your funds have been claimed from the farm.");
            onDismiss();
        } catch (e) {
            showToast(
                "error",
                "Error",
                "Please try again. Confirm the transaction and make sure you are paying enough gas!"
            );
            console.error(e)
        } finally {
            setPendingTx(false)
        }
    }

    return (
        <Modal
            isOpen={show}
            ariaHideApp={false}
            onRequestClose={onDismiss}
            centered
            style={{
                overlay: {
                    backgroundColor: "#00000050",
                },
                content: {
                    width: '582px',
                    height: '502px',
                    margin: 'auto',
                    borderRadius: '15px',
                    padding: '20px',
                    backgroundColor: "#EAFBF3",
                }
            }}
        >
            <div className={styles.DialogContainer}>
                <Typography className={styles.DialogTitle} variant="subtitle2">Unstake {tokenName}</Typography>
                <FontAwesomeIcon icon={faTimes} className={styles.DialogClose} onClick={onDismiss}/>
                <div className={styles.DialogInfoContainer}>
                    <Image src={'/assets/busd-cd3d.png'} alt={''} height={40} width={50}/>
                    <div className={`${styles.Info}`}>
                        <Typography className={styles.title_primary} variant="subtitle2">{displayApr??'-'}%</Typography>
                        <Typography className={styles.description_primary} variant="subtitle2">APR</Typography>
                    </div>
                </div>
                <div className={styles.DialogFarmingForm}>
                    <FormControl variant="standard">
                        <InputLabel shrink htmlFor="stack-input" className={styles.formLabel}>
                            Stake
                        </InputLabel>
                        <FarmingDialogInput
                            id="stack-input"
                            type={'number'}
                            placeholder={'0'}
                            min={'0'}
                            InputProps={{
                                value: input,
                                disableUnderline: true,
                                onChange: (event) => setInput(event.target.value),
                                endAdornment: <InputAdornment position="end">
                                    <Chip label="Max" color={"error"} size={"small"} onClick={() => setInput(fullBalanceNumber.toNumber())}/>
                                    <Typography variant="subtitle2">{tokenName}</Typography>
                                </InputAdornment>,
                            }}
                            variant="filled"
                            size={"small"}
                            helperText={"Available : " + fullBalanceNumber.toNumber()}
                        />
                    </FormControl>
                </div>
                <div className={`${styles.DialogItem}`}>
                    <Typography className={`${styles.DialogSpan}`} variant="subtitle2">Annual ROI at current rates:</Typography>
                    <Typography className={`${styles.DialogSpan}`} variant="subtitle2">${formattedAnnualRoi}</Typography>
                </div>
                <div className={styles.Dialog_Footer}>
                    <Button
                        variant="contained"
                        className={`${styles.DialogSubmit}`}
                        disabled={
                            pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(fullBalanceNumber)
                        }
                        onClick={onSubmit}
                        fullWidth={true}
                    >
                        {pendingTx ? 'Confirming' : 'Confirm'}
                    </Button>
                    <Typography className={styles.link} variant="subtitle2">
                        <a href={addLiquidityUrl} target='_blank'>
                            Get {tokenName}
                        </a>
                    </Typography>
                </div>
            </div>
        </Modal>
    );
}
export default FarmingWithdraw;
