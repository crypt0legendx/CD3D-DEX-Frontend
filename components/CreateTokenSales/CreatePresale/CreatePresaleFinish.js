import {InputAdornment, MenuItem, Select, Stack, Typography} from "@mui/material";
import {CreateTokenBackButton, CreateTokenFormControl, CreateTokenNextButton, CreateTokensContentContainer, CreateTokenSecondLabel, CreateTokenSpan} from "../create_token_sales_widget";
import React from "react";
import ClearFix from "../../ClearFix/ClearFix";
import ErrorIcon from '@mui/icons-material/Error';
import CreateTokenTextForm from "../CreateTokenTextForm";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CreatePresaleFinish = ({onBack, onSubmit}) => {
    return (
        <CreateTokensContentContainer>
            <ClearFix height={50}/>
            <Stack direction={"column"} spacing={3}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Total Token</CreateTokenSpan>
                    <CreateTokenSecondLabel component={"span"} variant={"subtitle2"}>1,563,453</CreateTokenSecondLabel>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Token Name</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>Token Name</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Token Symbol</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>SYM</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Token Decimals</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>9</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Presale Rate</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>9500 CD3D</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Listing Rate</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>6000 CD3D</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Sale Method</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>Whitelist Only</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Soft Cap</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>50 BUSD</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Hard Cap</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>100 BUSD</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Minimum Buy</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>0.01 BUSD</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Maximum Buy</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>3 BUSD</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Liquidity</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>51%</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Start Time</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>10-25-2021 14:22 (UTC)</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>End Time</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>10-25-2021 14:22 (UTC)</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Liquidity Lockup Time</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>30 days</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Website</CreateTokenSpan>
                    <CreateTokenSecondLabel component={"span"} variant={"subtitle2"}>http://cd3d.app</CreateTokenSecondLabel>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Using Anti-Rug System (Vesting System)?</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>Yes</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Total Vesting Tokens</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>200000</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>First Token Release after Listing (days)</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>90</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Vesting Period each Cycle (days)</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>90</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Token Release Each Cycle</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>25%</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>First Batch Token Release Amount</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>25%</CreateTokenSpan>
                </Stack>
            </Stack>
            <ClearFix height={30}/>
            <CreateTokenFormControl>
                <CreateTokenTextForm
                    InputProps={{
                        placeholder: "Anti-Rug Info (Estimate from End Time)",
                        disableUnderline: true,
                        endAdornment: <InputAdornment position={"end"}>
                            <ChevronRightIcon sx={{color: "#4CDC8F !important"}}/>
                        </InputAdornment>
                    }}
                />
            </CreateTokenFormControl>
            <ClearFix height={30}/>
            <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
                <ErrorIcon sx={{color: "#4CDC8F"}}/>
                <Typography component={"span"} sx={{color: "#7689B0", fontSize: "12px !important", fontStyle: "italic", lineHeight: "25px !important"}}>
                    For tokens with burns, rebase or other special transfers please ensure that you have a way to whitelist multiple addresses or turn off the special Transfer events (By setting fees to 0 for example for the duration of the presale)
                </Typography>
            </Stack>
            <ClearFix height={70}/>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <CreateTokenBackButton variant={"outlined"} size={"large"} onClick={() => onBack()}>Back</CreateTokenBackButton>
                <CreateTokenNextButton size={"large"} onClick={() => onSubmit()}>Submit</CreateTokenNextButton>
            </Stack>
        </CreateTokensContentContainer>
    );
}
export default CreatePresaleFinish;