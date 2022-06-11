import React from 'react';
import {buttonUnstyledClasses, Stack, TabPanelUnstyled, TabsListUnstyled, TabsUnstyled, TabUnstyled, tabUnstyledClasses} from "@mui/base";
import { Container } from '@mui/material';
import {styled} from "@mui/material/styles";
import LiquidityRemove from "./pages/LiquidityRemove";
import LiquiditySwap from "./pages/LiquiditySwap";

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const Tab2 = styled(TabUnstyled)({
    width: "100%",
    backgroundColor: "transparent",
    color: "#7689B0",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    borderRadius: "12px",
    border: "none",
    paddingTop: "18px",
    paddingBottom: "18px",
    '&:hover': {
        color: '#FFFFFF',
    },
    '& selected': {
        backgroundColor: "#2BD67B",
    }
});

const Tab = styled(TabUnstyled)`
    width: 100%;
    background-color: transparent;
    color: #7689B0;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    justify-content: center;
    border: none;
    padding-top: 18px;
    padding-bottom: 18px;
    &:hover {
      color: #ffffff;
    }
    
    &.first {
        border-radius: 12px 0 0 12px;
    }
    &.second {
        border-radius: 0 12px 12px 0;
    }
    &.${buttonUnstyledClasses.focusVisible} {
      color: #fff;
      background-color: #2BD67B;
    }
    &.${tabUnstyledClasses.selected} {
      background-color: #2BD67B;
      color: #ffffff;     
    }
`;

const TabPanel = styled(TabPanelUnstyled)({
    width: "100%",
});

const TabsList = styled(TabsListUnstyled)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    backdropFilter: "blur(30px)",
    borderRadius: "12px",
    marginBottom: "16px",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-between",
    '&:first-child' : {
        border: "12px 0 0 12px",
    }
});

const Liquidity = () => {
    return (
        <Container maxWidth={"sm"}>
            <TabsUnstyled defaultValue={0}>
                <TabsList>
                    <Tab className={"first"}>Add Liquidity</Tab>
                    <Tab className={"second"}>Remove Liquidity</Tab>
                </TabsList>
                <TabPanel value={0}>
                    <LiquiditySwap/>
                </TabPanel>
                <TabPanel value={1}>
                    <LiquidityRemove/>
                </TabPanel>
            </TabsUnstyled>
        </Container>
    );
}

export default Liquidity;
