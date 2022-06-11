import React from "react";
import Modal from 'react-modal';
import styles from "../../styles/Dialog.module.css";
import {Link, Typography} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Transaction_check from "../../public/assets/Transaction_check.svg";
import Transaction_error from "../../public/assets/Transaction_error.svg";
import {faArrowUp, faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Image from "next/image";
import {getBscScanLink} from "../../utils";

const LiquiditySubmittingTxDialog = (props) => {
    const {show, onClose, txHash, onRetry, swapErrorMessage} = props;

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
                    width: '430px',
                    height: '414px',
                    margin: 'auto',
                    borderRadius: '15px',
                    padding: '20px',
                    backgroundColor: swapErrorMessage?"#FFF1F5":"#EAFBF3",
                }
            }}
        >
            {
                swapErrorMessage?
                    <div className={`${styles.DialogContainer}`}>
                        <Typography className={`${styles.DialogErrorTitle}`} variant="subtitle2">Transaction Error</Typography>
                        {/* TODO  Change Icon*/}
                        <FontAwesomeIcon icon={faTimes} className={`${styles.DialogErrorClose}`} onClick={() => onClose()}/>
                        <Image src={Transaction_error} alt={''} height={60} width={60} />
                        <div>
                            <Typography className={`${styles.DialogErrorSubTitle}`} variant="subtitle2">Oops! Transaction Failed</Typography>
                            <Typography className={`${styles.DialogErrorCaption}`} variant="subtitle2">{swapErrorMessage}</Typography>
                            <Typography className={`${styles.DialogErrorCaption}`} variant="subtitle2">Please retry to confirm the transaction</Typography>
                        </div>
                        <Button variant="contained" className={`${styles.DialogRetry}`} onClick={() => onRetry()}>
                            Retry
                        </Button>
                    </div>
                    :
                    <div className={`${styles.DialogContainer}`}>
                        <Typography className={`${styles.DialogTitle}`} variant="subtitle2">{!txHash ? "Submitting Transaction" : "Transaction Success"}</Typography>
                        <FontAwesomeIcon icon={faTimes} className={`${styles.DialogClose}`} onClick={() => onClose()}/>
                        {
                            txHash?
                            <Image src={Transaction_check} alt={''} height={60} width={60} />
                                :
                            <div className={`${styles.SubmittingContainer}`}>
                                <FontAwesomeIcon icon={faArrowUp} className={styles.Submitting} onClick={() => onClose()}/>
                            </div>
                        }
                        <div>
                            <Typography className={`${styles.DialogSubTitle}`} variant="subtitle2">{!txHash ? "Submitting Transaction" : "Transaction Submitted"}</Typography>
                            {
                                txHash &&
                                <Link target={"_blank"} href={getBscScanLink(txHash, 'transaction')}>
                                    <Typography className={`${styles.DialogBinance}`} variant="subtitle2">
                                        View on Binance
                                    </Typography>
                                </Link>
                            }
                        </div>
                        <Button variant="contained" className={`${styles.DialogSubmit}`} onClick={() => onClose()}>
                            Close
                        </Button>
                    </div>
            }
        </Modal>
    );
}
export default LiquiditySubmittingTxDialog;
