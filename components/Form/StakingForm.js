import * as React from "react";
import {styled} from '@mui/material/styles';
import {TextField} from "@mui/material";

const CustomTextField = styled((props) => (
    <TextField
        variant="filled"
        fullWidth
        size={"small"}
        {...props}
    />
))(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiFilledInput-root': {
        border: '1px solid #26164A',
        overflow: 'hidden',
        borderRadius: "15px",
        color: "#435475",
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        //backgroundColor: "#1D162D",
        backdropFilter: "blur(30px)",
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),

        '.MuiInputAdornment-root': {
            '.MuiTypography-subtitle1': {
                color: "#ffffff",
            }
        }
    },
    '.MuiFilledInput-input': {
        padding: "10px 15px",
    },
    '.MuiFormHelperText-root': {
        color: '#7689B0',
        fontSize: "14px",
        marginLeft: "4px",
    },
}));

const StakingForm = (props) => {
    
    return (
        <CustomTextField {...props} />
    );
}
export default StakingForm;