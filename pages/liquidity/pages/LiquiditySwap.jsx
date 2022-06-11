import React, {useCallback, useState} from 'react';
import {Box, InputAdornment, Stack} from "@mui/material";
import Image from 'next/image';
import {useRouter} from "next/router";
import {Link, Typography} from '@material-ui/core';
import {styled} from "@mui/material/styles";

import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import currencyId, {useCurrency} from "../../../hooks/Tokens";
import {useCurrencyBalance} from "../../../state/wallet/hooks";
import {useDerivedMintInfo, useMintActionHandlers, useMintState} from "../../../state/mint/hooks";
import PlusIcon from '../../../public/assets/plusIcon.svg';
import {Field, ONE_BIPS, ROUTER_ADDRESS, SWAP_TOKEN_LIST} from "../../../constants";
import {useUserDeadline, useUserSlippageTolerance} from "../../../state/user/hooks";
import {calculateGasMargin, calculateSlippageAmount, getBscScanLink, getRouterContract} from "../../../utils";
import {BigNumber} from '@ethersproject/bignumber'
import {ETHER} from "cd3d-dex-libs-sdk";
import {wrappedCurrency} from "../../../utils/wrappedCurrency";
import {showToast} from "../../../utils/toast";
import SwapEndAdornment from "../../../components/Swap/SwapEndAdornment";
import FormAdvancedTextField from "../../../components/Form/FormAdvancedTextField";
import ClearFix from "../../../components/ClearFix/ClearFix";
import FormSubmitBtn from "../../../components/Form/FormSubmitBtn";
import ConnectButton from "../../../components/ConnectWalletButton";
import {TokenSelect} from "../../../components/Swap/TokenSelect";
import {MinimalPositionCard} from "../../../components/PositionCard";
import LiquiditySupplyDialog from "../../../components/Dialogs/LiquiditySupplyDialog";
import LiquiditySubmittingTxDialog from "../../../components/Dialogs/LiquiditySubmittingTxDialog";
import {ApprovalState, useApproveCallback} from "../../../hooks/useApproveCallback";
import {PairState} from "../../../data/Reserves";
import useTransactionDeadline from "../../../hooks/useTransactionDeadline";
import {useTransactionAdder} from "../../../state/transactions/hooks";
import tokens from "../../../constants/tokens";
import {LiquidityContainer, LiquidityTitleBox} from "../../../components/Liquidity/liquidity_widget";

const LiquidityInfoBox = styled(Box)({
    '& .MuiTypography-subtitle1': {
        color: "#FFFFFF",
        fontSize: "14px",
    },
    '& .MuiTypography-subtitle2': {
        color: "#BAC4D7",
        fontSize: "12px",
    }
});

const TotalValueTypography = styled(Typography)({
    color: "#4CDC8F",
    fontSize: "14px",
});


