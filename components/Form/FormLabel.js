import * as React from "react";
import {styled} from "@mui/material/styles";
import {Stack} from "@mui/material";
import {Typography} from "@material-ui/core";


const CustomFormLabel = styled((props) => (
    <Stack direction={"row"} justifyContent={"start"} {...props}>
        <Typography variant={"subtitle1"}>{props.title}</Typography>
        <Typography variant={"subtitle2"}>{props.description}</Typography>
        <Typography variant={"caption"}>{props.required ? "*" : ""}</Typography>
    </Stack>
))(({theme}) => ({
    '& .MuiTypography-subtitle1': {
        color: '#75E4AA',
        fontSize: "16px",
    },
    '& .MuiTypography-subtitle2': {
        color: '#7689B0',
        fontSize: "16px",
        marginLeft: "4px",
    },
    '& .MuiTypography-caption' : {
        color: "#FF0144",
        fontSize: "20px",
    }
}));

const FormLabel = (props) => {
    return (
        <CustomFormLabel {...props}/>
    );
}

export default FormLabel;