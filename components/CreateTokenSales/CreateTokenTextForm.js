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
        color: "white",
        backgroundColor: 'rgba(0, 0, 0, 0.17)',
        backdropFilter: "blur(30px)",
        border: "1px solid #26164A !important",
        borderRadius: "15px",
    },
    '.MuiFilledInput-input': {
        padding: "13px 30px",
        '&::placeholder': {
            color: '#fff',
        },
    },
    '.MuiFormHelperText-root': {
        color: '#7689B0',
        fontSize: "12px",
    },
    '.MuiSvgIcon-root' : {
        color: "#435475",
    }
}));

const CreateTokenTextForm = (props) => {
    return (
        <CustomTextField {...props} />
    );
}
export default CreateTokenTextForm;