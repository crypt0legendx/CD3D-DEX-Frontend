import React from "react";
import styles from "../../styles/useSec.module.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UseItem from "./UseComponent/useItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { userSection } from "../../public/data/data";
import Link from "next/link";
const UseSection = () => {
	return (
		<div className={styles.useOuter}>
			<Container>
				<Typography variant="h4" gutterBottom component="h4">
					What can you use it for?
				</Typography>
				<div className={styles.monCon}>
					<Typography variant="h6" gutterBottom component="h6">
						<i>“Show me the MONEY!!!”</i>
					</Typography>
					<Typography variant="subtitle2" gutterBottom component="p">
						– Jerry Maguire, JERRY MAGUIRE
					</Typography>
				</div>
				<Grid className={styles.itemGrid} container spacing={2}>
					{userSection.map((i) => (
						<Grid item xs={12} sm={6} md={4} key={i.id}>
							<UseItem item={i} />
						</Grid>
					))}
				</Grid>
				<Button variant="contained" className={styles.itemButton}>
					<a
						target="_blank"
						href="https://drive.google.com/file/d/1Ro6mK4MzdSEdwGW05QQW3QPbRFoQwtrN/view?usp=sharing"
						rel="noopener noreferrer">
						Whitepaper
					</a>
				</Button>
			</Container>
		</div>
	);
};

export default UseSection;
