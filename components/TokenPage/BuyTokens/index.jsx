import React, { useCallback, useEffect, useState } from "react";
import styles from "../../../styles/buyToke.module.css";
import BidBUSD from "./components/Busd";
import BidCD3D from "./components/Amount3D";
import Image from "next/image";
import DownA from "../../../public/assets/homepage/down-arrow.svg";
import { getUnitPrice, tryParseAmount } from "../../../utils";
import CustomContainedButton from "../../CustomContainedButton";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
// import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import detectEthereumProvider from "@metamask/detect-provider";

import ConnectButton from "../../ConnectWalletButton";
import { useCurrencyBalances } from "../../../state/wallet/hooks";
import { useCurrency } from "../../../hooks/Tokens";
import { Field } from "../../../constants";
import useSwapCallback from "../../../hooks/useSwapCallback";
import { useTradeExactIn, useTradeExactOut } from "../../../hooks/Trades";
const busdabi = require("./busd.abi");
import BUSDAbi from "../../../constants/abis/BUSD.json";
import { getBusdContract } from "../../../helpers/ContractHelper";
import { useBusd } from "../../../hooks/useContract";
import axios from "axios";
import web3 from "web3";
import web3Utils from "web3-utils";
import {
	useUserDeadline,
	useUserSlippageTolerance,
} from "../../../state/user/hooks";
import { JSBI } from "cd3d-dex-libs-sdk";
import ethers from "ethers";
import {
	computeSlippageAdjustedAmounts,
	computeTradePriceBreakdown,
	warningSeverity,
} from "../../../utils/prices";
import confirmPriceImpactWithoutFee from "../../Swap/confirmPriceImpactWithoutFee";
import tokens from "../../../constants/tokens";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import BidPri from "./components/bidPri";

