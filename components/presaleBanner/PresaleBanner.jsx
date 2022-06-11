import { Typography } from "@mui/material";
import React from "react";
import styles from "../../styles/presaleBanner.module.css";
import { FourthCounter } from "../Countdown/Counter";

function PresaleBanner() {
  return (
    <div className={styles.presaleContainer}>
      <FourthCounter />
    </div>
  );
}

export default PresaleBanner;
