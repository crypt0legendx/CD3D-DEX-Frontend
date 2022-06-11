import React, { useState } from "react";
import {
  Box,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import ClearFix from "../../components/ClearFix/ClearFix";
import StakingForm from "../../components/Form/StakingForm";
import AddIcon from "@mui/icons-material/Add";
import FormSubmitBtn from "../../components/Form/FormSubmitBtn";
import SingleTokenStaking from "../../components/Staking/SingleTokenStaking";

const StackingBannerContainer = styled(Container)(({ theme }) => ({
  height: "350px",
  maxHeight: "350px",
  marginTop: "40px",
  position: "relative",
  "& .MuiTypography-h2": {
    color: "#4CDC8F",
    fontSize: "40px",
    fontWeight: "bold",
    letterSpacing: "2px",
    lineHeight: "60px",
  },

  "& .MuiTypography-h3": {
    color: "#EAFBF3",
    fontSize: "32px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  "& .MuiTypography-subtitle1": {
    color: "#BAC4D7",
    fontSize: "16px",
  },
  [theme.breakpoints.down("md")]: {
    "& .MuiTypography-h2": {
      lineHeight: "50px",
      fontSize: "35px",
    },
  },
}));

const MiningContainer = styled(Container)(({ theme }) => ({
  "& .MuiTypography-h3": {
    color: "#CAF4DE",
    fontSize: "18px",
  },
  "& .MuiGrid-item": {
    padding: 0,
    marginBottom: "30px",
    marginRight: "15px",
  },
  [theme.breakpoints.down("md")]: {
    "& .MuiGrid-item": {
      marginRight: 0,
    },
  },
}));

const MiningItemContainer = styled(Container)({
  backgroundColor: "rgba(0, 0, 0, 0.15)",
  borderRadius: "15px",
  backdropFilter: "blur(30px)",
  padding: "30px 20px",
  "& .MuiTypography-subtitle1": {
    color: "#BAC4D7",
    fontSize: "18px",
  },
  "& .MuiTypography-subtitle2": {
    color: "#7689B0",
    fontSize: "12px",
    lineHeight: "25px",
  },
});

const RewardContainer = styled(Container)({
  marginTop: "20px",
  "& .MuiTypography-h3": {
    color: "#CAF4DE",
    fontSize: "18px",
  },
  "& .MuiIconButton-root": {
    backgroundColor: "rgba(0, 0, 0, 0.15)",

    "& .MuiSvgIcon-root": {
      color: "#BAC4D7",
    },
  },
});

const RewardLabel = styled(InputLabel)({
  transform: "translate(0, -3px) scale(1)",
  width: "100%",
  "& .MuiTypography-subtitle1": {
    color: "#75E4AA",
    fontSize: "12px",
  },
  "& .MuiTypography-subtitle2": {
    color: "#BAC4D7",
    fontSize: "12px",
  },
});

const RewardChip = styled(Chip)({
  backgroundColor: "#800022",
  color: "#FFF1F5",
  borderRadius: "6px",
});

const StakingListContainer = styled(Container)({
  marginTop: "60px",
  "& .MuiTypography-h3": {
    color: "#4CDC8F",
    fontSize: "20px",
  },

  "& .MuiTypography-subtitle1": {
    color: "#BAC4D7",
    fontSize: "18px",
  },
});

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    color: "#808498",
    border: "none",
    padding: "10px 16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
});

