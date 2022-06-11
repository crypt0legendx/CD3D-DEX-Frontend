import React from "react";
import styles from "../../../../styles/buyToke.module.css";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Image from "next/image";
import BUSD from "../../../../public/assets/homepage/BUSD-icon.svg";
import { FormHelperText } from "@mui/material";

const Busd = (props) => {
	const { value, handleChangeOnBusd, errMsg } = props;
	return (
		<Stack width={"100%"} direction={"column"}>
			<Stack width={"100%"} direction={"row"}>
				<Typography variant="subtitle2" gutterBottom component="p">
					Amount in BUSD{" "}
					<span style={{ color: "#7689B0" }}>
						{" "}
						(How much do I think I can spend?){" "}
					</span>
				</Typography>
			</Stack>
			<div className={styles.bidPriceInput}>
				<input
					type="number"
					value={value}
					placeholder="0"
					min="0"
					onChange={(e) => handleChangeOnBusd(e)}
				/>
				<Typography
					variant="subtitle2"
					gutterBottom
					component="div"
					display={"flex"}
					justifyContent={"space=between"}>
					BUSD{" "}
					<Image
						src={BUSD}
						alt="Picture of BUSD"
						style={{ marginLeft: "10px" }}
						className={styles.busdImage}
					/>
				</Typography>
			</div>
			{errMsg && <FormHelperText error>{errMsg}</FormHelperText>}
			<Stack
				direction={"row"}
				width={"100%"}
				justifyContent={"space-between"}>
				<Typography variant="subtitle2" gutterBottom component="p">
					Min. Buy $10.00
				</Typography>
			</Stack>
		</Stack>
	);
};

export default Busd;
// <label>
//   Amount in BUSD <span> (How much do I think I can spend?)</span>
// </label>
