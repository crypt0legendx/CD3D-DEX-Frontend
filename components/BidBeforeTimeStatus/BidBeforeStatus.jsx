import React from "react";
import Curtain from "../../public/assets/curtain.svg";
import Image from "next/image";
import styles from "../../styles/bidBeforeStatus.module.css";
import Counter from "../Countdown/Counter";
import { Typography } from "@mui/material";

function BidBeforeStatus() {
	return (
		<div className={styles.bidBeforeStatusContainer}>
			<div className={styles.curtainContainer}>
				<Image src={Curtain} />
			</div>
			<div className={styles.counterContainer}>
				<Counter />
			</div>
			<div className={styles.typographyContainer}>
				<Typography variant="h4" gutterBottom component="h4">
					Time to Curtain
				</Typography>
			</div>
		</div>
	);
}

export default BidBeforeStatus;
