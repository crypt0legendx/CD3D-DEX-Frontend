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
    '& .MuiFilledInput-root': {
        overflow: 'hidden',
        borderRadius: "12px",
        color: "white",
        backgroundColor: 'rgba(0, 0, 0, 0.17)',
        backdropFilter: "blur(30px)",
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
    },
    '.MuiFilledInput-input': {
        padding: "20px 25px",
        '&::placeholder': {
            color: '#7689B0',
        },
    },
}));

const TokenSalesSearchField = (props) => {
    return (
        <CustomTextField {...props} />
    );
}
export default TokenSalesSearchField;