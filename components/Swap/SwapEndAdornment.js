import React from "react";
import {Typography} from "@material-ui/core";
import {Box, Chip, Stack} from "@mui/material";
import Image from "next/image";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {styled} from "@mui/material/styles";

const SwapMaxChip = styled(Chip)({
    backgroundColor: "#800022",
    color: "#FFF1F5",
    borderRadius: "6px",
    marginRight: "7px",
    '&:hover': {
        backgroundColor: "#E5234A",
    }
});

const SwapEndAdornment = (props) => {
    const {value, onClick, onMaxClick} = props;

    const getImage = (val) => {
        let result = "/assets/images/cd3d.png";
        switch (val?.symbol?.toLowerCase()) {
            case "bnb":
                result = "/assets/images/bnb.png";
                break;
            case "busd":
                result = "/assets/images/busd.png";
                break;
            case "cd3d":
                result = "/assets/images/cd3d.png";
                break;
        }
        return result;
    }

    return (
        <Stack direction={"row"} alignItems={"center"} style={{cursor: "pointer"}}>
            <SwapMaxChip size="small" label={"Max"} onClick={() => onMaxClick()}/>
            <Box sx={{minWidth: "42px"}} onClick={() => onClick()}>
                <Typography component={'span'} variant="subtitle1">{value?.symbol}</Typography>
            </Box>
            <Box sx={{width: "22px", height: "22px", marginLeft: "7px"}} onClick={() => onClick()}>
                <Image src={getImage(value)} width={22} height={22} objectFit={"contain"}/>
            </Box>
            <ArrowDropDownIcon fontSize={"small"} sx={{color: "white"}} onClick={() => onClick()}/>
        </Stack>
    );

}
export default SwapEndAdornment;
