import React from "react";
import ClearFix from "../../components/ClearFix/ClearFix";
import {Box, Container, Tabs} from "@mui/material";
import CreatePresalePage from "../../components/CreateTokenSales/CreatePresalePage";
import CreateSalePage from "../../components/CreateTokenSales/CreateSalePage";
import {CreateTokenSalesTab} from "../../components/CreateTokenSales/create_token_sales_widget";
import CreateTokenPage from "../../components/CreateTokenSales/CreateToken/CreateTokenPage";

const CreateTokenSales = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth={'xl'}>
            <ClearFix height={30}/>
            <Box sx={{width: '100%'}}>
                <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{style: {display: "none"}}}>
                    <CreateTokenSalesTab id={"tab_create_token"} className={"first"} label="Create Token" aria-controls={"tab_panel_create_token"}/>
                    <CreateTokenSalesTab id={"tab_create_presale"} className={"second"} label="Create Presale" aria-controls={"tab_panel_create_presale"}/>
                    <CreateTokenSalesTab id={"tab_create_sale"} className={"third"} label="Create Sale" aria-controls={"tab_panel_create_sale"}/>
                </Tabs>
                <ClearFix height={30}/>
                <CreateTokenPage index={0} value={value}/>
                <CreatePresalePage index={1} value={value}/>
                <CreateSalePage index={2} value={value}/>
            </Box>
        </Container>
    );
}
export default CreateTokenSales;