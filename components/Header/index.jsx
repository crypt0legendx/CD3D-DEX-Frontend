// import React from "react";
// import Image from "next/image";
// import Logo from "../../public/assets/logo.svg";
// import styles from "../../styles/navbar.module.css";
// import { AppBar, Toolbar } from "@material-ui/core";
// import DrawerComponent from "./HeaderComponents/DrawerComponent";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import Button from "@mui/material/Button";
// import { marketPlaceData, moreData } from "data/data";
// import WalletHeaderComponent from "./HeaderComponents/WalletHeaderComponent";
// import useActiveWeb3React from "../../hooks/useActiveWeb3React";
// import CustomMenuItem from "../CustomMenuItem/CustomMenuItem";
// import { useCurrency } from "../../hooks/Tokens";
// import { useCurrencyBalances } from "../../state/wallet/hooks";
// import {
// 	Stack,
// 	Box,
// 	Typography,
// 	IconButton,
// 	Menu,
// 	MenuItem,
// } from "@mui/material";
// import HeaderClient from "./HeaderComponents/HeaderClient";
// import { styled } from "@mui/material/styles";
// import Link from "next/link";
// import tokens, { serializeTokens } from "../../constants/tokens";
// import { useRouter } from "next/router";

// const HeaderMenuLink = styled(Button)({
// 	color: "#EAFBF3",
// 	fontSize: "13px",
// 	letterSpacing: "2.21px",
// 	marginRight: "20px",
// 	marginLeft: "20px",
// 	"&:hover": {
// 		backgroundColor: "transparent",
// 		color: "#A0EDC4",
// 	},
// });

// const HeaderMenu = styled(Menu)({
// 	"& .MuiMenu-paper": {
// 		maxHeight: "400px",
// 		overflowX: "hidden",
// 		overflowY: "scroll",
// 		width: "24.2rem",
// 		borderRadius: "15px",
// 		padding: "0 10px",
// 		background: "transparent",
// 		backgroundColor: "rgba(0, 0, 0, 0.07)",
// 		backdropFilter: "15px",
// 		boxShadow: "none",
// 		"&::-webkit-scrollbar": {
// 			width: "3px",
// 		},
// 		"&::-webkit-scrollbar-track": {
// 			backgroundColor: "#EAFBF3",
// 			borderRadius: "3px",
// 		},
// 		"&::-webkit-scrollbar-thumb": {
// 			backgroundColor: "#75E4AA",
// 			outline: "1px solid #75E4AA",
// 			borderRadius: "5px",
// 		},
// 		"& .MuiMenuItem-root": {
// 			padding: "10px 20px",
// 			color: "#EAFBF3",
// 			display: "block",
// 			"&:hover": {
// 				background: "rgba(255, 255, 255, 0.07)",
// 				backdropFilter: "21px",
// 				borderRadius: "15px",
// 				"& .MuiBox-root": {
// 					display: "block",
// 				},
// 				"& .MuiTypography-subtitle1": {
// 					color: "#75E4AA",
// 				},
// 			},
// 			"& .MuiBox-root": {
// 				display: "none",
// 			},
// 			"& .MuiTypography-subtitle1": {
// 				fontSize: "16px",
// 			},
// 			"& .MuiTypography-subtitle2": {
// 				fontSize: "14px",
// 				marginTop: "3px",
// 				letterSpacing: "1px",
// 			},
// 		},
// 	},
// });

// const Header = (props) => {
// 	const router = useRouter();
// 	const [marketMenu, setMarketMenu] = React.useState(null);
// 	const [moreMenu, setMoreMenu] = React.useState(null);
// 	const { account } = useActiveWeb3React();

// 	const currencyCD3D = useCurrency(tokens.cd3d.address);
// 	const currencyBUSD = useCurrency(tokens.busd.address);

// 	const currencyBalances = useCurrencyBalances(account ?? undefined, [
// 		currencyCD3D,
// 		currencyBUSD,
// 	]);

