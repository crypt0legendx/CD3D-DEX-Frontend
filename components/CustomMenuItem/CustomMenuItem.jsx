import React, { useState } from "react";
import { Typography, MenuItem } from "@material-ui/core";
import styles from "../../styles/customMenu.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import Image from "next/image";

function CustomMenuItem(props) {
	const [state, setState] = useState(false);
	const [hoverDisabled, setHoverDisabled] = useState(false);

	const handleOnHoverActive = () => {
		setState(true);
	};
	const handleOnHoverDeactive = () => {
		setState(false);
	};
	return (
		<div className={`${styles.MenuItemContainer}`}>
			{props.external ? (
				<MenuItem className={`${styles.MenuItem}`}>
					<a href={`${props.to}`} target="_blank">
						<div
							className={styles.titleContainer}
							onMouseOver={handleOnHoverActive}
							onMouseOut={handleOnHoverDeactive}>
							<div className={styles.titleSubContainer}>
								<Typography
									className={styles.title}
									variant="subtitle1">
									{props?.title}
								</Typography>
								<Typography variant="subtitle2">
									{props?.subTitle}
								</Typography>
							</div>
							{state && (
								<div>
									<Image
										src={"/assets/homepage/forwardIcon.svg"}
										width={10}
										height={10}
									/>
								</div>
							)}
						</div>
					</a>
				</MenuItem>
			) : props.to ? (
				<MenuItem className={`${styles.MenuItem}`}>
					<Link href={`${props.to}`}>
						<div
							className={styles.titleContainer}
							onMouseOver={handleOnHoverActive}
							onMouseOut={handleOnHoverDeactive}>
							<div className={styles.titleSubContainer}>
								<Typography
									className={styles.title}
									variant="subtitle1">
									{props?.title}
								</Typography>
								<Typography variant="subtitle2">
									{props?.subTitle}
								</Typography>
							</div>
							{state && (
								<div>
									<Image
										src={"/assets/homepage/forwardIcon.svg"}
										width={10}
										height={10}
									/>
								</div>
							)}
						</div>
					</Link>
				</MenuItem>
			) : (
				<MenuItem className={`${styles.MenuItemDisabled} `}>
					<div className={styles.titleContainer}>
						<div className={styles.titleSubContainer}>
							<Typography
								className={styles.title}
								variant="subtitle1">
								{props?.title}
							</Typography>
							<Typography variant="subtitle2">
								{props?.subTitle}
							</Typography>
						</div>
						{state && (
							<div>
								<ArrowForwardIosIcon sx={style.largeIcon} />
							</div>
						)}
					</div>
				</MenuItem>
			)}
		</div>
	);
}

export default CustomMenuItem;
