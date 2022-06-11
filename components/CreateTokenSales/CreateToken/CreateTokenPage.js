import { Stack, Box, Button } from "@mui/material";
import React, { useState } from "react";
import AdvancedSettings from "./TokenForm/AdvancedSettings";
import CreateTokenForm from "./TokenForm/CreateTokenForm";
import {CreateTokenFormControl, CreateTokenFormLabel, CreateTokenHelperText, CreateTokenNextButton, CreateTokenSecondLabel, CreateTokensContentContainer, CreateTokenSpan} from "../create_token_sales_widget";
import Image from "next/image";
import LeftImage from '../../../public/assets/images/createtokenleft.png'



const CreateTokenPage = ({ index, value }) => {
  const [changeRightComponent, setChangeRightComponent] = useState("1");
  const [changeLeftComponent, setChangeLeftComponent] = useState("");

  const tabHandler = (value) => {
    setChangeRightComponent(value);
  };

  const createTokenHandler = () => {};
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={"tab_panel_create_token"}
      aria-labelledby={"Create Token"}
      sx={{ width: "100%", marginBottom: '100px' }}
    >

      <Stack width={"100%"} direction={"row"} height={"100%"}>
        <Stack
          width={"25%"}
          maxHeight={"577px"}
          backgroundColor={"rgba(0, 0, 0, 0.17)"}
          borderRadius={"15px"}
          padding="80px 16px"
        >
          <Image src={LeftImage} width={'194.41px'} height={'259.13px'} objectFit={'contain'}/>
        </Stack>

        <Stack
          width={"75%"}
          // minHeight={"2041px"}
          backgroundColor={"rgba(0, 0, 0, 0.17)"}
          borderRadius={"15px"}
          marginLeft={1}
          p={4}
          pb={8}
        >
          <CreateTokenForm />
          <AdvancedSettings />
          <Stack width={"100%"} alignItems={"center"} paddingTop={4}>
            <Button
              onClick={() => createTokenHandler()}
              style={{
                backgroundColor: "#FF0144",
                color: "white",
                padding: "10px",
                width: "20%",
                borderRadius: "12px",
              }}
            >
              Create Token
            </Button>
          </Stack>{" "}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreateTokenPage;
