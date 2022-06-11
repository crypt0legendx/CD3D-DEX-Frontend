import { Grid, InputAdornment, MenuItem, Select, Stack } from "@mui/material";
import React, { useState } from "react";
import ClearFix from "../ClearFix/ClearFix";
import CreateTokenTextForm from "../CreateTokenSales/CreateTokenTextForm";
import {
  CreateTokenFormControl,
  CreateTokenFormLabel,
} from "../CreateTokenSales/create_token_sales_widget";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { makeStyles } from "@material-ui/core";
import SelectDialog from "./SelectDialog";

const useStyles = makeStyles({
  input: {
    fontSize: "50px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      color: "#BAC4D7",
      border: "1px solid #26164A",
      backdropFilter: "blur(30px)",
      backgroundColor: "rgba(0, 0, 0, 0.17)",
    },
    "& .MuiOutlinedInput-input": {
      padding: "15px 25px",
    },
    "& .MuiIconButton-root": {
      color: "black",
      backgroundColor: "transparent",
      "& .MuiSvgIcon-root": {
        color: "#7689B0",
      },
    },
    
  },
  select: {
  "& .MuiPaper-root": {
    display: 'none'
  }
}
});

const SingleTokenStaking = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [tokenType, setTokenType] = useState("");

  const classes = useStyles();

  const handleNetworkChange = (e) => {
    setTokenType(e.target.value);
  };






  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack direction={"row"} width={"100%"} spacing={2}>
      <Stack width={"45%"} direction={"column"}>
        <CreateTokenFormLabel>Single-Sided Deposit</CreateTokenFormLabel>
        <ClearFix height={10} />
        <CreateTokenFormControl>
          <Select
            value={tokenType}
            onClick={handleClickOpen}
            // onChange={handleNetworkChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            
          >
            <SelectDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            />
            {/* <MenuItem selected value="">
              Standard Tokens
            </MenuItem>
            <MenuItem value={"main_net"}>Main net</MenuItem>
            <MenuItem value={"dev_net"}>Dev net</MenuItem>
            <MenuItem value={"local_net"}>Local net</MenuItem> */}
          </Select>
        </CreateTokenFormControl>
      </Stack>

      <Stack spacing={2} display={"flex"} direction={"row"} width={"55%"}>
        <Grid item xs={12} sm={12} md={6}>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <CreateTokenFormLabel>Start Time</CreateTokenFormLabel>
          </Stack>
          <ClearFix height={10} />

          <CreateTokenFormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => (
                  <TextField
                    className={classes.input}
                    sx={{ borderRadius: "15px" }}
                    inputProps={{ borderRadius: "15px" }}
                    {...props}
                  />
                )}
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
              />
            </LocalizationProvider>
          </CreateTokenFormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <CreateTokenFormLabel>End Time</CreateTokenFormLabel>
          </Stack>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => (
                  <TextField
                    className={classes.input}
                    sx={{ borderRadius: "15px" }}
                    inputProps={{ borderRadius: "15px" }}
                    {...props}
                  />
                )}
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
              />
            </LocalizationProvider>
          </CreateTokenFormControl>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default SingleTokenStaking;
