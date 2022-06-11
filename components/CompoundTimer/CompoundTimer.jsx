import React from "react";
import Timer from "react-compound-timer";
import { Typography } from "@mui/material";
import styles from "../../styles/CompoundTimer.module.css";

function getDifferenceInSeconds(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs;
}

function CompoundTimer() {
  let startDate = new Date("Oct 8, 2021 12:00:00:000 GMT");
  let endDate = new Date("Oct 8, 2021 15:00:00:000 GMT");

  return (
    <Timer
      initialTime={getDifferenceInSeconds(endDate, startDate)}
      direction="forward"
      startImmediately={true}
      lastUnit="h"
    >
      <div className={styles.TimerOuterContainer}>
        <div className={styles.TimerContainer}>
          <Typography variant="span" component="span">
            hours
          </Typography>
          <Typography variant="h4" component="h4">
            <Timer.Hours />
          </Typography>
        </div>
        <div className={styles.colon}>:</div>

        <div className={styles.TimerContainer}>
          <Typography variant="span" component="span">
            minutes
          </Typography>
          <Typography variant="h4" component="h4">
            <Timer.Minutes />
          </Typography>
        </div>
        <div className={styles.colon}>:</div>

        <div className={styles.TimerContainer}>
          <Typography variant="span" component="span">
            seconds
          </Typography>
          <Typography variant="h4" component="h4">
            <Timer.Seconds />
          </Typography>
        </div>
      </div>
    </Timer>
  );
}

export default CompoundTimer;