function LiquiditySwap() {
    const router = useRouter()
    const {addresses} = router.query;

    const {account, chainId, library} = useActiveWeb3React();

    const liquidityContainerRef = React.useRef(null);
    const [tokenSelect, setTokenSelect] = useState(0);

    // Add Liquidity States
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [{attemptingTxn, txErrorMessage, txHash}, setLiquidityState] = useState({
        attemptingTxn: false,
        txErrorMessage: undefined,
        txHash: undefined,
    })

    const currencyIdA = (addresses && addresses[0]) ? addresses[0] : 'BNB';
    const currencyIdB = (addresses && addresses[1]) ? addresses[1] : tokens.cd3d.address;

    const currencyA = useCurrency(currencyIdA);
    const currencyB = useCurrency(currencyIdB);

    const currencyABalance = useCurrencyBalance(account ?? undefined, currencyA ?? undefined);
    const currencyBBalance = useCurrencyBalance(account ?? undefined, currencyB ?? undefined);

    const balances = {
        [Field.CURRENCY_A]: currencyABalance?.toSignificant(12),
        [Field.CURRENCY_B]: currencyBBalance?.toSignificant(12)
    }

    // mint state
    const {independentField, typedValue, otherTypedValue} = useMintState();
    const {
        dependentField,
        currencies,
        pair,
        pairState,
        currencyBalances,
        parsedAmounts,
        price,
        noLiquidity,
        liquidityMinted,
        poolTokenPercentage,
        error,
    } = useDerivedMintInfo(currencyA, currencyB);

    const {onFieldAInput, onFieldBInput} = useMintActionHandlers(noLiquidity);

    // check whether the user has approved the router on the tokens
    const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], ROUTER_ADDRESS)
    const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], ROUTER_ADDRESS)

    const addTransaction = useTransactionAdder()

    // txn values
    const deadline = useTransactionDeadline() // custom from users settings
    const [allowedSlippage] = useUserSlippageTolerance() // custom from users

    // get formatted amounts
    const formattedAmounts = {
        [independentField]: typedValue,
        [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
    }

    /**
     * Hosokawa 2021/12/9
     * Add Liquidity Pool BUSD <-> CD3D
     */
    async function onAdd() {
        setShowConfirmModal(false);

        if (!chainId || !library || !account) return
        const router = getRouterContract(chainId, library, account)

        const {[Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB} = parsedAmounts
        if (!parsedAmountA || !parsedAmountB) {
            return
        }

        const amountsMin = {
            [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
            [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
        }

        const deadlineFromNow = Math.ceil(Date.now() / 1000) + deadline

        let estimate
        let method
        let args
        let value = null;

        if (currencyA === ETHER || currencyB === ETHER) {
            const tokenBIsETH = currencyB === ETHER
            estimate = router.estimateGas.addLiquidityETH
            method = router.addLiquidityETH
            args = [
                wrappedCurrency(tokenBIsETH ? currencyA : currencyB, chainId)?.address ?? '', // token
                (tokenBIsETH ? parsedAmountA : parsedAmountB).raw.toString(), // token desired
                amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
                amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
                account,
                deadline.toHexString(),
            ]
            value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).raw.toString())
        } else {
            estimate = router.estimateGas.addLiquidity
            method = router.addLiquidity
            args = [
                wrappedCurrency(currencyA, chainId)?.address ?? '',
                wrappedCurrency(currencyB, chainId)?.address ?? '',
                parsedAmountA.raw.toString(),
                parsedAmountB.raw.toString(),
                amountsMin[Field.CURRENCY_A].toString(),
                amountsMin[Field.CURRENCY_B].toString(),
                account,
                deadlineFromNow,
            ]
        }

        setLiquidityState(prevState => ({...prevState, attemptingTxn: true, txErrorMessage: false, txHash: undefined}));
        // const aa = await estimate(...args, value ? { value } : {})
        console.log('args', args);
        await estimate(...args, value ? {value} : {})
            .then((estimatedGasLimit) =>
                method(...args, {
                    ...(value ? {value} : {}),
                    gasLimit: calculateGasMargin(estimatedGasLimit),
                }).then(async (response) => {
                    console.log('response', response);
                    await response.wait();
                    setLiquidityState(prevState => ({...prevState, attemptingTxn: false, txErrorMessage: false, txHash: response.hash}));

                    onFieldAInput({target: {value: ''}});
                    addTransaction(response, {
                        summary: `Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
                            currencies[Field.CURRENCY_A]?.symbol
                        } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
                    });

                    showToast("success", "Transaction Receipt", "Your transaction was succeed.",
                        (<Link target={"_blank"} href={getBscScanLink(response.hash, 'transaction')}>
                            <Typography variant="subtitle2" sx={{color: "#CC0136", fontSize: "14px", fontWeight: "bold", textAlign: "center"}}>
                                View on Binance
                            </Typography>
                        </Link>));
                })
            )
            .catch((e) => {
                setLiquidityState(prevState => ({...prevState, attemptingTxn: false, txErrorMessage: e?.message, txHash: undefined}));
                showToast("error", "Transaction Failed", e?.message ?? '');

                // we only care if the error is something _other_ than the user rejected the tx
                if (e?.code !== 4001) {
                    console.error(e)
                }
            })
    }

    const poolShare = (noLiquidity && price) ? 100 : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? 0;

    const tokenChangeHandler = useCallback((val) => {
        if (tokenSelect === Field.CURRENCY_A) {
            if (currencyA !== val) {
                const newCurrencyIdA = currencyId(val);
                router.push(`/liquidity/${newCurrencyIdA}/${currencyIdB}`);
            }
        } else {
            if (currencyB !== val) {
                const newCurrencyIdB = currencyId(val);
                router.push(`/liquidity/${currencyIdA}/${newCurrencyIdB}`);
            }
        }
        setTokenSelect(0);
    }, [tokenSelect, currencyIdA, currencyIdB, setTokenSelect]);

    return (
        <Box sx={{width: "100%"}}>
            <LiquidityContainer ref={liquidityContainerRef}>
                <LiquidityTitleBox>
                    <Typography component={"span"} variant={"subtitle1"}>Create Liquidity</Typography>
                    {
                        noLiquidity ?
                            <Box>
                                <Typography component={"span"} variant={"subtitle2"}>You are the first liquidity provider.</Typography><br/>
                                <Typography component={"span"} variant={"subtitle2"}>The ratio of tokens you add will set the price of this pool.</Typography><br/>
                                <Typography component={"span"} variant={"subtitle2"}>Once you are happy with the rate click supply to review.</Typography>
                            </Box>
                            :
                            <Box>
                                <Typography component={"span"} variant={"subtitle2"}>Provide to receive trading fees</Typography>
                            </Box>
                    }
                </LiquidityTitleBox>
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    spacing={1}
                >
                    <ClearFix height={15}/>
                    <FormAdvancedTextField
                        id={"liquidity_pay"}
                        helperText={
                            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                <Typography variant='subtitle2' gutterBottom component='div'>
                                    Balance : {balances[Field.CURRENCY_A]}
                                </Typography>
                                <Typography variant='subtitle2' gutterBottom component='div'>
                                    Value : $127.43
                                </Typography>
                            </Stack>
                        }
                        InputProps={{
                            type: 'number',
                            placeholder: '0',
                            min: '0',
                            onChange: onFieldAInput,
                            disableUnderline: true,
                            value: formattedAmounts[Field.CURRENCY_A],
                            endAdornment: <InputAdornment position="end">
                                <SwapEndAdornment value={currencyA} onClick={() => setTokenSelect(Field.CURRENCY_A)} onMaxClick={() => onFieldAInput({target: {value: balances[Field.CURRENCY_A]}})}/>
                            </InputAdornment>,
                        }}
                    />
                    <ClearFix height={20}/>
                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{height: "100%"}}>
                        <Image src={PlusIcon} alt='Picture of DownArrow'/>
                    </Stack>
                    <ClearFix height={20}/>
                    <FormAdvancedTextField
                        id={"liquidity_receive"}
                        helperText={
                            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                <Typography variant='subtitle2' gutterBottom component='div'>
                                    Balance : {balances[Field.CURRENCY_B]}
                                </Typography>
                                <Typography variant='subtitle2' gutterBottom component='div'>
                                    Value : $54.29
                                </Typography>
                            </Stack>
                        }
                        InputProps={{
                            type: 'number',
                            placeholder: '0',
                            min: '0',
                            onChange: onFieldBInput,
                            disableUnderline: true,
                            value: formattedAmounts[Field.CURRENCY_B],
                            endAdornment: <InputAdornment position="end">
                                <SwapEndAdornment value={currencyB} onClick={() => setTokenSelect(Field.CURRENCY_B)} onMaxClick={() => onFieldBInput({target: {value: balances[Field.CURRENCY_B]}})}/>
                            </InputAdornment>,
                        }}
                    />
                    <ClearFix height={20}/>
                    <TotalValueTypography variant='subtitle2' gutterBottom component='span'>
                        Total Value : $123.45
                    </TotalValueTypography>
                    <ClearFix height={20}/>
                    <LiquidityInfoBox>
                        <Typography variant='subtitle1' gutterBottom component='span'>
                            {
                                noLiquidity ? 'Initial prices and pool share' : 'Prices and pool share'
                            }
                        </Typography>
                        <ClearFix height={15}/>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                                <Typography variant='subtitle2' gutterBottom component='span'>
                                    {price?.toSignificant(6) ?? '-'}
                                </Typography>
                                <Typography variant='subtitle2' gutterBottom component='span'>
                                    {currencyA?.symbol} per {currencyB?.symbol}
                                </Typography>
                            </Stack>
                            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                                <Typography variant='subtitle2' gutterBottom component='div'>
                                    {price?.invert()?.toSignificant(6) ?? '-'}
                                </Typography>
                                <Typography variant='subtitle2' gutterBottom component='div'>
                                    {currencyB?.symbol} per {currencyA?.symbol}
                                </Typography>
                            </Stack>
                            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                                <Typography variant='subtitle2' gutterBottom component='div'>
                                    {poolShare} %
                                </Typography>
                                <Typography variant='subtitle2' gutterBottom component='div'>
                                    Share of Pool
                                </Typography>
                            </Stack>
                        </Stack>
                    </LiquidityInfoBox>
                    <ClearFix height={20}/>
                    {
                        !account ?
                            <ConnectButton/>
                            :
                            // TODO Approve tokens
                            <>
                                {
                                    !error && (approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED) &&
                                    <Box>
                                        {
                                            (approvalA !== ApprovalState.APPROVED) &&
                                            <FormSubmitBtn
                                                label={(approvalA === ApprovalState.PENDING ? 'Enabling' : 'Enable ') + currencies[Field.CURRENCY_A]?.symbol}
                                                disabled={approvalA === ApprovalState.PENDING}
                                                fullWidth={true}
                                                onSubmit={approveACallback}
                                            />
                                        }
                                        {
                                            (approvalB !== ApprovalState.APPROVED) &&
                                            <FormSubmitBtn
                                                label={(approvalB === ApprovalState.PENDING ? 'Enabling' : 'Enable ') + currencies[Field.CURRENCY_B]?.symbol}
                                                disabled={approvalB === ApprovalState.PENDING}
                                                fullWidth={true}
                                                onSubmit={approveBCallback}
                                            />

                                        }
                                    </Box>
                                }
                                <FormSubmitBtn
                                    label={error ?? 'Supply'}
                                    fullWidth={true}
                                    disabled={error || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
                                    onSubmit={() => setShowConfirmModal(true)}
                                />
                            </>
                    }
                </Stack>
                <TokenSelect
                    label={tokenSelect === Field.CURRENCY_A ? 'Token A' : 'Token B'}
                    container={liquidityContainerRef.current}
                    show={tokenSelect !== 0}
                    onClose={() => setTokenSelect(0)}
                    onSelect={tokenChangeHandler}
                    tokenList={SWAP_TOKEN_LIST}
                    disabledTokens={tokenSelect === Field.CURRENCY_A ? [currencyB?.symbol] : [currencyA?.symbol]}
                />
            </LiquidityContainer>
            {pair && !noLiquidity && pairState !== PairState.INVALID ?
                <MinimalPositionCard pair={pair}/> : null
            }
            <ClearFix height={100} />
            <LiquiditySupplyDialog
                show={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onSubmit={onAdd}
                lpToken={'-'}
                currencyA={currencyA}
                currencyB={currencyB}
                currencyAAmount={formattedAmounts[Field.CURRENCY_A]}
                currencyBAmount={formattedAmounts[Field.CURRENCY_B]}
                currencya_rate={price?.toSignificant(6) ?? 0}
                currencyb_rate={price?.invert()?.toSignificant(6) ?? 0}
                pool={poolShare}
            />
            <LiquiditySubmittingTxDialog
                show={attemptingTxn || !!txHash || !!txErrorMessage}
                txHash={txHash}
                swapErrorMessage={txErrorMessage}
                onClose={() => setLiquidityState(prevState => ({
                    ...prevState,
                    txHash: undefined,
                    txErrorMessage: undefined,
                    attemptingTxn: false
                }))}
                onRetry={() => {
                    setLiquidityState(prevState => ({
                        ...prevState,
                        txHash: undefined,
                        txErrorMessage: undefined,
                        attemptingTxn: false
                    }));
                    onAdd();
                }}
            />
        </Box>
    );
}

export default LiquiditySwap;
