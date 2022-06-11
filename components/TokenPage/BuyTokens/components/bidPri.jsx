import React from "react";
import styles from "../../../../styles/buyToke.module.css";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { FormHelperText } from "@mui/material";

const BidPri = (props) => {
	const { value, handleChangeOnbitPrice, errMsg } = props;
	return (
		<Stack width={"100%"} direction={"column"}>
			<Stack width={"100%"} direction={"row"}>
				<Typography variant="subtitle2" gutterBottom component="p">
					Bid Price{" "}
					<span style={{ color: "#7689B0" }}>
						{" "}
						(How much do i think this is worth?){" "}
					</span>
				</Typography>
			</Stack>
			<div className={styles.bidPriceInput}>
				<input
					type="number"
					placeholder="0"
					min="0"
					value={value}
					onChange={(e) => handleChangeOnbitPrice(e)}
				/>
				<Typography variant="subtitle2" gutterBottom component="p">
					BUSD/CD3D
				</Typography>
			</div>
			{errMsg && <FormHelperText error>{errMsg}</FormHelperText>}
		</Stack>
	);
};

export default BidPri;
