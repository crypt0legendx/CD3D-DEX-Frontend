import React, { useState, useEffect } from "react";
import BidGrid from "./components/BidGrid";
import BidChart from "./components/BidChart";
import BidBeforeStatus from "../../BidBeforeTimeStatus/BidBeforeStatus";
import AfterBidTimeStatus from "../../AfterBidTimeStatus/AfterBidTimeStatus";
import { Stack } from "@mui/material";
import BuyTokens from "../BuyTokens/index.jsx";
import BidBeforeLaunch from "../../BidBeforeLaunch/BidBeforeLaunch";

function getDifferenceInSeconds(date1, date2) {
	const diffInMs = date2 - date1;
	return Math.floor(diffInMs / 1000);
}

const BidPlace = () => {
	const today = new Date();
	const saleStartDate = new Date("Oct 7, 2021 12:00:00:000 GMT");
	const saleEndDate = new Date("Oct 8, 2021 12:00:00:000 GMT");
	const center = getDifferenceInSeconds(today, saleEndDate);
	const seconds = getDifferenceInSeconds(today, saleStartDate);
	const [timeLeft, setTimeLeft] = useState(seconds);
	const [timeLeft2, setTimeLeft2] = useState(center);

	useEffect(() => {
		if (timeLeft < 0 && timeLeft2 > 0) {
			const intervalId2 = setInterval(() => {
				setTimeLeft2(timeLeft2 - 1);
			}, 1000);

			return () => clearInterval(intervalId2);
		} else if (timeLeft < 0 && timeLeft2 < 0) {
			return;
		}

		const intervalId = setInterval(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timeLeft, timeLeft2]);

	return (
		<Stack
			direction={"row"}
			width={"100%"}
			height={"100%"}
			minHeight={"743px"}
			paddingBottom={"30px"}
			marginBottom={"20px"}
			pb={8}
			px={4}
			py={4}
			spacing={2}>
			<Stack
				direction={"column"}
				width={"64%"}
				height={"100%"}
				justifyContent={"center"}>
				<Stack height={"20%"} width={"100%"}>
					<BidGrid />
				</Stack>

				<Stack height={"80%"} minHeight={"534px"} width={"100%"}>
					{/* {true ? (
						<BidBeforeStatus />
					) : timeLeft2 > 0 ? (
						<BidChart />
					) : (
						// <AfterBidTimeStatus />
						<BidBeforeLaunch />
					)} */}
					<BidBeforeStatus />
				</Stack>
			</Stack>
			<Stack
				direction={"column"}
				width={"36%"}
				height={"100%"}
				justifyContent={"center"}>
				<BuyTokens />
			</Stack>
		</Stack>
	);
};

export default BidPlace;
