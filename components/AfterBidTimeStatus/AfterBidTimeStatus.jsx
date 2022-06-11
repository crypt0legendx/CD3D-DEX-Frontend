import React from "react";
import Curtain from "../../public/assets/curtain.svg";
import Image from "next/image";
import styles from "../../styles/bidBeforeStatus.module.css";
import { Typography } from "@mui/material";
import { ThirdCounter } from "../Countdown/Counter";

function AfterBidTimeStatus() {
  return (
    <div className={styles.bidBeforeStatusContainer}>
      <div className={styles.curtainContainer}>
        <Image src={Curtain}/>
      </div>
      <div className={styles.counterContainer}>
        {/* <CompoundTimer /> */}
        <ThirdCounter />
      </div>
      <div className={styles.typographyContainer}>
        <Typography variant="h4" gutterBottom component="h4">
          Show’s Over
        </Typography>
      </div>
      <div className={styles.subtypographyContainer}>
        <Typography className={styles.subText} gutterBottom>
          Please wait until the sale is finalized before checking wallet for
          your tokens
        </Typography>
      </div>
    </div>
  );
}

export default AfterBidTimeStatus;
