import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  Box,
  Grid,
  Input,
  InputAdornment,
} from "@mui/material";
import ClearFix from "../../../ClearFix/ClearFix";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  CreateTokenFormLabel,
  CreateTokenFormControl,
  CreateTokenSecondLabel,
} from "../../create_token_sales_widget";
import CreateTokenTextForm from "../../CreateTokenTextForm";
import { AccountCircle } from "@mui/icons-material";

const useStyles = makeStyles({
  input: {
    color: "#435475",
    border: "none",
  },
});

const CreateTokenForm = () => {
  const classes = useStyles();

  const [tokenType, setTokenType] = useState("");

  const handleNetworkChange = (e) => {
    setTokenType(e.target.value);
  };
  return (
    <Stack direction={"column"} color={"#75E4AA"} spacing={4}>
      <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
        <Typography>
          <span style={{ color: "#FF0144" }}>*</span>Fields are required
        </Typography>
      </Stack>

      <Stack width={"100%"} direction={"column"}>
        <CreateTokenFormLabel>
          Token Type<span style={{ color: "#FF0144" }}>*</span>
        </CreateTokenFormLabel>
        <ClearFix height={10} />
        <CreateTokenFormControl>
          <Select
            value={tokenType}
            onChange={handleNetworkChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ color: "#3B4A69" }}
          >
            <MenuItem selected value="">
              Standard Tokens
            </MenuItem>
            <MenuItem value={"main_net"}>Main net</MenuItem>
            <MenuItem value={"dev_net"}>Dev net</MenuItem>
            <MenuItem value={"local_net"}>Local net</MenuItem>
          </Select>
          <FormHelperText style={{ color: "#FF0144" }}>
            Fee : 0.2 BUSD
          </FormHelperText>
        </CreateTokenFormControl>
      </Stack>

      <Stack
        width={"100%"}
        direction="row"
        justifyContent={"space-between"}
        spacing={2}
      >
        <Stack width={"50%"}>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <CreateTokenFormLabel>Name</CreateTokenFormLabel>
            <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
          </Stack>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            
            <CreateTokenTextForm
              id={"test"}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Stack>

        <Stack width={"50%"}>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <CreateTokenFormLabel>Symbol</CreateTokenFormLabel>
            <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
          </Stack>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              id={"test"}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Stack>
      </Stack>

      <Stack
        width={"100%"}
        direction="row"
        justifyConten={"space-between"}
        spacing={2}
      >
        <Stack width={"50%"}>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <CreateTokenFormLabel>Decimals</CreateTokenFormLabel>
            <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
          </Stack>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              id={"test"}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Stack>

        <Stack width={"50%"}>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <CreateTokenFormLabel>Total Supply</CreateTokenFormLabel>
            <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
          </Stack>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              id={"test"}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CreateTokenForm;

CreateTokenForm.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
