import React from "react";
import styles from "../../../../styles/buyToke.module.css";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import CD3Dlogo from "../../../../public/assets/homepage/CD3D-icon.svg";
import InvertIcon from "../../../invertIcon";
import { Stack } from "@mui/material";

const Amount3D = (props) => {
	const { value, handleChangeOnCd3d, rate } = props;
	return (
		// <div className={styles.bidPriceOuter}>
		//   <div className={styles.bidPriceInput}>
		//     <input value={value} type='number' placeholder='0' min='0' onChange={handleChangeOnCd3d} />
		//     <Typography variant='subtitle2' gutterBottom component='div'>
		//       CD3D <Image src={CD3Dlogo} alt='Picture of CD3D' />
		//     </Typography>
		//   </div>
		//   <div className={styles.tokenPriceContainer}>
		//     <Typography variant='subtitle2' gutterBottom component='div'>
		//       1 CD3D = {rate} BUSD
		//     </Typography>
		//     <InvertIcon />
		//   </div>
		// </div>

		<Stack width={"100%"} direction={"column"}>
			<Stack width={"100%"} direction={"row"}>
				<Typography variant="subtitle2" gutterBottom component="p">
					Amount in CD3D{" "}
					<span style={{ color: "#7689B0" }}>
						{" "}
						(equals how many tokens I will get?){" "}
					</span>
				</Typography>
			</Stack>
			<div className={styles.bidPriceInput}>
				{/* <input value={value} type='number' placeholder='0' min='0' onChange={handleChangeOnCd3d} /> */}

				{/* {create a read only input field} */}
				<input
					type="number"
					value={value}
					placeholder="0"
					min="0"
					readOnly
				/>

				<Typography variant="subtitle2" gutterBottom component="p">
					CD3D <Image src={CD3Dlogo} alt="Picture of CD3D" />
				</Typography>
			</div>
			<div className={styles.tokenPriceContainer}>
				{/* <Typography variant="subtitle2" gutterBottom component="div">
					1 CD3D = {rate} BUSD
				</Typography>
				<InvertIcon /> */}
			</div>
		</Stack>
	);
};

export default Amount3D;

// <label>
//   Amount in CD3D <span>(equals how many tokens I will get?)</span>
// </label>;
