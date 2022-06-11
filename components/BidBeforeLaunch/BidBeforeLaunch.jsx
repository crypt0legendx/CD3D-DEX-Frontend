import { Box, Stack, Typography, Divider } from "@mui/material";
import Image from "next/image";
import React from "react";
import TokenSalesStatusLabel from "../TokenSales/TokenSalesStatusLabel";
import {
  TokenSalesTokenInfo,
  TokenSalesTokenMainInfo,
  TokenSalesTokenPerInfo,
  TokenSalesTokenPerInfoItem,
} from "../TokenSales/token_sales_detail_widget";
import ClearFix from "../../components/ClearFix/ClearFix";
import { TokenSalesItemProgressBar } from "../TokenSales/token_sales_widget";
import styles from "../../styles/bidBeforeLaunch.module.css";


const BidBeforeLaunch = () => {
  return (
    <Stack width={"100%"} height={"100%"}>
      <Stack
        width={"100%"}
        height={"100%"}
        minHeight={"534px"}
        overflow={"auto"}
        className={styles.beforeLaunchOuter}
      >
        <Stack>
          <TokenSalesTokenPerInfo>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"start"}
              spacing={1}
            >
              <TokenSalesTokenPerInfoItem direction={"column"}>
                <Typography component={"span"} variant={"subtitle1"}>
                  Status
                </Typography>
                <Typography component={"span"} variant={"subtitle2"}>
                  Upcoming
                </Typography>
              </TokenSalesTokenPerInfoItem>
              <TokenSalesTokenPerInfoItem direction={"column"}>
                <Typography component={"span"} variant={"subtitle1"}>
                  Sale Type
                </Typography>
                <Typography component={"span"} variant={"subtitle2"}>
                  Whitelist
                </Typography>
              </TokenSalesTokenPerInfoItem>

              <TokenSalesTokenPerInfoItem direction={"column"}>
                <Typography component={"span"} variant={"subtitle1"}>
                  Whitelist
                </Typography>
                <Typography component={"span"} variant={"subtitle2"}>
                  Yes
                </Typography>
              </TokenSalesTokenPerInfoItem>


              <TokenSalesTokenPerInfoItem direction={"column"}>
                <Typography component={"span"} variant={"subtitle1"}>
                  Minimum Buy
                </Typography>
                <Typography component={"span"} variant={"subtitle2"}>
                  0.01 BUSD
                </Typography>
              </TokenSalesTokenPerInfoItem>
              <TokenSalesTokenPerInfoItem direction={"column"}>
                <Typography component={"span"} variant={"subtitle1"}>
                  Maximum Buy
                </Typography>
                <Typography component={"span"} variant={"subtitle2"}>
                  3 BUSD
                </Typography>
              </TokenSalesTokenPerInfoItem>
              
              
            </Stack>
          </TokenSalesTokenPerInfo>
        </Stack>

        <Stack height={'514px'} overflow={'auto'} marginBottom={4} className={styles.scrollBar}>
          <Stack>
            <TokenSalesTokenInfo className={styles.beforeLaunchTokenContainer}>
              <Stack direction={"row"} spacing={1} width={'100%'} className={styles.beforeLaunchToken}>
                <Box
                  component={"div"}
                  sx={{ paddingLeft: "20px", paddingRight: "20px" ,width: '55%'}}
                >
                  <Stack direction={"column"} spacing={1}>
                    <Stack
                    width={'100%'}
                      direction={"row"}
                      // justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Image
                        src={"/assets/images/dogegotchi-token.png"}
                        alt={""}
                        height={"40px"}
                        width={"40px"}
                        objectFit={"contain"}
                      />
                      <Typography component={"h2"} variant={"h2"} paddingLeft={2}>
                      DogeGotchi
                    </Typography>
                    </Stack>
                    <ClearFix height={10} />
                    
                    <Stack
                      direction={"row"}
                      justifyContent={"start"}
                      alignItems={"center"}
                      spacing={2}
                    >
                      <Box component={"div"}>
                        <Image
                          src={"/assets/icons/email-icon.png"}
                          alt={""}
                          height={"20px"}
                          width={"20px"}
                          objectFit={"contain"}
                        />
                      </Box>
                      <Box component={"div"}>
                        <Image
                          src={"/assets/icons/twitter-icon.png"}
                          alt={""}
                          height={"20px"}
                          width={"20px"}
                          objectFit={"contain"}
                        />
                      </Box>
                      <Box component={"div"}>
                        <Image
                          src={"/assets/icons/facebook-icon.png"}
                          alt={""}
                          height={"20px"}
                          width={"20px"}
                          objectFit={"contain"}
                        />
                      </Box>
                      <Box component={"div"}>
                        <Image
                          src={"/assets/icons/telegram-icon.png"}
                          alt={""}
                          height={"20px"}
                          width={"20px"}
                          objectFit={"contain"}
                        />
                      </Box>
                      <Box component={"div"}>
                        <Image
                          src={"/assets/icons/discord-icon.png"}
                          alt={""}
                          height={"20px"}
                          width={"20px"}
                          objectFit={"contain"}
                        />
                      </Box>
                    </Stack>
                    {/* <ClearFix height={4} /> */}
                    <Typography component={"span"} variant={"subtitle1"}>
                      GOTCHI is a decentralized experiment, 100% community
                      driven. It allows community members to hold Billions or
                      even Trillions of them.
                      We burnt 50% of the total supply and the remaining 50% was
                      sent to Vitalik Buterin. Lets make him more wealthier…
                      Initial liquidity is 100% locked as well.
                    </Typography>
                  </Stack>
                </Box>
                <ClearFix height={20} />
                <Divider orientation="vertical" flexItem component={'hr'}/>
                <ClearFix height={20} />
                <Box
                  component={"div"}
                  sx={{ paddingLeft: "20px", paddingRight: "20px" ,width: '45%'}}
                >
                  <Stack direction={"column"} spacing={1}>
                    <Stack width={'100%'} direction={'row'} justifyContent={'flex-end'}>
                  <TokenSalesStatusLabel status={"canceled"} style={{width: 'fit-content'}}/>
                  </Stack>
                  <ClearFix height={32} />
                    <Stack
                    width={'100%'}
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography component={"h3"} variant={"h3"}>
                        This is pool is canceled
                      </Typography>
                      <Typography component={"span"} variant={"subtitle2"}>
                        Progress (40.00%)
                      </Typography>
                    </Stack>
                    <ClearFix height={20} />
                    <TokenSalesItemProgressBar
                      variant="determinate"
                      value={40}
                    />
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography component={"span"} variant={"subtitle1"}>
                        0 BUSD
                      </Typography>
                      <Typography component={"span"} variant={"subtitle1"}>
                        100 BUSD
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </TokenSalesTokenInfo>
          </Stack>

          <Stack>
            <TokenSalesTokenMainInfo className={styles.beforeLaunchTokenDetail}>
              <Stack direction={"column"} spacing={3}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Total Token
                  </Typography>
                  <Typography component={"span"} variant={"subtitle2"}>
                    10,000,000
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Presale Tokens
                  </Typography>
                  <Typography component={"span"} variant={"subtitle2"}>
                    1,563,453
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Liquidity Tokens
                  </Typography>
                  <Typography component={"span"} variant={"subtitle2"}>
                    797,361
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Token Name
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    Token Name
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Token Symbol
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    SYM
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Token Decimals
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    9
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Presale Rate
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    9500 CD3D
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Listing Rate
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    6000 CD3D
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Sale Method
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    Whitelist Only
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Soft Cap
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    50 BUSD
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Hard Cap
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    100 BUSD
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Minimum Buy
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    0.01 BUSD
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Maximum Cap
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    3 BUSD
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Liquidity
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    51%
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Start Time
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    10-25-2021 14:22 (UTC)
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    End Time
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    10-25-2021 14:22 (UTC)
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Liquidity Lockup Time
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    30 days
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Website
                  </Typography>
                  <Typography component={"span"} variant={"subtitle2"}>
                    https://cd3d.app
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Using Anti-Rug System (Vesting System)?
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    Yes
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Total Vesting Tokens
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    200000
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    First Token Release after Listing (days)
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    90
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Vesting Period each Cycle (days)
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    90
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    Token Release Each Cycle
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    25%
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography component={"span"} variant={"subtitle1"}>
                    First Batch Token Release Amount
                  </Typography>
                  <Typography component={"span"} variant={"subtitle1"}>
                    25%
                  </Typography>
                </Stack>
              </Stack>
            </TokenSalesTokenMainInfo>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BidBeforeLaunch;
