import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Button, Container, InputLabel} from "@mui/material";

export const LiquidityContainer = styled(Container)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    width: "100%",
    borderRadius: '15px',
    paddingTop: "20px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "30px",
    backdropFilter: "blur(30px)",
    position: "relative",
    overflow: "hidden",
});

export const LiquidityTitleBox = styled(Box)({
    '& .MuiTypography-subtitle1': {
        color: "#75E4AA",
        textAlign: "left",
        fontSize: "24px",
    },

    '& .MuiTypography-subtitle2': {
        textAlign: "left",
        fontSize: "14px",
        color: "#BAC4D7",
    }
});

export const LiquidityLabel = styled(InputLabel)({
    transform: "translate(0, -3px) scale(1)",
    width: "100%",
    '& .MuiTypography-subtitle1': {
        color: "#75E4AA",
        fontSize: "12px",
    },
    '& .MuiTypography-subtitle2': {
        color: "#BAC4D7",
        fontSize: "12px",
    },
});

export const PercentButton = styled(Button)({
    backgroundColor: "#FF014414",
    color: "#FF0144",
    borderColor: "#CC0136",
    borderRadius: "12px",
    fontSize: "12px",
    '&:hover': {
        backgroundColor: "#E5234A",
        borderColor: "#CC0136",
        color: "#FFF1F5",
    }
});

export const MaxButton = styled(Button)({
    color: "#FFF1F5",
    backgroundColor: "#800022",
    borderColor: "#CC0136",
    borderRadius: "12px",
    fontSize: "12px",
    '&:hover': {
        backgroundColor: "#E5234A",
        borderColor: "#CC0136",
    }
});

export const ReceiveContainer = styled(Box)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    backdropFilter: "blur(30px)",
    width: "100%",
    border: "1px solid #26164A",
    borderRadius: "15px",
    padding: "15px 15px",
    '& .MuiTypography-subtitle1': {
        color: '#7689B0',
        fontSize: "16px",
    },
    '& .MuiTypography-subtitle2': {
        color: '#FFF1F5',
        fontSize: "16px",
        marginRight: "5px",
    }
});
