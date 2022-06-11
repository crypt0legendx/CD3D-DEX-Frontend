import {toast} from "react-toastify";
import {Stack, Typography} from "@mui/material";
import Image from 'next/image';
import ClearFix from "../components/ClearFix/ClearFix";
import SuccessIcon from '../public/assets/Transaction_check.svg';
import errorIcon from '../public/assets/Transaction_error.svg';

export function showToast(success, title, description, extra = null) {
    switch (success) {
        case "success":
            toast.success(
                <Stack direction={"column"} justifyContent={"start"} alignItems={"start"}>
                    <Typography component={"span"} variant={"inherit"} sx={{color: "#0B4124", fontSize: "14px", fontWeight: "600"}}>{title}</Typography>
                    <ClearFix height={8}/>
                    <Typography component={"span"} variant={"inherit"} sx={{color: "#166C3D", fontSize: "12px", fontWeight: "600"}}>{description}</Typography>
                    {extra != null ? <ClearFix height={8}/> : ''}
                    {extra != null ? extra : ''}
                </Stack>
                , {
                    icon: <Image src={SuccessIcon} width={"32px"} height={"32px"} objectFit={"contain"}/>,
                    style: {backgroundColor: "#EAFBF3", borderRadius: "15px", padding: "10px 10px",},

                });
            break;
        case "error":
            toast.error(
                <Stack direction={"column"} justifyContent={"start"} alignItems={"start"}>
                    <Typography component={"span"} variant={"inherit"} sx={{color: "#CC0136", fontSize: "14px", fontWeight: "600"}}>{title}</Typography>
                    <ClearFix height={8}/>
                    <Typography component={"span"} variant={"inherit"} sx={{color: "#435475", fontSize: "12px", fontWeight: "600"}}>{description}</Typography>
                    {extra != null ? <ClearFix height={8}/> : ''}
                    {extra != null ? extra : ''}
                </Stack>
                , {
                    icon: <Image src={errorIcon} width={"32px"} height={"32px"} objectFit={"contain"}/>,
                    style: {backgroundColor: "#FFF1F5", borderRadius: "15px", padding: "10px 10px",},

                });
            break;
    }

}
