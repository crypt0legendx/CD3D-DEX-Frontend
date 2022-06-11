import React from "react";
import ClearFix from "../../components/ClearFix/ClearFix";
import {Box, Container, Divider, Grid, Stack, Typography} from "@mui/material";
import {
    TokenSalesBackButton,
    TokenSalesDescription,
    TokenSalesDetailFilledButton,
    TokenSalesDetailOutlineButton,
    TokenSalesTokenInfo,
    TokenSalesTokenMainInfo,
    TokenSalesTokenOwnerZone,
    TokenSalesTokenPerInfo,
    TokenSalesTokenPerInfoItem,
    TokenSalesTokenPoolAction
} from "../../components/TokenSales/token_sales_detail_widget";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Image from "next/image";
import TokenSalesStatusLabel from "../../components/TokenSales/TokenSalesStatusLabel";
import {TokenSalesDetailButton, TokenSalesItemProgressBar} from "../../components/TokenSales/token_sales_widget";
import {useRouter} from "next/router";

const TokenSaleDetail = () => {
    const router = useRouter();
    return (
        <Container maxWidth={'xl'}>
            <ClearFix height={20}/>
            <Stack direction={"row"} justifyContent={"start"} alignItems={"center"} sx={{paddingLeft: "8px", paddingRight: "8px"}}>
                <TokenSalesBackButton variant={'outlined'} startIcon={<ChevronLeftIcon/>} onClick={() => router.back()}>
                    Back to Presale
                </TokenSalesBackButton>
            </Stack>
            <ClearFix height={20}/>
            <Box component={"div"}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={3}>
                        <TokenSalesTokenInfo>
                            <Stack direction={"column"} spacing={1}>
                                <Box component={"div"} sx={{paddingLeft: "20px", paddingRight: "20px"}}>
                                    <Stack direction={"column"} spacing={1}>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                            <Image src={'/assets/images/dogegotchi-token.png'} alt={''} height={'40px'} width={'40px'} objectFit={"contain"}/>
                                            <TokenSalesStatusLabel status={"canceled"}/>
                                        </Stack>
                                        <ClearFix height={10}/>
                                        <Typography component={"h2"} variant={"h2"}>DogeGotchi</Typography>
                                        <ClearFix height={5}/>
                                        <Stack direction={"row"} justifyContent={"start"} alignItems={"center"} spacing={2}>
                                            <Box component={"div"}>
                                                <Image src={'/assets/icons/email-icon.png'} alt={''} height={'20px'} width={'20px'} objectFit={"contain"}/>
                                            </Box>
                                            <Box component={"div"}>
                                                <Image src={'/assets/icons/twitter-icon.png'} alt={''} height={'20px'} width={'20px'} objectFit={"contain"}/>
                                            </Box>
                                            <Box component={"div"}>
                                                <Image src={'/assets/icons/facebook-icon.png'} alt={''} height={'20px'} width={'20px'} objectFit={"contain"}/>
                                            </Box>
                                            <Box component={"div"}>
                                                <Image src={'/assets/icons/telegram-icon.png'} alt={''} height={'20px'} width={'20px'} objectFit={"contain"}/>
                                            </Box>
                                            <Box component={"div"}>
                                                <Image src={'/assets/icons/discord-icon.png'} alt={''} height={'20px'} width={'20px'} objectFit={"contain"}/>
                                            </Box>
                                        </Stack>
                                        <ClearFix height={20}/>
                                        <Typography component={"span"} variant={"subtitle1"}>
                                            GOTCHI is a decentralized experiment, 100% community driven. It allows community members to hold Billions or even Trillions of them.
                                        </Typography>
                                        <ClearFix height={20}/>
                                        <Typography component={"span"} variant={"subtitle1"}>
                                            We burnt 50% of the total supply and the remaining 50% was sent to Vitalik Buterin. Lets make him more wealthier…
                                        </Typography>
                                        <ClearFix height={20}/>
                                        <Typography component={"span"} variant={"subtitle1"}>
                                            Initial liquidity is 100% locked as well.
                                        </Typography>
                                    </Stack>
                                </Box>
                                <ClearFix height={20}/>
                                <Divider/>
                                <ClearFix height={20}/>
                                <Box component={"div"} sx={{paddingLeft: "20px", paddingRight: "20px"}}>
                                    <Stack direction={"column"} spacing={1}>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                            <Typography component={"h3"} variant={"h3"}>
                                                This is pool is canceled
                                            </Typography>
                                            <Typography component={"span"} variant={"subtitle2"}>
                                                Progress (40.00%)
                                            </Typography>
                                        </Stack>
                                        <ClearFix height={20}/>
                                        <TokenSalesItemProgressBar variant="determinate" value={40}/>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                            <Typography component={"span"} variant={"subtitle1"}>0 BUSD</Typography>
                                            <Typography component={"span"} variant={"subtitle1"}>100 BUSD</Typography>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </TokenSalesTokenInfo>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <Stack direction={"column"} spacing={1}>
                            <TokenSalesTokenPerInfo>
                                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"start"} spacing={1}>
                                    <TokenSalesTokenPerInfoItem direction={"column"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Status</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>Upcoming</Typography>
                                    </TokenSalesTokenPerInfoItem>
                                    <TokenSalesTokenPerInfoItem direction={"column"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Sale Type</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>Whitelist</Typography>
                                    </TokenSalesTokenPerInfoItem>
                                    <TokenSalesTokenPerInfoItem direction={"column"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Minimum Buy</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>0.01 BUSD</Typography>
                                    </TokenSalesTokenPerInfoItem>
                                    <TokenSalesTokenPerInfoItem direction={"column"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Maximum Buy</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>3 BUSD</Typography>
                                    </TokenSalesTokenPerInfoItem>
                                    <TokenSalesTokenPerInfoItem direction={"column"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Total Contributors</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>0</Typography>
                                    </TokenSalesTokenPerInfoItem>
                                    <TokenSalesTokenPerInfoItem direction={"column"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Current Vesting Cycle</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>0/3</Typography>
                                    </TokenSalesTokenPerInfoItem>
                                    <TokenSalesTokenPerInfoItem direction={"column"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Remaining Vesting Cycle</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>90 Days</Typography>
                                    </TokenSalesTokenPerInfoItem>
                                </Stack>
                            </TokenSalesTokenPerInfo>
                            <TokenSalesTokenOwnerZone>
                                <Stack direction={"column"} spacing={2}>
                                    <Typography component={"span"} variant={"subtitle1"}>Owner's Zone</Typography>
                                    <Box component={"div"}>
                                        <Typography component={"span"} variant={"subtitle1"}>
                                            To make sure there will be no issues during the presale time, please don’t send tokens to wallets before you finalize the presale pool.
                                        </Typography>
                                    </Box>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Stack direction={"row"} justifyContent={"start"} alignItems={"center"} spacing={1}>
                                            <Typography component={"span"} variant={"subtitle2"}>Sale Type</Typography>
                                        </Stack>
                                        <TokenSalesDetailOutlineButton variant={"outlined"} size={"large"} onClick={() => {
                                        }}>
                                            Go Public
                                        </TokenSalesDetailOutlineButton>
                                    </Stack>
                                </Stack>
                            </TokenSalesTokenOwnerZone>
                            <TokenSalesTokenPoolAction>
                                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1}>
                                    <Typography component={"span"} variant={"subtitle1"}>
                                        Pool Actions
                                    </Typography>
                                    <Stack direction={"row"} justifyContent={"end"} alignItems={"center"} spacing={1}>
                                        <TokenSalesDetailOutlineButton variant={"outlined"} size={"large"} onClick={() => {
                                        }}>
                                            List of Contributors
                                        </TokenSalesDetailOutlineButton>
                                        <TokenSalesDetailFilledButton variant={"filled"} size={"large"} onClick={() => {
                                        }}>
                                            Add to Whitelist
                                        </TokenSalesDetailFilledButton>
                                    </Stack>
                                </Stack>
                            </TokenSalesTokenPoolAction>
                            <TokenSalesTokenMainInfo>
                                <Stack direction={"column"} spacing={3}>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Total Token</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>10,000,000</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Presale Tokens</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>1,563,453</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Liquidity Tokens</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>797,361</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Token Name</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>Token Name</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Token Symbol</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>SYM</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Token Decimals</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>9</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Presale Rate</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>9500 CD3D</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Listing Rate</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>6000 CD3D</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Sale Method</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>Whitelist Only</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Soft Cap</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>50 BUSD</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Hard Cap</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>100 BUSD</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Minimum Buy</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>0.01 BUSD</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Maximum Cap</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>3 BUSD</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Liquidity</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>51%</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Start Time</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>10-25-2021 14:22 (UTC)</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>End Time</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>10-25-2021 14:22 (UTC)</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Liquidity Lockup Time</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>30 days</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Website</Typography>
                                        <Typography component={"span"} variant={"subtitle2"}>https://cd3d.app</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Using Anti-Rug System (Vesting System)?</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>Yes</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Total Vesting Tokens</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>200000</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>First Token Release after Listing (days)</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>90</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Vesting Period each Cycle (days)</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>90</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>Token Release Each Cycle</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>25%</Typography>
                                    </Stack>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography component={"span"} variant={"subtitle1"}>First Batch Token Release Amount</Typography>
                                        <Typography component={"span"} variant={"subtitle1"}>25%</Typography>
                                    </Stack>
                                </Stack>
                            </TokenSalesTokenMainInfo>
                            <ClearFix height={20}/>
                            <TokenSalesDescription component={"span"} variant={"subtitle1"}>
                                Disclaimer : The information provided shall not in any way constitute a recommendation as to whether you should invest in any product discussed. We accept no liability for any loss occasioned to any person acting or refraining from action as a result of any material
                                provided or published. © 2021 by CD3D Team!
                            </TokenSalesDescription>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <ClearFix height={150}/>
        </Container>
    );
}

export default TokenSaleDetail;