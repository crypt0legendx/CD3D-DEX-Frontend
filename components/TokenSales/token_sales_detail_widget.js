import {styled} from "@mui/material/styles";
import {Box, Button, Stack, Typography} from "@mui/material";

export const TokenSalesBackButton = styled(Button)({
    backgroundColor: "#FF014414",
    color: "#CC0136",
    borderColor: "#CC0136",
    height: "37px",
    padding: "0 20px",
    textTransform: "capitalize",
    borderRadius: "8px",
    fontSize: "12px",
    '&:hover': {
        backgroundColor: "#E5234A",
        borderColor: "#CC0136",
        color: "#FFF1F5",
    }
});

export const TokenSalesDetailOutlineButton = styled(Button)({
    backgroundColor: "#FF014414",
    color: "#CC0136",
    borderColor: "#CC0136",
    height: "44px",
    padding: "0 30px",
    textTransform: "capitalize",
    borderRadius: "8px",
    fontSize: "14px",
    '&:hover': {
        backgroundColor: "#E5234A",
        borderColor: "#CC0136",
        color: "#FFF1F5",
    }
});
export const TokenSalesDetailFilledButton = styled(Button)({
    backgroundColor: "#CC0136",
    color: "#FFF1F5",
    borderColor: "#CC0136",
    height: "44px",
    padding: "0 30px",
    textTransform: "capitalize",
    borderRadius: "8px",
    fontSize: "14px",
    '&:hover': {
        backgroundColor: "#E5234A",
        borderColor: "#CC0136",
        color: "#FFF1F5",
    }
});


export const TokenSalesTokenInfo = styled(Box)(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: "15px",
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "5px",
    marginRight: "5px",
    padding: "25px 0",
    position: "relative",
    '& .MuiTypography-h2': {
        color: "#75E4AA",
        fontSize: "24px",
        letterSpacing: "1px"
    },
    '& .MuiTypography-h3': {
        color: "#4CDC8F",
        fontSize: "14px",
    },
    '& .MuiTypography-subtitle1': {
        color: "#7689B0",
        fontSize: "14px",
    },
    '& .MuiTypography-subtitle2': {
        color: "#BAC4D7",
        fontSize: "12px",
    },
    '.MuiDivider-root': {
        backgroundColor: '#242044',
        height: "2px",
    }
}));

export const TokenSalesTokenPerInfo = styled(Box)(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: "15px",
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "5px",
    marginRight: "5px",
    padding: "20px 30px",
    position: "relative",
}));

export const TokenSalesTokenPerInfoItem = styled(Stack)(({theme}) => ({
    maxWidth: "126px",
    '& .MuiTypography-subtitle1': {
        color: "#75E4AA",
        fontSize: "14px",
        lineHeight: "22px !important",
        minHeight: "45px",
    },
    '& .MuiTypography-subtitle2': {
        color: "#FFFFFF",
        fontSize: "14px",
        fontWeight: 600
    },
}));

export const TokenSalesTokenOwnerZone = styled(Box)(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: "15px",
    margin: "5px 5px !important",
    padding: "25px 30px",
    position: "relative",
    '& .MuiBox-root': {
        backgroundColor: "#7689B023",
        padding: "10px 20px",
        borderRadius: "8px",

        '.MuiTypography-subtitle1': {
            color: "#7689B0",
            fontSize: "12px",
        }
    },
    '& .MuiTypography-subtitle1': {
        color: "#75E4AA",
        fontSize: "16px",
    },
    '& .MuiTypography-subtitle2': {
        color: "#EAFBF3",
        fontSize: "16px",
    },
}));

export const TokenSalesTokenPoolAction = styled(Box)(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: "15px",
    margin: "5px 5px !important",
    padding: "25px 30px",
    position: "relative",
    '& .MuiTypography-subtitle1': {
        color: "#75E4AA",
        fontSize: "16px",
    },
}));

export const TokenSalesTokenMainInfo = styled(Box)(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: "15px",
    margin: "5px 5px !important",
    padding: "25px 30px",
    position: "relative",
    '& .MuiTypography-subtitle1': {
        color: "#BAC4D7",
        fontSize: "14px",
    },
    '& .MuiTypography-subtitle2': {
        color: "#FF0144",
        fontSize: "14px",
        letterSpacing: "1px",
    }
}));

export const TokenSalesDescription = styled(Typography)(({theme}) => ({
    color: "#BAC4D7",
    fontSize: "12px !important",
    lineHeight: "28px !important",
    textAlign: "center",
    padding: "0 40px"
}))