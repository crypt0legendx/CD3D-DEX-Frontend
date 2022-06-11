import {Chip} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {TokenSalesStatusLabelChip} from "./token_sales_widget";


const TokenSalesStatusLabel = ({status}) => {
    return (
        <TokenSalesStatusLabelChip variant={'outlined'} className={status} icon={<FiberManualRecordIcon/>} label={status}/>
    );
}
export default TokenSalesStatusLabel;