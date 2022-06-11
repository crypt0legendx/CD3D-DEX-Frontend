import React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../styles/soon.module.css";
import Image from "next/image";
import ComingSoon from "../../public/assets/homepage/ComingSoon.svg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SoonItem from "./SoonComponents/soonItem";
import { commingSoonData } from "data/data";
const Comingsoon = () => {
	return (
		<div className={styles.soonOuter}>
			<Container>
				<Grid container spacing={2}>
					<Grid item sm={12} md={7}>
						<Typography variant="h4" gutterBottom component="h4">
							“Ever wonder why fund managers can’t beat the
							S&amp;P 500? ‘Cause they’re sheep - and{" "}
							<span>sheep get slaughtered.”</span>
						</Typography>
						<Typography
							variant="subtitle2"
							gutterBottom
							component="p">
							– Gordon Gekko, WALL STREET
						</Typography>
						<Grid
							className={styles.soonGrid2}
							container
							spacing={2}>
							{commingSoonData.map((elem) => (
								<Grid item xs={12} sm={6} md={4} key={elem.id}>
									<SoonItem
										name={elem.name}
										time={elem.time}
									/>
								</Grid>
							))}
						</Grid>
						<Grid
							className={styles.soonGrid2}
							container
							spacing={8}>
							<Grid item xs={12} sm={12} md={4}>
								<Typography
									variant="subtitle2"
									gutterBottom
									component="p">
									FORMAT
								</Typography>
								<Typography
									variant="h5"
									gutterBottom
									component="h5">
									Batch/Dutch Auction
								</Typography>
							</Grid>
							<Grid item xs={12} sm={12} md={8}>
								<ul className={styles.unstyled}>
									<Typography
										variant="subtitle2"
										gutterBottom
										component="li">
										Enter your bid price per token
									</Typography>
									<Typography
										variant="subtitle2"
										gutterBottom
										component="li">
										Enter amount you want to spend
									</Typography>

									<Typography
										variant="subtitle2"
										gutterBottom
										component="li">
										Submit your bid & pay small gas fee
									</Typography>

									<Typography
										variant="subtitle2"
										gutterBottom
										component="li">
										Once auction ends, token orders will be
										filled from highest price bid to lowest
										until supply is gone
									</Typography>
								</ul>
								{/* <ul>
								namik ere
									<li>
										- ApeSwap Listing Rate: 1 BNB = 3000
										CD3D
									</li>
									<li>- Liquidity: 51%</li>
									<li>- Liquidity Lockup Time: 9999 days</li>
									<li>
										- All 1 BNB+ buyers entered into 100K
										CD3D giveaway (5 winners!){" "}
									</li>
									<li>
										- Visit token sale page{" "}
										<a
											href="https://www.pinksale.finance/#/launchpad/0xAbb63f6E1407187e541Af758E05b8aeA80Fe6033?chain=BSC"
											target="_blank">
											here
										</a>
									</li>
									<li>
										- Sign up on the whitelist{" "}
										<a
											href=" https://docs.google.com/forms/d/e/1FAIpQLSf-d6l2RdfcWqFN2Epx4JbAJ9YXxeK7lg29LjYqv76AJnOSmQ/viewform"
											target="_blank">
											here
										</a>
									</li>
									<li>
										- 10 minutes Whitelist Exclusive, then
										PUBLIC SALE
									</li>
									<li>
										- Please review token sale FAQ{" "}
										<a
											href=" https://cinemadraft.medium.com/frequently-asked-questions-answered-of-the-cd3d-token-project-ca10158c837"
											target="_blank">
											here
										</a>
									</li>
								</ul> */}
							</Grid>
						</Grid>
					</Grid>
					<Grid item sm={12} md={5}>
						<Image src={ComingSoon} alt="Picture of the author" />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Comingsoon;
