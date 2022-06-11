import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";

export const LowPercentButton = styled(Button)({
    backgroundColor: "#FF014414",
    color: "#FF0144",
    borderColor: "#CC0136",
    borderRadius: "12px",
    fontSize: "12px",
    '&:hover': {
        backgroundColor: "#E5234A",
        borderColor: "#CC0136",
        color: "#FFF1F5",
    }
});