const Stacking = () => {
  const [showStaking, setShowStaking] = useState(false);

  const stakingHandler = () => {
    setShowStaking(!showStaking);
  };
  return (
    <Container maxWidth={"xl"}>
      <StackingBannerContainer>
        <Box
          component={"div"}
          sx={{ position: "absolute", right: 0, top: 0, zIndex: 0 }}
        >
          <Image
            className={"banner-image"}
            src={"/assets/images/stacking-banner.png"}
            alt={""}
            width={456}
            height={350}
          />
        </Box>
        <Box
          component={"div"}
          sx={{ height: "100%", position: "relative", zIndex: 100 }}
        >
          <Stack
            direction={"column"}
            spacing={2}
            justifyContent={"center"}
            sx={{ height: "100%" }}
          >
            <Typography variant={"h3"} component={"h3"}>
              Staking
            </Typography>
            <Typography variant={"h2"} component={"h2"}>
              Give holders
              <br />
              APY for their buy
            </Typography>
            <Stack
              direction={"row"}
              spacing={{ xs: 2, md: 3 }}
              justifyContent={"start"}
            >
              <Typography variant={"subtitle1"} component={"span"}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  justifyContent={"center"}
                >
                  <Image
                    src={"/assets/images/st_staking_lg.png"}
                    alt={""}
                    width={15}
                    height={15}
                  />
                  <Box>Single Token Staking</Box>
                </Stack>
              </Typography>
              <Typography variant={"subtitle1"} component={"span"}>
                OR
              </Typography>
              <Typography variant={"subtitle1"} component={"span"}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  justifyContent={"center"}
                >
                  <Image
                    src={"/assets/images/lp_staking_lg.png"}
                    alt={""}
                    width={15}
                    height={15}
                  />
                  <Box>LP Staking</Box>
                </Stack>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </StackingBannerContainer>
      <MiningContainer>
        <Stack direction={"column"} spacing={6}>
          <Typography variant={"h3"} component={"h3"}>
            Choose Mining Type:{" "}
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={12} md={5}>
              <MiningItemContainer
                onClick={() => stakingHandler()}
                style={{ cursor: "pointer" }}
              >
                <Box
                  component={"div"}
                  sx={{ position: "absolute", left: 20, top: -15, zIndex: 0 }}
                >
                  <Image
                    src={"/assets/images/st_staking_lg.png"}
                    alt={""}
                    width={25}
                    height={25}
                    color={"green"}
                  />
                </Box>
                <Stack direction={"column"} spacing={2}>
                  <Typography variant={"subtitle1"} component={"span"}>
                    Single Token Staking
                  </Typography>
                  <Typography variant={"subtitle2"} component={"span"}>
                    The amount of token rewards increases the longer the
                    single-sided tokens are deposited.
                  </Typography>
                </Stack>
              </MiningItemContainer>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <MiningItemContainer
                onClick={() => stakingHandler()}
                style={{ cursor: "pointer" }}
              >
                <Box
                  component={"div"}
                  sx={{ position: "absolute", left: 20, top: -15, zIndex: 0 }}
                >
                  <Image
                    src={"/assets/images/lp_staking_lg.png"}
                    alt={""}
                    width={25}
                    height={25}
                  />
                </Box>
                <Stack direction={"column"} spacing={2}>
                  <Typography variant={"subtitle1"} component={"span"}>
                    LP Staking
                  </Typography>
                  <Typography variant={"subtitle2"} component={"span"}>
                    The amount of token rewards increases the longer the LP
                    tokens are deposited.
                  </Typography>
                </Stack>
              </MiningItemContainer>
            </Grid>
          </Grid>
        </Stack>
      </MiningContainer>

      <RewardContainer>
        <Stack direction={"column"} spacing={4}>
          {showStaking && <SingleTokenStaking />}
          <Typography variant={"h3"} component={"h3"}>
            Add Reward Tokens:{" "}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={1}
            justifyContent={"start"}
            alignItems={{ xs: "stretch", sm: "stretch", md: "end" }}
            flexBasis={1}
          >
            <FormControl variant={"standard"} sx={{ flex: "3" }}>
              <RewardLabel shrink htmlFor={"daily_reward"}>
                <Typography variant={"subtitle1"} component={"label"}>
                  Reward Token
                </Typography>
              </RewardLabel>
              <StakingForm
                id={"reward_token"}
                InputProps={{
                  type: "number",
                  placeholder: "0",
                  onChange: (value) => {},
                  disableUnderline: true,
                }}
              />
            </FormControl>
            <FormControl variant={"standard"} sx={{ flex: "3" }}>
              <RewardLabel shrink htmlFor={"daily_reward"}>
                <Typography variant={"subtitle1"} component={"label"}>
                  Campaign Period (Days)
                </Typography>
              </RewardLabel>
              <StakingForm
                id={"campaign_period"}
                InputProps={{
                  type: "number",
                  placeholder: "0",
                  onChange: (value) => {},
                  disableUnderline: true,
                }}
              />
            </FormControl>
            <FormControl variant={"standard"} sx={{ flex: "2" }}>
              <RewardLabel shrink htmlFor={"daily_reward"}>
                <Typography variant={"subtitle1"} component={"label"}>
                  Daily Rewards
                </Typography>
              </RewardLabel>
              <StakingForm
                id={"daily_reward"}
                InputProps={{
                  type: "number",
                  placeholder: "0",
                  onChange: (value) => {},
                  disableUnderline: true,
                }}
              />
            </FormControl>
            <FormControl variant={"standard"} sx={{ flex: "5" }}>
              <RewardLabel shrink htmlFor={"total_rewards"}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant={"subtitle1"} component={"label"}>
                    Total Rewards
                  </Typography>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography variant={"subtitle2"} component={"label"}>
                      Available : -{" "}
                    </Typography>
                    <RewardChip size="small" label={"Max"} />
                  </Stack>
                </Stack>
              </RewardLabel>
              <StakingForm
                id={"total_rewards"}
                InputProps={{
                  type: "number",
                  placeholder: "0",
                  onChange: (value) => {},
                  disableUnderline: true,
                }}
              />
            </FormControl>
            <Stack
              sx={{ height: "100%", paddingBottom: "3px" }}
              direction={"column"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              <Box>
                <IconButton aria-label="add">
                  <AddIcon />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box component={"div"} sx={{ width: "350px" }}>
              <FormSubmitBtn
                label={"Create"}
                fullWidth={true}
                onSubmit={() => {}}
              />
            </Box>
          </Stack>
        </Stack>
      </RewardContainer>
      <StakingListContainer>
        <Stack direction={"column"} spacing={5}>
          <Typography variant={"h3"} component={"h3"}>
            Staking List
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#2a233a",
                    backdropFilter: "blur(30px)",
                  }}
                >
                  <StyledTableCell
                    align="center"
                    sx={{
                      borderBottomLeftRadius: "15px",
                      borderTopLeftRadius: "15px",
                    }}
                  >
                    Staking Type
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Staking Address
                  </StyledTableCell>
                  <StyledTableCell align="center">Token Staked</StyledTableCell>
                  <StyledTableCell align="center">Start Time</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      borderBottomRightRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  >
                    End Time
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*{rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}*/}
              </TableBody>
            </Table>
          </TableContainer>
          <Box component={"div"} sx={{ width: "100%", minHeight: "300px" }}>
            <Stack
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                src={"/assets/images/table-empty-lg.png"}
                alt={""}
                width={32}
                height={26}
              />
              <Typography variant={"subtitle1"} component={"span"}>
                No Match Found
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </StakingListContainer>

      <ClearFix height={100} />
    </Container>
  );
};
export default Stacking;
