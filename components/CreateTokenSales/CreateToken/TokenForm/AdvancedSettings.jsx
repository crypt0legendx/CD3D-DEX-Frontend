import {
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Checkbox,
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import ClearFix from "../../../ClearFix/ClearFix";
import CreateTokenTextForm from "../../CreateTokenTextForm";
import {
  CreateTokenFormControl,
  CreateTokenFormLabel,
} from "../../create_token_sales_widget";

const AdvancedSettings = () => {
  const [advanced, setAdvanced] = useState(false);

  const [lpSwap, setLpSwap] = useState("");

  const handleLpSwap = (e) => {
    setLpSwap(e.target.value);
  };
  return (
    <Stack width={"100%"} marginTop={"30px"} direction={"column"} spacing={4}>
      {advanced ? (
        <Stack spacing={2}>
          <Typography color={"#75E4AA"}>Admin/Owner</Typography>

          <Typography
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.17)",
              borderColor: "transparent",
              borderRadius: "15px",
              color: "#435475",
              marginTop: "10px",
              width: "100%",
              p: 2,
            }}
          >
            akd919eb9duoq9
          </Typography>
        </Stack>
      ) : (
        ""
      )}

      <FormGroup>
        <FormControlLabel
          onClick={() => setAdvanced(!advanced)}
          style={{ color: "#EAFBF3" }}
          control={<Switch style={{ color: "#EAFBF3" }} />}
          label="Advanced Settings"
        />
      </FormGroup>

      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={{ sm: "space-between" }}
        alignItems={"center"}
      >
        <Stack>
          <Typography color={"#75E4AA"}>Features</Typography>
        </Stack>
        <Stack direction={{ xs: "column", sm: "column", md: "row" }}>
          <FormControlLabel
            style={{ color: "#EAFBF3" }}
            control={<Checkbox style={{ color: "#EAFBF3", padding: "6px" }} />}
            label="Burn"
          />
          <FormControlLabel
            style={{ color: "#EAFBF3" }}
            control={<Checkbox style={{ color: "#EAFBF3", padding: "6px" }} />}
            label="Mintable"
          />
          <FormControlLabel
            style={{ color: "#EAFBF3" }}
            control={<Checkbox style={{ color: "#EAFBF3", padding: "6px" }} />}
            label="Deflation"
          />
          <FormControlLabel
            style={{ color: "#EAFBF3" }}
            control={<Checkbox style={{ color: "#EAFBF3", padding: "6px" }} />}
            label="Advanced Tokenomics"
          />
        </Stack>
      </Stack>


      {advanced && 
      <>
        <Stack width={"100%"} direction={"column"} spacing={4} paddingTop={2}>
        <Typography variant="h5" style={{ color: "#BCE2D0" }}>
          Tax Wallet Settings
        </Typography>
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
              <CreateTokenFormLabel>Dev Wallet</CreateTokenFormLabel>
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
              <CreateTokenFormLabel>Marketing Wallet</CreateTokenFormLabel>
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

        <Stack width={"100%"}>
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <CreateTokenFormLabel>Charity Wallet</CreateTokenFormLabel>
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

      <Stack width={"100%"} direction={"column"} spacing={4} paddingTop={2}>
        <Typography variant="h5" style={{ color: "#BCE2D0" }}>
          Buy Tax
        </Typography>
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
              <CreateTokenFormLabel>Dev Tax Buy</CreateTokenFormLabel>
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
              <CreateTokenFormLabel>Marketing Tax Buy</CreateTokenFormLabel>
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
          justifyContent={"space-between"}
          spacing={2}
        >
          <Stack width={"50%"}>
            <Stack
              direction={"row"}
              justifyContent={"start"}
              alignItems={"center"}
            >
              <CreateTokenFormLabel>Charity Tax Buy</CreateTokenFormLabel>
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
              <CreateTokenFormLabel>Liquidity Tax Buy</CreateTokenFormLabel>
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

      <Stack width={"100%"} direction={"column"} spacing={4} paddingTop={2}>
        <Typography variant="h5" style={{ color: "#BCE2D0" }}>
          Sell Tax
        </Typography>
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
              <CreateTokenFormLabel>Dev Tax Sell</CreateTokenFormLabel>
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
              <CreateTokenFormLabel>Marketing Tax Sell</CreateTokenFormLabel>
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
          justifyContent={"space-between"}
          spacing={2}
        >
          <Stack width={"50%"}>
            <Stack
              direction={"row"}
              justifyContent={"start"}
              alignItems={"center"}
            >
              <CreateTokenFormLabel>Charity Tax Sell</CreateTokenFormLabel>
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
              <CreateTokenFormLabel>Liquidity Tax Sell</CreateTokenFormLabel>
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

      <Stack width={"100%"} direction={"column"} spacing={4} paddingTop={2}>
        <Typography
          width={"fit-content"}
          style={{ color: "#E9E9EB", borderBottom: "2px solid #375B55" }}
        >
          Buy Fee
        </Typography>
        <Stack
          width={"100%"}
          direction={"row"}
          spacing={4}
          alignItems={"center"}
          paddingLeft={4}
        >
          <FormControl
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant={"h4"}
              style={{ color: "#75E4AA", fontWeight: "500" }}
            >
              5%
            </Typography>
            <FormHelperText style={{ color: "#C4EDD8" }}>Fee</FormHelperText>
          </FormControl>
          <Typography variant={"h6"} style={{ color: "#C4EDD8" }}>
            =
          </Typography>
          <FormControl
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant={"h4"}
              style={{ color: "#75E4AA", fontWeight: "500" }}
            >
              1%
            </Typography>
            <FormHelperText style={{ color: "#C4EDD8" }}>
              Development
            </FormHelperText>
          </FormControl>
          <Typography variant={"h6"} style={{ color: "#C4EDD8" }}>
            +
          </Typography>
          <FormControl
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant={"h4"}
              style={{ color: "#75E4AA", fontWeight: "500" }}
            >
              1%
            </Typography>
            <FormHelperText style={{ color: "#C4EDD8" }}>
              Marketing
            </FormHelperText>
          </FormControl>
          <Typography variant={"h6"} style={{ color: "#C4EDD8" }}>
            +
          </Typography>
          <FormControl
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant={"h4"}
              style={{ color: "#75E4AA", fontWeight: "500" }}
            >
              1%
            </Typography>
            <FormHelperText style={{ color: "#C4EDD8" }}>
              Charity
            </FormHelperText>
          </FormControl>
          <Typography variant={"h6"} style={{ color: "#C4EDD8" }}>
            +
          </Typography>
          <FormControl
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant={"h4"}
              style={{ color: "#75E4AA", fontWeight: "500" }}
            >
              2%
            </Typography>
            <FormHelperText style={{ color: "#C4EDD8" }}>
              Liquidity
            </FormHelperText>
          </FormControl>
        </Stack>
      </Stack>

      <Stack width={"100%"} direction={"column"} spacing={4} paddingTop={2}>
        <Typography
          width={"fit-content"}
          style={{ color: "#E9E9EB", borderBottom: "2px solid #6D0930" }}
        >
          Sell Fee
        </Typography>
        <Stack
          width={"100%"}
          direction={"row"}
          spacing={4}
          alignItems={"center"}
          paddingLeft={4}
        >
          <FormControl
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant={"h4"}
              style={{ color: "#FF0144", fontWeight: "500" }}
            >
              6%
            </Typography>
            <FormHelperText style={{ color: "#FFD7E1" }}>Fee</FormHelperText>
          </FormControl>
          <Typography variant={"h6"} style={{ color: "#FFD7E1" }}>
            =
          </Typography>
          <FormControl
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant={"h4"}
              style={{ color: "#FF0144", fontWeight: "500" }}
            >
              1%
            </Typography>
            <FormHelperText style={{ color: "#FFD7E1" }}>
              Development
            </FormHelperText>
          </FormControl>
          <Typography variant={"h6"} style={{ color: "#FFD7E1" }}>
            +
          </Typography>
          <FormControl
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant={"h4"}
              style={{ color: "#FF0144", fontWeight: "500" }}
            >
              1%
            </Typography>
            <FormHelperText style={{ color: "#FFD7E1" }}>
              Marketing
            </FormHelperText>
          </FormControl>
          <Typography variant={"h6"} style={{ color: "#FFD7E1" }}>
            +
          </Typography>
          <FormControl
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant={"h4"}
              style={{ color: "#FF0144", fontWeight: "500" }}
            >
              1%
            </Typography>
            <FormHelperText style={{ color: "#FFD7E1" }}>
              Charity
            </FormHelperText>
          </FormControl>
          <Typography variant={"h6"} style={{ color: "#FFD7E1" }}>
            +
          </Typography>
          <FormControl
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant={"h4"}
              style={{ color: "#FF0144", fontWeight: "500" }}
            >
              3%
            </Typography>
            <FormHelperText style={{ color: "#FFD7E1" }}>
              Liquidity
            </FormHelperText>
          </FormControl>
        </Stack>
      </Stack>

      <Stack width={"100%"} direction={"column"}>
        <CreateTokenFormLabel>LP SWAP</CreateTokenFormLabel>
        <ClearFix height={10} />
        <CreateTokenFormControl>
          <Select
            value={lpSwap}
            onChange={handleLpSwap}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ color: "#3B4A69" }}
          >
            <MenuItem selected value="">
              CD3D DEX
            </MenuItem>
            <MenuItem value={"main_net"}>Main net</MenuItem>
            <MenuItem value={"dev_net"}>Dev net</MenuItem>
            <MenuItem value={"local_net"}>Local net</MenuItem>
          </Select>
        </CreateTokenFormControl>
      </Stack>
      </>
      }

      
    </Stack>
  );
};

export default AdvancedSettings;
