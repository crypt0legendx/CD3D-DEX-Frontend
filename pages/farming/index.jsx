import React from "react";
import FarmingForm from "../../components/Farming/Pages/FarmingForm";
import ClearFix from "../../components/ClearFix/ClearFix";
import {Container} from "@mui/material";

const Farming = () => {
    return (
        <Container maxWidth={"xl"}>
            <FarmingForm/>
            <ClearFix height={100}/>
        </Container>
    );
}

export default Farming;
