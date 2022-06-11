import { Typography } from "@mui/material";
import styles from "../../styles/counter.module.css";
import Link from "next/link";


export const newRenderer = ({ hours, minutes, seconds, completed }) => {
	if (completed) {
		// Render a completed state
		return (
			<div>
				<h1>"Time until Initial CD3D Offering token sale ends" </h1>
			</div>
		);
	} else {
		// Render a countdown
		return (
			<>
				<h3>
					Hours <span className={styles.time}>{hours}</span>
				</h3>
				<span className={styles.timeMid}>:</span>
				<h3>
					Minutes <span className={styles.time}>{minutes}</span>
				</h3>
				<span className={styles.timeMid}>:</span>
				<h3>
					Seconds <span className={styles.time}>{seconds}</span>
				</h3>
			</>
		);
	}
};

export const newOneRenderer = ({ hours, minutes, seconds, completed }) => {
	if (completed) {
		// Render a completed state
		return <h1>"Time until Initial CD3D Offering token sale ends" </h1>;
	} else {
		// Render a countdown
		return (
			<>
				<span className={styles.time}>{hours}</span>

				<span className={styles.timeMid}>:</span>

				<span className={styles.time}>{minutes}</span>

				<span className={styles.timeMid}>:</span>

				<span className={styles.time}>{seconds}</span>

				<div className={styles.bottomText}></div>
			</>
		);
	}
};

export const newSecondRenderer = ({ hours, minutes, seconds, completed }) => {
	if (completed) {
		return (
			<div>
				<Typography variant="h5">CD3D CONTRACT DETAILS</Typography>
				<Typography variant="body2">
					Network: Binance Smart Chain
				</Typography>
				<Typography variant="body2">
					Contract:{" "}
					<a
						href={
							"https://bscscan.com/address/0x9108c36dc1dcbf08187d4f4d4579d72e6a35d979"
						}
						target="_blank">
						0x9108c36dc1dcbf08187d4f4d4579d72e6a35d979
					</a>
				</Typography>
				<Typography variant="body2">Symbol: CD3D</Typography>
				<Typography variant="body2">Decimals: 9</Typography>
			</div>
		);
	} else {
		// Render a countdown
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "80%",
				}}>
				<h3>
					Hours <span className={styles.time}>{hours}</span>
				</h3>
				<span className={styles.timeMid}>:</span>
				<h3>
					Minutes <span className={styles.time}>{minutes}</span>
				</h3>
				<span className={styles.timeMid}>:</span>
				<h3>
					Seconds <span className={styles.time}>{seconds}</span>
				</h3>
			</div>
		);
	}
};

export const newThirdRenderer = ({
	days,
	hours,
	minutes,
	seconds,
	completed,
}) => {
	if (completed) {
		return (
			<div className={styles.presaleCounterOver}>
				<Typography variant="h6">
					Thank you to all of our PinkSale investors for your support!
				</Typography>
			</div>
		);
	} else {
		// Render a countdown
		return (
			<div className={styles.presaleBannerCounter}>
				<Typography variant="h5">
					Our PinkSale IDO token sale begins in
				</Typography>
				<div>
					<span className={styles.time}>{days}</span>

					<span className={styles.timeMid}>:</span>

					<span className={styles.time}>{hours}</span>

					<span className={styles.timeMid}>:</span>

					<span className={styles.time}>{minutes}</span>

					<span className={styles.timeMid}>:</span>

					<span className={styles.time}>{seconds}</span>

					<div className={styles.bottomText}></div>
				</div>
			</div>
		);
	}
};

export const newFourthRenderer = () => {
	const linkUrl =
		"https://app.unifarm.co/";
	return (
		<div className={styles.presaleCounterOver}>
			<a href={linkUrl} target="_blank" style={{ margin: "10px, 0" }}>

				<Typography variant="h6">
					Stake CD3D for 250% APY at UniFarm today!
				</Typography>
			</a>
		</div>
	);
};
