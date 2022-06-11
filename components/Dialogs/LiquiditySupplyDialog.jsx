import React from "react";
import Modal from 'react-modal';
import styles from "../../styles/Dialog.module.css";
import { Typography } from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Image from "next/image";

const LiquiditySupplyDialog = (props) => {
    const {show, onClose, onSubmit, lpToken, currencyA, currencyB, currencyAAmount, currencyBAmount, currencya_rate, currencyb_rate, pool} = props;

    return (
        <Modal
            isOpen={show}
            ariaHideApp={false}
            onRequestClose={() => onClose()}
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
            <div className={`${styles.DialogContainer}`}>
                <Typography className={`${styles.DialogTitle}`} variant="subtitle2">You will receive</Typography>
                <FontAwesomeIcon icon={faTimes} className={`${styles.DialogClose}`} onClick={() => onClose()}/>
                <div className={`${styles.DialogInfoContainer}`}>
                    <Image src={'/assets/busd-cd3d.png'} alt={''} height={40} width={50} />
                    <div className={`${styles.Info}`} >
                        <Typography className={`${styles.title}`} variant="subtitle2">{lpToken}</Typography>
                        <Typography className={`${styles.description}`} variant="subtitle2">{currencyA?.symbol}/{currencyB?.symbol} Pool Tokens</Typography>
                    </div>
                </div>
                <Typography className={`${styles.DialogDescription}`} variant="subtitle2">Output is estimated. If the price changes by more than 0.5% your transaction will revert.</Typography>
                <div>
                    <div className={`${styles.DialogItem}`}>
                        <Typography className={`${styles.DialogLabel}`} variant="subtitle2">{currencyA?.symbol} Deposited</Typography>
                        <Typography className={`${styles.DialogLabel}`} variant="subtitle2">{currencyAAmount}</Typography>
                    </div>
                    <div className={`${styles.DialogItem}`}>
                        <Typography className={`${styles.DialogLabel}`} variant="subtitle2">{currencyB?.symbol} Deposited</Typography>
                        <Typography className={`${styles.DialogLabel}`} variant="subtitle2">{currencyBAmount}</Typography>
                    </div>
                    <div className={`${styles.DialogItem}`}>
                        <Typography className={`${styles.DialogLabel}`} variant="subtitle2">Rates</Typography>
                        <Typography className={`${styles.DialogLabel}`} variant="subtitle2">1 {currencyA?.symbol} = {currencya_rate} {currencyB?.symbol}</Typography>
                    </div>
                    <div className={`${styles.DialogItem}`}>
                        <div></div>
                        <Typography className={`${styles.DialogLabel}`} variant="subtitle2">1 {currencyB?.symbol} = {currencyb_rate} {currencyA.symbol}</Typography>
                    </div>
                    <div className={`${styles.DialogItem}`}>
                        <Typography className={`${styles.DialogLabel}`} variant="subtitle2">Share of Pool</Typography>
                        <Typography className={`${styles.DialogLabel}`} variant="subtitle2">{pool}%</Typography>
                    </div>
                </div>
                <Button variant="contained" className={`${styles.DialogSubmit}`} onClick={() => onSubmit()} fullWidth={true}>
                    Confirm Supply
                </Button>
            </div>
        </Modal>
    );
}
export default LiquiditySupplyDialog;
