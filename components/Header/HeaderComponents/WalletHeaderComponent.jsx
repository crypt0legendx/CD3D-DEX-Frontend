import React from "react";
import Image from "next/image";
import {Box, Stack, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const WalletHeaderItem = styled(Box)({
    height: "35px",
    backgroundColor: "#110c1c",
    borderRadius: "35px",
    cursor: "pointer",
    minWidth: "105px",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    '&:hover': {
        backgroundColor: '#110c1c80',
    },

    '& .MuiTypography-root': {
        color: "#FFF1F5",
        fontSize: "12px",
        marginLeft: "10px",
    }
})

const WalletHeaderComponent = (props) => {
    const {wallet, busd, cd3d} = props
    return (
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1} sx={{display: {xs: 'none', md: 'flex'}}}>
            <WalletHeaderItem>
                <Image src={"/assets/images/cd3d.png"} height={19} width={19} objectFit={"contain"}/>
                <Typography component={"span"}>{cd3d}</Typography>
            </WalletHeaderItem>
            <WalletHeaderItem>
                <Image src={"/assets/images/busd.png"} height={19} width={19} objectFit={"contain"}/>
                <Typography component={"span"}>{busd}</Typography>
            </WalletHeaderItem>
            <WalletHeaderItem>
                <Image src={"/assets/images/wallet.png"} height={19} width={19} objectFit={"contain"}/>
                <Typography component={"span"}>{wallet ? wallet.substr(0, 2) + "..." + wallet.substr(wallet.length - 4) : ""}</Typography>
            </WalletHeaderItem>
        </Stack>
    );
}

export default WalletHeaderComponent;