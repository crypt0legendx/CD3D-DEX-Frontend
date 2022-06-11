import {Box, Button, Checkbox, FormControl, FormHelperText, Radio, Select, styled, Tab, Typography} from "@mui/material";
import {Timeline} from "@material-ui/lab";

export const CreateTokenSalesTab = styled(Tab)(({theme}) => ({
    padding: "15px 30px",
    color: "#7689B0",
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    fontSize: "16px",
    letterSpacing: "1px",
    textTransform: "capitalize",
    border: "none !important",
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    '&.Mui-selected': {
        backgroundColor: "#2BD67B",
        color: "#FFFFFF",
        border: "none !important",
        '&:hover': {
            backgroundColor: "#2BD67B",
        }
    },
    '&.first': {
        borderRadius: "12px 0 0 12px",
    },
    '&.second': {
        borderRadius: "0",
        borderLeft: '2px solid #303551 !important',
        borderRight: '2px solid #303551 !important'
    },
    '&.third': {
        borderRadius: "0 12px 12px 0",
    }
}));

export const CreateTokensTimeLineContainer = styled(Box)(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: "15px",
    margin: "5px",
    padding: "25px 0",
    position: "relative",
}));

export const CreateTokensContentContainer = styled(Box)(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: "15px",
    margin: "5px",
    padding: "25px 30px",
    position: "relative",
}));

export const CreateTokenTimeLine = styled(Timeline)(({theme}) => ({
    '.MuiTimelineItem-missingOppositeContent:before': {
        content: "none",
    },

    '.MuiTimelineConnector-root': {
        width: "1px",
        backgroundImage: "linear-gradient(rgba(67, 84, 117, 1) 50%, rgba(255,255,255,0) 0%)",
        backgroundPosition: "right",
        backgroundSize: "10px 12px",
        backgroundColor: "transparent",
        backgroundRepeat: "repeat-y",

        '&.completed': {
            backgroundImage: "linear-gradient(rgba(76, 220, 143, 1) 50%, rgba(255,255,255,0) 0%)",
        }
    },
    '.MuiTimelineContent-root': {
        minHeight: "160px",

        '&.last': {
            minHeight: "100px",
        }
    },
    '.MuiTimelineDot-root': {
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7689B0",
        '.MuiSvgIcon-root': {color: "#162752"},
        '&.completed': {
            backgroundColor: "#4CDC8F"
        }
    },
    '.MuiTypography-h2': {
        color: "#7689B0",
        fontSize: "18px",
        '&.completed': {
            color: "#4CDC8F"
        }
    },
    '.MuiTypography-subtitle1': {
        color: "#435475",
        fontSize: "14px",
        letterSpacing: "1px",
    },
    '.MuiTypography-subtitle2': {
        color: "#7689B0",
        fontSize: "12px"
    },
    '.MuiTypography-caption': {
        color: "#162752",
        fontSize: "12px",
        fontWeight: "bold",
    }
}));

export const CreateTokenNextButton = styled(Button)(({theme}) => ({
    backgroundColor: "#FF0144",
    color: "#FFF1F5",
    borderColor: "#FF0144",
    height: "44px",
    padding: "0 40px",
    textTransform: "capitalize",
    borderRadius: "12px",
    fontSize: "16px",
    '&:hover': {
        backgroundColor: "#E5234A",
        borderColor: "#FF0144",
        color: "#FFF1F5",
    }
}));

export const CreateTokenBackButton = styled(Button)(({theme}) => ({
    backgroundColor: "transparent",
    color: "#BAC4D7",
    borderColor: "#BAC4D7",
    height: "44px",
    padding: "0 40px",
    textTransform: "capitalize",
    borderRadius: "12px",
    fontSize: "16px",
    '&:hover': {
        backgroundColor: "rgba(186, 196, 215, 0.2)",
        borderColor: "#BAC4D7",
        color: "#BAC4D7",
    }
}));

export const CreateTokenFormLabel = styled(Typography)(({theme}) => ({
    color: "#75E4AA",
    fontSize: "14px",
}));

export const CreateTokenSpan = styled(Typography)(({theme}) => ({
    color: "#BAC4D7",
    fontSize: "14px",
}));

export const CreateTokenSecondLabel = styled(Typography)(({theme}) => ({
    color: "#FF0144",
    fontSize: "14px",
}));

export const CreateTokenFormControl = styled(FormControl)(({theme}) => ({
    width: "100%",
    '.MuiSelect-select': {
        padding: "15px 30px",
        color: "#435475",
        backgroundColor: 'rgba(0, 0, 0, 0.17)',
        borderRadius: "15px",
    },
    '.MuiSelect-icon': {
        color: '#BAC4D7',
    },
    '.MuiOutlinedInput-notchedOutline': {
        border: "1px solid #26164A",
        borderRadius: "15px",
        '&::hover': {
            border: "1px solid #26164A",
        }
    },
}));

export const CreateTokenHelperText = styled(FormHelperText)(({theme}) => ({
    color: "#7689B0",
    fontSize: "12px",
    '&.Mui-error': {
        color: "#FF0144",
    }
}));

export const CreateTokenSelect = styled(Checkbox)(({them}) => ({
    '.MuiSvgIcon-root': {
        color: "#EAFBF3",
    },
    '&.Mui-checked': {
        '.MuiSvgIcon-root': {
            color: '#FF0144',
        }
    },
    '.MuiFormControlLabel-label': {
        color: "#EAFBF3",
    }
}));

export const CreateTokenRadio = styled(Radio)(({theme}) => ({
    color: "#EAFBF3",
    '&.Mui-checked': {
        color: "#EAFBF3",
    }
}));

export const CreateTokenDescription = styled(Typography)(({theme}) => ({
    color: "#BAC4D7",
    fontSize: "12px !important",
    lineHeight: "28px !important",
    textAlign: "center",
    padding: "0 40px"
}))