// 	return (
// 		<AppBar position="fixed" className={styles.menuBG}>
// 			<Toolbar>
// 				<Image
// 					src={Logo}
// 					alt="logo"
// 					width={130}
// 					height={35}
// 					objectFit={"contain"}
// 					onClick={() => {
// 						router.push("/");
// 					}}
// 				/>
// 				<Stack
// 					direction={"row"}
// 					alignItems={"center"}
// 					justifyContent={"space-between"}
// 					sx={{
// 						flexGrow: 1,
// 						marginLeft: "50px",
// 						display: { xs: "none", sm: "none", md: "flex" },
// 					}}>
// 					<Box sx={{ flexGrow: 1 }}>
// 						<HeaderMenuLink
// 							aria-controls="basic-menu"
// 							aria-haspopup="true"
// 							onClick={(event) => {
// 								setMarketMenu(event.currentTarget);
// 							}}>
// 							MARKETPLACE <ArrowDropDownIcon />
// 						</HeaderMenuLink>
// 						<HeaderMenuLink
// 							aria-controls="basic-menu"
// 							aria-haspopup="true"
// 							onClick={(event) => {
// 								router.push("/referral");
// 							}}>
// 							REFERRAL
// 						</HeaderMenuLink>
// 						<HeaderMenuLink
// 							aria-controls="basic-menu"
// 							aria-haspopup="true"
// 							onClick={(event) => {}}>
// 							COMMUNITY
// 						</HeaderMenuLink>
// 						<HeaderMenuLink
// 							aria-controls="basic-menu"
// 							aria-haspopup="true"
// 							onClick={(event) => {
// 								setMoreMenu(event.currentTarget);
// 							}}>
// 							MORE <ArrowDropDownIcon />
// 						</HeaderMenuLink>
// 						<HeaderMenu
// 							sx={{ mt: "45px" }}
// 							id="menu-market-appbar"
// 							anchorEl={marketMenu}
// 							anchorOrigin={{
// 								vertical: "top",
// 								horizontal: "left",
// 							}}
// 							keepMounted
// 							transformOrigin={{
// 								vertical: "top",
// 								horizontal: "left",
// 							}}
// 							open={Boolean(marketMenu)}
// 							onClose={() => {
// 								setMarketMenu(null);
// 							}}>
// 							{marketPlaceData.map((item) => (
// 								<MenuItem
// 									key={item.id}
// 									onClick={() => {
// 										setMarketMenu(null);
// 									}}>
// 									<Link href={item.link}>
// 										<Stack
// 											direction={"row"}
// 											alignItems={"center"}
// 											justifyContent={"space-between"}
// 											sx={{ width: "100%" }}>
// 											<Stack>
// 												<Typography
// 													component={"span"}
// 													variant={"subtitle1"}>
// 													{item.title}
// 												</Typography>
// 												<Typography
// 													component={"span"}
// 													variant={"subtitle2"}>
// 													{item.subTitle}
// 												</Typography>
// 											</Stack>
// 											<Box>
// 												<Image
// 													src={
// 														"/assets/homepage/forwardIcon.svg"
// 													}
// 													width={10}
// 													height={10}
// 												/>
// 											</Box>
// 										</Stack>
// 									</Link>
// 								</MenuItem>
// 							))}
// 						</HeaderMenu>
// 						<HeaderMenu
// 							sx={{ mt: "45px" }}
// 							id="menu-more-appbar"
// 							anchorEl={moreMenu}
// 							anchorOrigin={{
// 								vertical: "top",
// 								horizontal: "left",
// 							}}
// 							keepMounted
// 							transformOrigin={{
// 								vertical: "top",
// 								horizontal: "left",
// 							}}
// 							open={Boolean(moreMenu)}
// 							onClose={() => {
// 								setMoreMenu(null);
// 							}}>
// 							{moreData.map((item) => (
// 								<a href={item.link} target="_blank">
// 									<MenuItem
// 										key={item.id}
// 										onClick={() => {
// 											setMoreMenu(null);
// 										}}>
// 										<Stack
// 											direction={"row"}
// 											alignItems={"center"}
// 											justifyContent={"space-between"}
// 											sx={{ width: "100%" }}>
// 											<Stack>
// 												<Typography
// 													component={"span"}
// 													variant={"subtitle1"}>
// 													{item.title}
// 												</Typography>
// 												<Typography
// 													component={"span"}
// 													variant={"subtitle2"}>
// 													{item.subTitle}
// 												</Typography>
// 											</Stack>
// 											<Box>
// 												<Image
// 													src={
// 														"/assets/homepage/forwardIcon.svg"
// 													}
// 													width={10}
// 													height={10}
// 												/>
// 											</Box>
// 										</Stack>
// 									</MenuItem>
// 								</a>
// 							))}
// 						</HeaderMenu>
// 					</Box>
// 					{account ? (
// 						<WalletHeaderComponent
// 							wallet={account}
// 							busd={currencyBalances[1]?.toSignificant(6) ?? "-"}
// 							cd3d={currencyBalances[0]?.toSignificant(12) ?? "-"}
// 						/>
// 					) : (
// 						<HeaderClient />
// 					)}
// 				</Stack>
// 				<DrawerComponent />
// 			</Toolbar>
// 		</AppBar>
// 	);
// };

