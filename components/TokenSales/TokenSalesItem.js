import {TokenSalesDetailButton, TokenSalesItemAvatar, TokenSalesItemBody, TokenSalesItemContainer, TokenSalesItemFooter, TokenSalesItemHeader, TokenSalesItemProgressBar} from "./token_sales_widget";
import {Box, Divider, Stack, Typography} from "@mui/material";
import Image from "next/image";
import React from "react";
import TokenSalesStatusLabel from "./TokenSalesStatusLabel";
import PersonIcon from '@mui/icons-material/Person';
import {formatMoneyNumber} from "../../utils/formatBalance";
import ClearFix from "../ClearFix/ClearFix";
import { useRouter } from 'next/router';


export const getCodeName = (code) => {
    switch (code) {
        case "cd3d":
            return "CD3D";
        case "dogegotchi":
            return "DogeGotchi";
        case "cryptodonki":
            return "CryptoDonki";
        case "polygonx":
            return "PloygonX";
    }
    return "";
}

export const getTokenName = (code) => {
    switch (code) {
        case "cd3d":
            return "CD3D";
        case "dogegotchi":
            return "DOGEG";
        case "cryptodonki":
            return "Donki";
        case "polygonx":
            return "MaticX";
    }
    return "";
}

export const getFooterStatus = (status) => {
    switch (status) {
        case "filled":
            return "Filled";
        case "ongoing":
            return "Presale";
        case "upcoming":
            return "Starts in";
        case "canceled":
            return "Ended";
    }
    return "";
}

const TokenSalesItem = ({token, onClick}) => {

    const router = useRouter();

    return (
        <TokenSalesItemContainer paddingBottom={'100px'}>
            <div class={"token-image"} onClick={()=> router.push('/token_sales/bidpage')}>
                <Image src={token.token} alt={''} height={'50px'} width={'50px'} objectFit={"contain"}/>
            </div>
            <TokenSalesItemHeader direction={"row"} justifyContent={"space-between"} alignItems={"start"} spacing={1}>
                <Box sx={{flexGrow: 1}}>
                    <Stack direction={"column"} justifyContent={"start"} spacing={1}>
                        <Typography component={"h2"} variant={"h2"}>{getCodeName(token.code)}</Typography>
                        <Typography component={"span"} variant={"subtitle1"}>1BUSD = {formatMoneyNumber(token.per_coin).toString()} {getTokenName(token.code)} </Typography>
                    </Stack>
                </Box>
                <Stack direction={"row"} justifyContent={"end"} alignItems={"center"} spacing={2}>
                    {
                        token.avatar ? <TokenSalesItemAvatar component={"div"}>
                            <PersonIcon/>
                        </TokenSalesItemAvatar> : null
                    }
                    <TokenSalesStatusLabel status={token.status}/>
                </Stack>
            </TokenSalesItemHeader>
            <ClearFix height={20}/>
            <TokenSalesItemBody direction={"column"} justifyContent={"start"} spacing={1}>
                <Typography component={"span"} variant={"subtitle1"}>Soft/Hard Cap:</Typography>
                <Typography component={"h2"} variant={"h2"}>{token.min_busd.toString()} BUSD - {token.max_busd.toString()} BUSD</Typography>
                <Typography component={"span"} variant={"subtitle1"}>Progress ({token.progress.toFixed(2)}%)</Typography>
                <ClearFix height={10}/>
                <TokenSalesItemProgressBar variant="determinate" value={token.progress} />
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography component={"span"} variant={"subtitle2"}>{token.min_busd.toString()} BUSD</Typography>
                    <Typography component={"span"} variant={"subtitle2"}>{token.max_busd.toString()} BUSD</Typography>
                </Stack>
                <ClearFix height={10}/>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography component={"span"} variant={"subtitle1"}>Liquidity % :</Typography>
                    <Typography component={"span"} variant={"subtitle1"}>{token.liquidity.toString()}%</Typography>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography component={"span"} variant={"subtitle1"}>Lockup Time :</Typography>
                    <Typography component={"span"} variant={"subtitle1"}>{token.lockup_time}</Typography>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography component={"span"} variant={"subtitle1"}>Vesting :</Typography>
                    <Typography component={"span"} variant={"subtitle1"}>{token.vesting}</Typography>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography component={"span"} variant={"subtitle1"}>Listing :</Typography>
                    <Typography component={"h5"} variant={"h5"}>ApeSwap</Typography>
                </Stack>
                <ClearFix height={20}/>
            </TokenSalesItemBody>
            <Divider />
            <TokenSalesItemFooter direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1}>
                <Stack direction={"column"} spacing={1}>
                    <Typography component={"span"} variant={"subtitle1"}>{getFooterStatus(token.status)} :</Typography>
                    <Typography component={"span"} variant={"subtitle2"}>{token.info}&nbsp;</Typography>
                </Stack>
                <TokenSalesDetailButton variant={"outlined"} size={"large"} onClick={onClick}>
                    Details
                </TokenSalesDetailButton>
            </TokenSalesItemFooter>
        </TokenSalesItemContainer>
    );
}
export default TokenSalesItem;