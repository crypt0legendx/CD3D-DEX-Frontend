import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";
import React from "react";

const StackTextField = styled((props) => (
    <TextField
        // InputProps={{
        //     disableUnderline: true,
        //     endAdornment: <InputAdornment position="end">
        //         <Chip label="Max" color={"error"} size={"small"} onClick={() => setInput(fullBalanceNumber.toNumber())}/>
        //         <Typography variant="subtitle2">{tokenName}</Typography>
        //     </InputAdornment>,
        // }}
        {...props}
    />
))(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiFilledInput-root': {
        border: '1px solid #1D9756',
        overflow: 'hidden',
        borderRadius: 12,
        backgroundColor: '#FFF1F5',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
    },
    '.MuiFilledInput-input': {
        padding: 12,
    },

    '.MuiFormHelperText-root': {
        color: '#166C3D',
        fontSize: 14,
        marginLeft: 4,
    },

    '.MuiTypography-root' : {
        color: '#166C3D',
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
    }
}));

const FarmingDialogInput = (props) => {
    return (
        <StackTextField {...props} />
    );
}
export default FarmingDialogInput;
