import {styled} from "@mui/material/styles";
import {Box, Button, Chip, IconButton, LinearProgress, linearProgressClasses, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";

export const TokenSalesButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({}));

export const TokenSalesButton = styled(ToggleButton)(({theme}) => ({
    width: "140px",
    maxWidth: "140px",
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    color: "#7689B0",
    fontSize: "16px",
    textTransform: "capitalize",
    border: "none",
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    '&.Mui-selected': {
        backgroundColor: "#2BD67B",
        color: "#FFFFFF",
        '&:hover': {
            backgroundColor: "#2BD67B",
        }
    }
}));

export const TokenSalesSearchButton = styled(IconButton)(({theme}) => ({
    backgroundColor: "#800022",
    color: "#FFFFFF",
    borderRadius: "12px",
    '&:hover': {
        backgroundColor: "#900022",
    }
}));

export const TokenSalesItemContainer = styled(Box)(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: "15px",
    margin: "30px 5px !important",
    paddingTop: "60px",
    position: "relative",
    cursor: "pointer",
    '&:hover' : {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    '.token-image': {
        position: "absolute",
        left: "30px",
        top: "-30px",
    },
    '.MuiDivider-root': {
        backgroundColor: '#242044',
        height: "1px",
    }
}));

// Token Sales Item Header
export const TokenSalesItemHeader = styled(Stack)(({theme}) => ({
    paddingLeft: "30px",
    paddingRight: "30px",
    '& .MuiTypography-h2': {
        color: "#75E4AA",
        fontSize: "24px",
        letterSpacing: "1px"
    },
    '& .MuiTypography-subtitle1': {
        color: "#7689B0",
        fontSize: "14px",
    }
}));

export const TokenSalesItemAvatar = styled(Box)({
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#a0edc4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '& .MuiSvgIcon-root': {
        fontSize: "18px",
        color: "#166c3d"
    }
});

export const TokenSalesStatusLabelChip = styled(Chip)({
    textTransform: "capitalize",
    height: "22px",
    padding: "12px 10px",
    fontSize: "11px",
    opacity: 1,
    '&.filled': {
        borderColor: "#2BD67B",
        backgroundColor: "#4CDC8F2E",
        color: "#2BD67B",
        boxShadow: "0 0 40px #4CDC8F2E",
        '.MuiSvgIcon-root': {
            color: "#2BD67B",
        }
    },
    '&.ongoing': {
        borderColor: "#FFE300",
        backgroundColor: "#FFE3002C",
        color: "#FFE300",
        boxShadow: "0 0 40px #FFE3002C",
        '.MuiSvgIcon-root': {
            color: "#FFE300",
        }
    },
    '&.upcoming': {
        borderColor: "#00C4FF",
        backgroundColor: "#009AFF33",
        color: "#00C4FF",
        boxShadow: "0 0 40px #009AFF33",
        '.MuiSvgIcon-root': {
            color: "#00C4FF",
        }
    },
    '&.canceled': {
        borderColor: "#7689B0",
        backgroundColor: "#4354752E",
        color: "#7689B0",
        boxShadow: "0 0 40px #4354752E",
        '.MuiSvgIcon-root': {
            color: "#7689B0",
        }
    },
    '& .MuiSvgIcon-root': {
        fontSize: "11px",
    },
});

// Token Sales Item Body
export const TokenSalesItemBody = styled(Stack)(({theme}) => ({
    paddingLeft: "30px",
    paddingRight: "30px",
    '& .MuiTypography-h2': {
        color: "#FF0144",
        fontSize: "24px",
    },
    '& .MuiTypography-subtitle1': {
        color: "#BAC4D7",
        fontSize: "14px",
    },
    '& .MuiTypography-subtitle2': {
        color: "#7689B0",
        fontSize: "14px",
    },
    '& .MuiTypography-h5': {
        color: "#FF0144",
        fontSize: "14px",
        textDecoration: "underline",
    },
}));

export const TokenSalesItemProgressBar = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    borderRadius: 3,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#7689B03E',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 3,
        backgroundColor: '#FFE300',
    },
}));

// Token Sales Item Footer

export const TokenSalesItemFooter = styled(Stack)(({theme}) => ({
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingTop: "20px",
    paddingBottom: "20px",
    '& .MuiTypography-subtitle1': {
        color: "#BAC4D7",
        fontSize: "14px",
    },
    '& .MuiTypography-subtitle2': {
        color: "#FFFFFF",
        fontSize: "14px",
        letterSpacing: "1px",
        fontWeight: "bold",
    }
}));

export const TokenSalesDetailButton = styled(Button)({
    backgroundColor: "#FF014414",
    color: "#FF0144",
    borderColor: "#CC0136",
    height: "55px",
    padding: "20px 40px",
    textTransform: "capitalize",
    borderRadius: "16px",
    fontSize: "16px",
    fontWeight: "bold",
    '&:hover': {
        backgroundColor: "#E5234A",
        borderColor: "#CC0136",
        color: "#FFF1F5",
    }
});