// export default Header;

import React from "react";
import Image from "next/image";
import Logo from "../../public/assets/logo.svg";
import CinemaLogo from "../../public/assets/homepage/CinemaLogo.png";

import Container from "@mui/material/Container";
import styles from "../../styles/navbar.module.css";
import { AppBar, Toolbar, CssBaseline } from "@material-ui/core";
import DrawerComponent from "./HeaderComponents/DrawerComponent";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import Button from "@mui/material/Button";
import { marketPlaceData, moreData, socialData } from "data/data";
import CustomMenu from "../CustomMenu/CustomMenu";
import CustomMenuItem from "../CustomMenuItem/CustomMenuItem";

const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<AppBar position="static" className={styles.menuBG}>
				<Container style={{ padding: 0 }}>
					<CssBaseline />
					<Toolbar style={{ padding: 0 }}>
						<div className={styles.navbarInner}>
							<Link href="/">
								<Image
									src={Logo}
									alt="logo"
									width={300}
									height={130}
								/>
							</Link>

							<DrawerComponent />
						</div>

						<div className={styles.navlinks}>
							<CustomMenu
								anchorEl={anchorEl}
								handleClose={handleClose}
								handleClick={handleClick}
								child1={
									<Button
										aria-controls="basic-menu"
										aria-haspopup="true"
										aria-expanded={
											open ? "true" : undefined
										}
										onClick={handleClick}>
										MARKETPLACE <ArrowDropDownIcon />
									</Button>
								}
								child2={marketPlaceData.map((item, index) => (
									<CustomMenuItem
										key={item.id}
										title={item.title}
										subTitle={item.subTitle}
										disabled={true}
										to={item.link}
										external={item.external}
									/>
								))}
							/>

							<a href="" className={styles.RefferalDisabled}>
								REFERRAL
							</a>
							{/* <Link href="">REFERRAL</Link> */}

							<CustomMenu
								child1={
									<Button
										aria-controls="basic-menu"
										aria-haspopup="true"
										aria-expanded={
											open ? "true" : undefined
										}
										onClick={handleClick}>
										COMMUNITY
										<ArrowDropDownIcon />
									</Button>
								}
								child2={socialData.map((elem) => (
									<CustomMenuItem
										key={elem.id}
										title={elem.title}
										subTitle={elem.subTitle}
										disabled={true}
										to={elem.link}
										external={elem.external}
										handleClose={handleClose}
									/>
								))}
							/>
							<CustomMenu
								anchorEl={anchorEl}
								handleClose={handleClose}
								handleClick={handleClick}
								child1={
									<Button
										aria-controls="basic-menu"
										aria-haspopup="true"
										aria-expanded={
											open ? "true" : undefined
										}
										onClick={handleClick}>
										MORE <ArrowDropDownIcon />
									</Button>
								}
								child2={moreData.map((elem) => (
									<CustomMenuItem
										key={elem.id}
										title={elem.title}
										subTitle={elem.subTitle}
										disabled={true}
										to={elem.link}
										external={elem.external}
										handleClose={handleClose}
									/>
								))}
							/>
						</div>

						<div className={styles.rightMenu}>
							<a
								href="https://cinemadraft.co/"
								target="_blank"
								className={styles.playLink}>
								Play
							</a>
							<a href="https://cinemadraft.co/" target="_blank">
								<div className={styles.cinemaLog}>
									<Image
										src={CinemaLogo}
										alt="CinemaLogo"
										width={130}
										height={29}
									/>
								</div>
							</a>
						</div>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
};

export default Header;
