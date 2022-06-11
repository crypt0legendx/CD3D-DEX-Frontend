import React, {useCallback, useMemo, useState} from 'react';
import {Box, Stack, Typography, Grid} from "@mui/material";
import {styled} from "@mui/material/styles";
import { splitSignature } from '@ethersproject/bytes'
import {ETHER, Percent} from "cd3d-dex-libs-sdk";
import Image from "next/image";
import {useRouter} from "next/router";
import ClearFix from "../../../components/ClearFix/ClearFix";
import FormAdvancedTextField from "../../../components/Form/FormAdvancedTextField";
import ArrowDown from '../../../public/assets/svgs/arrow_down.svg';
import FormSubmitBtn from "../../../components/Form/FormSubmitBtn";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import tokens from "../../../constants/tokens";
import {wrappedCurrency} from "../../../utils/wrappedCurrency";
import {useCurrency} from "../../../hooks/Tokens";
import {useBurnActionHandlers, useBurnState, useDerivedBurnInfo} from "../../../state/burn/hooks";
import {Field, ROUTER_ADDRESS} from "../../../constants";
import {useGasPrice, useUserSlippageTolerance} from "../../../state/user/hooks";
import {usePairContract} from "../../../hooks/useContract";
import {ApprovalState, useApproveCallback} from "../../../hooks/useApproveCallback";
import useDebouncedChangeHandler from "../../../utils/useDebouncedChangeHandler";
import useTransactionDeadline from "../../../hooks/useTransactionDeadline";
import {calculateGasMargin, calculateSlippageAmount, getBscScanLink, getRouterContract} from "../../../utils";
import BigNumber from "bignumber.js";
import {addTransaction} from "../../../state/transactions/actions";
import LiquiditySubmittingTxDialog from "../../../components/Dialogs/LiquiditySubmittingTxDialog";
import {showToast} from "../../../utils/toast";
import {Link} from "@material-ui/core";
import {LiquidityContainer, LiquidityLabel, LiquidityTitleBox, MaxButton, PercentButton, ReceiveContainer} from "../../../components/Liquidity/liquidity_widget";

const LiquidityPost = styled(Box)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: '15px',
    padding: "30px",

    backdropFilter: "blur(30px)",
    position: "relative",
    overflow: "hidden",
    '& .MuiTypography-subtitle1': {
        color: "#BAC4D7",
        fontSize: "14px",
        textAlign: "center",
        lineHeight: "32px",
        display: "block",
    }
});


