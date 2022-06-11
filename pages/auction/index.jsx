import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import BidPlace from "../../components/TokenPage/BidPlace";
import BuyTokens from "../../components/TokenPage/BuyTokens";
import styles from "../../styles/token.module.css";
import { styled } from "@mui/material/styles";

const Token = () => {
	return (
		<div className={styles.tokenOuter}>
			<div className={styles.bidOuter}>
				<BidPlace />
			</div>
		</div>
	);
};

export default Token;