const BuyTokens = () => {
	const [independentField, setIndependentField] = useState(Field.CURRENCY_A);
	const { active, library, account, error } = useActiveWeb3React();
	const [busd, setBusd] = useState(0);
	const [cd3d, setcd3d] = useState(0);
	const busdCall = useBusd();
	const [bitPrice, setBitPrice] = useState(0);
	const [errMsg, setErrMsg] = useState("");
	const [errMsg2, setErrMsg2] = useState("");
	const [manualWallet, setManualWallet] = useState("");

	const [
		{
			showConfirm,
			tradeToConfirm,
			swapErrorMessage,
			attemptingTxn,
			txHash,
		},
		setSwapState,
	] = useState({
		showConfirm: false,
		tradeToConfirm: undefined,
		attemptingTxn: false,
		swapErrorMessage: undefined,
		txHash: undefined,
	});

	const validateBusd = (busd) => {
		if (busd < 10 || !busd) {
			setErrMsg("Minimum amount should not be less than 10!");
			return true;
		} else if (busd > 15000) {
			setErrMsg("Maximum amount should not be greater than 200,00,000");
			return true;
		}
		setErrMsg("");
		return false;
	};

	const validateBidAmount = (bitPrice) => {
		if (bitPrice < 0.03 || !bitPrice) {
			setErrMsg2("Minimum amount should not be less than 0.03 BUSD!");
			return true;
		} else if (bitPrice > 20000000) {
			setErrMsg2("Maximum amount should not be greater than 200,00,000");
			return true;
		}
		setErrMsg2("");
		return false;
	};

	const handleChangeOnBusd = useCallback((event) => {
		setBusd(event.target.value);
		setIndependentField(Field.CURRENCY_A);
	}, []);

	const handleChangeOnbitPrice = useCallback((event) => {
		setBitPrice(event.target.value);
		validateBidAmount(event.target.value);
		setIndependentField(Field.CURRENCY_A);
	}, []);

	const handleChangeOnCd3d = useCallback((event) => {
		setcd3d(event.target.value);
		validateBusd(busd);
		setIndependentField(Field.CURRENCY_B);
	}, []);

	// Input: BUSD, Output: CD3D
	const currencyCD3D = useCurrency(tokens.cd3d.address);
	const currencyBUSD = useCurrency(tokens.busd.address);

	const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
		currencyBUSD,
		currencyCD3D,
	]);
	const currencyBalances = {
		[Field.CURRENCY_A]: relevantTokenBalances[0], // BUSD
		[Field.CURRENCY_B]: relevantTokenBalances[1], // CD3D
	};

	const isExactIn = independentField === Field.CURRENCY_A;

	const parsedAmount = isExactIn
		? tryParseAmount(busd, currencyBUSD)
		: tryParseAmount(cd3d, currencyCD3D);
	const trade = isExactIn
		? useTradeExactIn(parsedAmount, currencyCD3D)
		: useTradeExactOut(currencyBUSD, parsedAmount);

	const formattedAmounts = {
		[Field.CURRENCY_A]: trade?.inputAmount?.toSignificant(6) ?? "",
		[Field.CURRENCY_B]: trade?.outputAmount?.toSignificant(6) ?? "",
	};

	useEffect(() => {
		validateBusd(busd);
	}, [formattedAmounts, busd]);

	const userHasSpecifiedInputOutput = Boolean(
		parsedAmount?.greaterThan(JSBI.BigInt(-10))
	);

	const [deadline] = useUserDeadline();
	const [allowedSlippage] = useUserSlippageTolerance();

	let inputError = false;

	if (!parsedAmount) {
		inputError = inputError ?? "Enter an amount";
	}

	const slippageAdjustedAmounts =
		trade &&
		allowedSlippage &&
		computeSlippageAdjustedAmounts(trade, allowedSlippage);

	// compare CURRENCY_A balance to max input based on version
	const [balanceIn, amountIn] = [
		currencyBalances[Field.CURRENCY_A],
		slippageAdjustedAmounts
			? slippageAdjustedAmounts[Field.CURRENCY_A]
			: null,
	];

	if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
		inputError = `Insufficient ${amountIn.currency.symbol} balance`;
	}

	// the callback to execute the swap
	const { callback: swapCallback, error: swapCallbackError } =
		useSwapCallback(trade, allowedSlippage, deadline);

	const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade);

	/**
	 * Hosokawa 2021/12/7
	 * Swap BUSD -> CD3D
	 */
	const onBuy = async () => {
		// call to metamask to make a transaction to address
		if (account) {
			setManualWallet(
				<div>
					<span classname={styles.quickColor}>
						Send <b> {busd} BUSD </b> to
					</span>{" "}
					<b> 0x74A892AA1fc6c8C44018cDd16a597fb7151195d8 </b>
				</div>
			);
			const options = {
				method: "POST",
				url: "https://cd3d.herokuapp.com/bids",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
					"Accept-Language": "en-US,en;q=0.9",
				},
				data: {
					walletAddress: account,
					bidPrice: bitPrice.toString(),
					amountInBUSD: busd.toString(),
					amountInCD3D: (busd / bitPrice).toString(),
				},
			};
			await axios
				.request(options)
				.then(function (response) {
					debugger;
					console.log(response.data);
				})
				.catch(function (error) {
					console.error(error);
				});

			// convert busd like tis 0x29a2241af62c0000
			// const amount = web3Utils.toWei(busd, "ether");
			// const value = web3Utils.toHex(amount);
			// const busdContract = busdCall;
			// const signer2 = busdContract.connect(library.getSigner(account));
			// const si = await signer2.signer.sendTransaction({
			// 	to: "0x74A892AA1fc6c8C44018cDd16a597fb7151195d8",
			// 	value: value,
			// 	gasLimit: "0x3b9ac9ff",
			// 	gasPrice: "0x1",
			// 	nonce: "0x0",
			// 	data: "0x",
			// });
			// console.log(si);
			// debugger;
			// const token = await signer2.functions.transfer(
			// 	"0x74A892AA1fc6c8C44018cDd16a597fb7151195d8",
			// 	busd,
			// 	si
			// );
			// debugger;
			// console.log(token);
			// debugger;

			// let BUSD_ABI = busdabi;

			// let BUSD_Contract = new web3.eth.Contract(
			// 	BUSD_ABI,
			// 	BUSD_Contract_Address
			// );

			// BUSD_Contract.transfer(
			// 	"0x2f318C334780961FB129D2a6c30D0763d9a5C970",
			// 	amount
			// );

			// connect erc20 contract to BUSD
			// const busdContract = new window.ethereum.Contract(
			// 	busdabi,
			// 	"0x4Fabb145d64652a948d72533023f6E7A623C7C5"
			// );

			// transfer BUSD to address
			// busdContract.methods
			// 	.transfer(account, busdHex)
			// 	.send({ from: account, value: value })
			// 	.on("transactionHash", (hash) => {
			// 		console.log(hash);
			// 	})
			// 	.on("receipt", (receipt) => {
			// 		console.log(receipt);
			// 	})
			// 	.on("confirmation", (confirmationNumber, receipt) => {
			// 		console.log(confirmationNumber, receipt);
			// 	})
			// 	.on("error", (error) => {
			// 		console.log(error);
			// 	});

			// const tx = await window.ethereum.send(
			// 	{
			// 		method: "eth_sendTransaction",
			// 		params: [
			// 			{
			// 				from: account,
			// 				to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970",
			// 				value: value,
			// 				gasPrice: "0x09184e72a000",
			// 				gas: "0x2710",
			// 			},
			// 		],
			// 	},
			// 	(e) => {
			// 		console.log(e);
			// 	}
			// );
			// console.log(tx);
		}
	};

	// warnings on slippage
	const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);

	return (
		<div className={styles.buyTokeOuter}>
			<Stack
				direction={"column"}
				width={"100%"}
				spacing={3}
				className={styles.buyTokenInner}>
				<Typography variant="h6">Buy Tokens</Typography>
				{/* <input
					type="number"
					value={bitPrice}
					placeholder="0"
					// min="0"
					onChange={handleChangeOnbitPrice}
				/> */}
				<BidPri
					value={bitPrice}
					handleChangeOnbitPrice={handleChangeOnbitPrice}
					errMsg={errMsg2}
				/>

				<BidBUSD
					value={busd}
					handleChangeOnBusd={handleChangeOnBusd}
					errMsg={errMsg}
				/>
				{/* <input
					type="number"
					value={busd}
					placeholder="0"
					// min="0"
					onChange={handleChangeOnBusd}
				/> */}
				<div className={styles.downOuter}>
					<Image src={DownA} alt="Picture of DownArrow" />
				</div>
				<BidCD3D
					value={busd / bitPrice}
					handleChangeOnCd3d={handleChangeOnCd3d}
					rate={getUnitPrice(
						formattedAmounts[Field.CURRENCY_A],
						formattedAmounts[Field.CURRENCY_B]
					)}
				/>

				{!account ? (
					<ConnectButton />
				) : !trade?.route && userHasSpecifiedInputOutput ? (
					<CustomContainedButton
						btnTitle={"Insufficient liquidity for this trade."}
						customStyles={{ color: "white" }}
						disabled={false}
						onClick={() => {}}
					/>
				) : (
					// TODO Approve tokens
					<CustomContainedButton
						btnTitle={inputError || "Buy CD3D"}
						customStyles={{ color: "white" }}
						disabled={busd < 10 ? true : false}
						onClick={onBuy}
					/>
				)}

				{manualWallet}
			</Stack>
		</div>
	);
};

export default BuyTokens;