const LiquidityRemove = () => {
    const router = useRouter()
    const {addresses} = router.query;

    const {account, chainId, library} = useActiveWeb3React();

    const liquidityRemoveContainerRef = React.useRef(null);
    const [{attemptingTxn, txErrorMessage, txHash}, setLiquidityRemoveState] = useState({
        attemptingTxn: false,
        txErrorMessage: undefined,
        txHash: undefined,
    })

    const currencyIdA = (addresses && addresses[0]) ? addresses[0] : 'BNB';
    const currencyIdB = (addresses && addresses[1]) ? addresses[1] : tokens.cd3d.address;

    const currencyA = useCurrency(currencyIdA);
    const currencyB = useCurrency(currencyIdB);
    const gasPrice = useGasPrice();

    const [tokenA, tokenB] = useMemo(
        () => [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)],
        [currencyA, currencyB, chainId],
    );

    const { pair, parsedAmounts, error } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined);
    const { onUserInput: _onUserInput } = useBurnActionHandlers();

    // wrapped onUserInput to clear signatures
    const onUserInput = useCallback(
        (field, value) => {
            return _onUserInput(field, value)
        },
        [_onUserInput],
    )

    const onLiquidityInput = useCallback((value) => onUserInput(Field.LIQUIDITY, value), [onUserInput])
    const onCurrencyAInput = useCallback((value) => onUserInput(Field.CURRENCY_A, value), [onUserInput])
    const onCurrencyBInput = useCallback((value) => onUserInput(Field.CURRENCY_B, value), [onUserInput])

    const liquidityPercentChangeCallback = useCallback(
        (value) => {
            onUserInput(Field.LIQUIDITY_PERCENT, value.toString())
        },
        [onUserInput],
    )

    const [innerLiquidityPercentage, setInnerLiquidityPercentage] = useDebouncedChangeHandler(
        Number.parseInt(parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0)),
        liquidityPercentChangeCallback,
    );

    const { independentField, typedValue } = useBurnState();
    const deadline = useTransactionDeadline();
    const [allowedSlippage] = useUserSlippageTolerance();

    const formattedAmounts = {
        [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
            ? '0'
            : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
                ? '<1'
                : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
        [Field.LIQUIDITY]:
            independentField === Field.LIQUIDITY ? typedValue : parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) ?? '',
        [Field.CURRENCY_A]:
            independentField === Field.CURRENCY_A ? typedValue : parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
        [Field.CURRENCY_B]:
            independentField === Field.CURRENCY_B ? typedValue : parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
    }

    const atMaxAmount = parsedAmounts[Field.LIQUIDITY_PERCENT]?.equalTo(new Percent('1'))
    const pairContract = usePairContract(pair?.liquidityToken?.address)

    const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], ROUTER_ADDRESS)

    async function onRemove() {
        if (!chainId || !library || !account || !deadline) throw new Error('missing dependencies')
        const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts
        if (!currencyAmountA || !currencyAmountB) {
            throw new Error('missing currency amounts')
        }
        const router = getRouterContract(chainId, library, account)

        const amountsMin = {
            [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
            [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
        }

        if (!currencyA || !currencyB) throw new Error('missing tokens')
        const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
        if (!liquidityAmount) throw new Error('missing liquidity amount')

        const currencyBIsETH = currencyB === ETHER
        const oneCurrencyIsETH = currencyA === ETHER || currencyBIsETH

        if (!tokenA || !tokenB) throw new Error('could not wrap')

        let methodNames
        let args
        // we have approval, use normal remove liquidity
        if (approval === ApprovalState.APPROVED) {
            // removeLiquidityETH
            if (oneCurrencyIsETH) {
                methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens']
                args = [
                    currencyBIsETH ? tokenA.address : tokenB.address,
                    liquidityAmount.raw.toString(),
                    amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
                    amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
                    account,
                    deadline.toHexString(),
                ]
            }
            // removeLiquidity
            else {
                methodNames = ['removeLiquidity']
                args = [
                    tokenA.address,
                    tokenB.address,
                    liquidityAmount.raw.toString(),
                    amountsMin[Field.CURRENCY_A].toString(),
                    amountsMin[Field.CURRENCY_B].toString(),
                    account,
                    deadline.toHexString(),
                ]
            }
        } else {
            throw new Error('Attempting to confirm without approval or a signature. Please contact support.')
        }

        const safeGasEstimates = await Promise.all(
            methodNames.map((methodName) =>
                router.estimateGas[methodName](...args)
                    .then(calculateGasMargin)
                    .catch((err) => {
                        console.error(`estimateGas failed`, methodName, args, err)
                        return undefined
                    }),
            ),
        )

        const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
            BigNumber.isBigNumber(safeGasEstimate),
        )

        // all estimations failed...
        if (indexOfSuccessfulEstimation === -1) {
            console.error('This transaction would fail. Please contact support.')
        } else {
            const methodName = methodNames[indexOfSuccessfulEstimation]
            const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation]

            setLiquidityRemoveState(prevState => ({...prevState, attemptingTxn: true, txErrorMessage: false, txHash: undefined}));
            await router[methodName](...args, {
                gasLimit: safeGasEstimate,
                gasPrice,
            })
                .then(async (response) => {
                    await response.wait();
                    setLiquidityRemoveState(prevState => ({...prevState, attemptingTxn: false, txErrorMessage: false, txHash: response.hash}));

                    setInnerLiquidityPercentage(0);
                    addTransaction(response, {
                        summary: `Remove ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
                            currencyA?.symbol
                        } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencyB?.symbol}`,
                    })

                    showToast("success", "Transaction Receipt", "Your transaction was succeed.",
                        (<Link target={"_blank"} href={getBscScanLink(response.hash, 'transaction')}>
                            <Typography variant="subtitle2" sx={{color: "#CC0136", fontSize: "14px", fontWeight: "bold", textAlign: "center"}}>
                                View on Binance
                            </Typography>
                        </Link>));
                })
                .catch((err) => {
                    setLiquidityRemoveState(prevState => ({...prevState, attemptingTxn: false, txErrorMessage: e?.message, txHash: undefined}));
                    showToast("error", "Transaction Failed", e?.message ?? '');
                    // we only care if the error is something _other_ than the user rejected the tx
                    console.error(err)
                })
        }
    }

    console.log('pair', pair);
    const price = pair?.priceOf(tokenA);
    return (
        <Box sx={{width: "100%"}}>
            <LiquidityContainer ref={liquidityRemoveContainerRef}>
                <LiquidityTitleBox>
                    <Typography component={"span"} variant={"subtitle1"}>Remove Liquidity</Typography>
                    {
                        <Box>
                            <Typography component={"span"} variant={"subtitle2"}>Enter amount to remove liquidity</Typography>
                        </Box>
                    }
                </LiquidityTitleBox>
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    spacing={1}
                >
                    <ClearFix height={15}/>
                    <LiquidityLabel shrink htmlFor={"daily_reward"}>
                        <Typography variant={"subtitle1"} component={"label"}>Amount to Remove</Typography>
                    </LiquidityLabel>
                    <FormAdvancedTextField
                        id={"amount_remove"}
                        InputProps={{
                            type: 'number',
                            placeholder: '0',
                            min: '0',
                            onChange: ((event) => setInnerLiquidityPercentage(Math.ceil(event.target.value))),
                            disableUnderline: true,
                            value: innerLiquidityPercentage,
                            endAdornment: <Typography component={"span"} variant={"subtitle1"}>%</Typography>,
                        }}
                    />
                    <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"center"}
                        spacing={1}
                        sx={{marginTop: "5px", padding: "0 10px"}}
                    >
                        <PercentButton variant={"outlined"} size={"large"} onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '25')}>
                            25%
                        </PercentButton>
                        <PercentButton variant={"outlined"} size={"large"} onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '50')}>
                            50%
                        </PercentButton>
                        <PercentButton variant={"outlined"} size={"large"} onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '75')}>
                            75%
                        </PercentButton>
                        <MaxButton variant={"outlined"} size={"large"} onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}>
                            Max
                        </MaxButton>
                    </Stack>
                    <ClearFix height={30}/>
                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{height: "100%"}}>
                        <Image src={ArrowDown} alt='Picture of DownArrow'/>
                    </Stack>
                    <ClearFix height={30}/>
                    <LiquidityLabel shrink>
                        <Typography variant={"subtitle1"} component={"label"}>You will receive</Typography>
                    </LiquidityLabel>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        spacing={1}
                    >
                        <ReceiveContainer>
                            <Stack
                                direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                            >
                                <Typography variant={"subtitle1"} component={"span"}>{formattedAmounts[Field.CURRENCY_A] || '-'}</Typography>
                                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
                                    <Typography variant={"subtitle2"} component={"span"}>{currencyA?.symbol}</Typography>
                                    <Image src={"/assets/images/busd.png"} width={22} height={22} objectFit={"contain"}/>
                                </Stack>
                            </Stack>
                        </ReceiveContainer>
                        <ReceiveContainer>
                            <Stack
                                direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                            >
                                <Typography variant={"subtitle1"} component={"span"}>{formattedAmounts[Field.CURRENCY_B] || '-'}</Typography>
                                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                                    <Typography variant={"subtitle2"} component={"span"}>{currencyB?.symbol}</Typography>
                                    <Image src={"/assets/images/cd3d.png"} width={22} height={22} objectFit={"contain"}/>
                                </Stack>
                            </Stack>
                        </ReceiveContainer>
                    </Stack>
                    <ClearFix height={25}/>
                    <Stack
                        direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                    >
                        <Typography variant={"subtitle1"} component={"span"} style={{color: "#FFFFFF", fontSize: "14px", fontWeight: "normal"}}>Current Rate</Typography>
                        <Typography variant={"subtitle1"} component={"span"} style={{color: "#FFFFFF", fontSize: "14px", fontWeight: "normal"}}>{price?.toSignificant(6)??'-'} {currencyB?.symbol}/{currencyA?.symbol}</Typography>
                    </Stack>
                    <ClearFix height={25}/>
                    { approval !== ApprovalState.APPROVED ?
                        <FormSubmitBtn
                            label={approval === ApprovalState.PENDING?"Approving":"Approve"}
                            disabled={approval !== ApprovalState.NOT_APPROVED}
                            fullWidth={true}
                            onSubmit={approveCallback}
                        /> :
                        <FormSubmitBtn
                            label={"Remove"}
                            disabled={error}
                            fullWidth={true}
                            onSubmit={onRemove}
                        />
                    }
                </Stack>
            </LiquidityContainer>
            <ClearFix height={15}/>
            <LiquidityPost>
                <Typography component={"span"} variant={"subtitle1"}>
                    Add liquidity to earn 0.17% of all trades on this trading pair, relative to your portion of the pool. You may claim your real-time accrued
                    fees added to the pool by withdrawing your liquidity.
                </Typography>
            </LiquidityPost>
            <ClearFix height={100}/>
            <LiquiditySubmittingTxDialog
                show={attemptingTxn || !!txHash || !!txErrorMessage}
                txHash={txHash}
                swapErrorMessage={txErrorMessage}
                onClose={() => setLiquidityRemoveState(prevState => ({
                    ...prevState,
                    txHash: undefined,
                    txErrorMessage: undefined,
                    attemptingTxn: false
                }))}
                onRetry={() => {
                    setLiquidityRemoveState(prevState => ({
                        ...prevState,
                        txHash: undefined,
                        txErrorMessage: undefined,
                        attemptingTxn: false
                    }));
                    onRemove();
                }}
            />
        </Box>
    );
}
export default LiquidityRemove