import React from "react";
import { useRouter } from 'next/router';
import ClearFix from "../../components/ClearFix/ClearFix";
import {Box, Container, FormControl, Grid, InputAdornment, Button, Stack} from "@mui/material";
import TokenSalesSearchField from "../../components/TokenSales/TokenSalesSearchField";
import SearchIcon from '@mui/icons-material/Search';
import {TokenSalesButton, TokenSalesButtonGroup, TokenSalesSearchButton} from "../../components/TokenSales/token_sales_widget";
import TokenSalesItem from "../../components/TokenSales/TokenSalesItem";
import SplitButton from "../../components/TokenSales/SplitButton";

const TokenSales = () => {
    const router = useRouter();
    const [filter, setFilter] = React.useState("presale"); //presale, sale, mine
    const handleFilterChange = (event, value) => {
        setFilter(value);
    }
    const tokens = [
        {
            id: 0,
            code: "cd3d",
            token: '/assets/images/cd3d-token.png',
            status: 'ongoing',
            avatar: true,
            progress: 25.48,
            per_coin: 43633,
            min_busd: 100,
            max_busd: 150,
            liquidity: 51,
            lockup_time: "213 days",
            vesting: "No",
            info: "Ongoing",
        },
        {
            id: 1,
            code: "dogegotchi",
            token: '/assets/images/dogegotchi-token.png',
            status: 'upcoming',
            avatar: false,
            progress: 0.0,
            per_coin: 38729,
            min_busd: 20,
            max_busd: 100,
            liquidity: 51,
            lockup_time: "213 days",
            vesting: "20%/30 days",
            info: "02:16:32",
        },
        {
            id: 2,
            code: "cryptodonki",
            token: '/assets/images/cryptodonki-token.png',
            status: 'canceled',
            avatar: false,
            progress: 39.72,
            per_coin: 552000,
            min_busd: 10,
            max_busd: 30,
            liquidity: 51,
            lockup_time: "213 days",
            vesting: "30%/15 days",
            info: "12/28/2021"
        },
        {
            id: 3,
            code: "polygonx",
            token: '/assets/images/polygon-token.png',
            status: 'filled',
            avatar: false,
            progress: 100,
            per_coin: 10000000,
            min_busd: 400,
            max_busd: 800,
            liquidity: 51,
            lockup_time: "213 days",
            vesting: "No",
            info: "12/28/2021",
        }
    ];
    return (
        <Container maxWidth={'xl'}>
            <ClearFix height={20}/>
            <Box component={"div"} textAlign={"center"}>
                <TokenSalesButtonGroup
                    value={filter}
                    exclusive
                    onChange={handleFilterChange}
                >
                    <TokenSalesButton sx={{borderRadius: "12px 0 0 12px"}} value="presale">Presale</TokenSalesButton>
                    <TokenSalesButton value="sale">Sale</TokenSalesButton>
                    <TokenSalesButton sx={{borderRadius: "0 12px 12px 0"}} value="mine">Mine</TokenSalesButton>
                </TokenSalesButtonGroup>
            </Box>
            <ClearFix height={50}/>
            <Box component={"div"} sx={{display: 'flex', direction: 'row', padding: '6px'}}>
                <Grid xs={12} sm={6} md={8} lg={9} xl={9}>
                <FormControl variant={"standard"} sx={{ width: '100%', paddingRight: '10px'}}>
                    <TokenSalesSearchField
                        id={"token_sales_search"}
                        InputProps={{
                            placeholder: "Search token name or token symbol",
                            disableUnderline: true,
                            endAdornment: <InputAdornment position={"end"}>
                                <TokenSalesSearchButton aria-label="search">
                                    <SearchIcon/>
                                </TokenSalesSearchButton>
                            </InputAdornment>
                        }}
                    />
                </FormControl>
                </Grid>
                <Grid display={'flex'} direction={'row'} justifyContent={'flex-end'} padding={'3px'} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <SplitButton btnName={'Sort By'}/>
                    <SplitButton btnName={'Filter By'}/>
                </Grid>
            </Box>
            <ClearFix height={50}/>
            <Box component={"div"}>
                <Grid container>
                    {
                        tokens.map(token => <Grid key={token.id} item xs={12} sm={6} md={4} xl={4}>
                            <TokenSalesItem token={token} onClick={() => router.push('/token_sales/detail')}/>
                        </Grid>)
                    }
                </Grid>
            </Box>
            <ClearFix height={100}/>
        </Container>
    );
}
export default TokenSales;
