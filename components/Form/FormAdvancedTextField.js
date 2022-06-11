import * as React from "react";
import {styled} from '@mui/material/styles';
import {TextField} from "@mui/material";

const CustomTextField = styled((props) => (
    <TextField
        variant="filled"
        fullWidth={true}
        size={"medium"}
        {...props}
    />
))(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiFilledInput-root': {
        border: '1px solid #26164A',
        overflow: 'hidden',
        borderRadius: "12px",
        color: "white",
        backgroundColor: 'rgba(29, 22, 45, 0.02)',
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
        padding: "14px",
    },
    '.MuiFormHelperText-root': {
        color: '#7689B0',
        fontSize: "14px",
        marginLeft: "4px",
    },
}));

const FormAdvancedTextField = (props) => {
    return (
        <CustomTextField {...props} />
    );
}
export default FormAdvancedTextField;