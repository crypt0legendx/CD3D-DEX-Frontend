import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import Image from "next/image";
import useTotalSupply from "../../data/TotalSupply";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {JSBI, Percent} from "cd3d-dex-libs-sdk";
import {useTokenBalance} from "../../state/wallet/hooks";
import {styled} from "@mui/material/styles";
import {Stack} from "@mui/material";
import ClearFix from "../ClearFix/ClearFix";

const LiquidityPositionContainer = styled(Stack)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    width: "100%",
    borderRadius: '15px',
    padding: '20px',
    marginTop: "20px",
    backdropFilter: "blur(30px)",
    position: "relative",
    overflow: "hidden",

    '& .MuiTypography-subtitle1': {
        color: "#2BD67B",
        textAlign: "left",
        fontSize: "14px",
    },

    '& .MuiTypography-subtitle2': {
        color: "#EAFBF3",
        textAlign: "left",
        fontSize: "14px",
    },
});

export function MinimalPositionCard ({pair}) {
    const { account } = useActiveWeb3React()

    const currency0 = pair.token0
    const currency1 = pair.token1

    const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
    const totalPoolTokens = useTotalSupply(pair.liquidityToken)

    const poolTokenPercentage =
        !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
            ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
            : undefined

    const [token0Deposited, token1Deposited] =
        !!pair &&
        !!totalPoolTokens &&
        !!userPoolBalance &&
        // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
        JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
            ? [
                pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
                pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
            ]
            : [undefined, undefined]

    return (
        <LiquidityPositionContainer direction={"column"} spacing={2}>
            <Typography variant='subtitle1' component={'span'}>
                LP tokens in your wallet
            </Typography>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Stack direction={"row"} justifyContent={"start"} alignItems={"center"} spacing={1}>
                    <Image src={'/assets/busd-cd3d.png'} alt={''} height={40} width={40} objectFit={"contain"}/>
                    <Typography variant='subtitle2' component={'span'}>
                        {currency0.symbol} - {currency1.symbol} LP
                    </Typography>
                </Stack>
                <Typography variant='subtitle2' component={'span'}>
                    {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}
                </Typography>
            </Stack>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant='subtitle2' component={'span'}>
                    Share of Pool
                </Typography>
                <Typography variant='subtitle2' component={'span'}>
                    {poolTokenPercentage ? `${poolTokenPercentage.toFixed(2)}%` : '-'}
                </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant='subtitle2' component={'span'}>
                    Pooled {currency1.symbol}
                </Typography>
                <Typography variant='subtitle2' component={'span'}>
                    { token1Deposited ? token1Deposited?.toSignificant(6) : '-' }
                </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant='subtitle2' component={'span'}>
                    Pooled {currency0.symbol}
                </Typography>
                <Typography variant='subtitle2' component={'span'}>
                    { token0Deposited ? token0Deposited?.toSignificant(6) : '-' }
                </Typography>
            </Stack>
        </LiquidityPositionContainer>
    )
}
