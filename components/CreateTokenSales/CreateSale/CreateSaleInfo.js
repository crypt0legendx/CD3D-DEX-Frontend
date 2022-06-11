import React from "react";
import {CreateTokenBackButton, CreateTokenFormControl, CreateTokenFormLabel, CreateTokenHelperText, CreateTokenNextButton, CreateTokenRadio, CreateTokensContentContainer, CreateTokenSecondLabel, CreateTokenSelect} from "../create_token_sales_widget";
import {FormControlLabel, Grid, InputAdornment, MenuItem, RadioGroup, Select, Stack} from "@mui/material";
import ClearFix from "../../ClearFix/ClearFix";
import CreateTokenTextForm from "../CreateTokenTextForm";
import DateRangeIcon from "@mui/icons-material/DateRange";

const CreateSaleInfo = ({onNext, onBack}) => {
    const [refund, setRefund] = React.useState('');

    const handleRefundChange = (event) => {
        setRefund(event.target.value);
    }

    const [router, setRouter] = React.useState('');

    const handleRouterChange = (event) => {
        setRouter(event.target.value);
    }

    return (
        <CreateTokensContentContainer>
            <Stack direction={"row"} justifyContent={"end"} alignItems={"center"}>
                <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                <CreateTokenFormLabel>Fields are required</CreateTokenFormLabel>
            </Stack>



            {false && 
            <>
            <ClearFix height={50}/>
            <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                <CreateTokenFormLabel>Minimum Bid</CreateTokenFormLabel>
            </Stack>
            <ClearFix height={10}/>
            <CreateTokenFormControl>
                <CreateTokenTextForm
                    InputProps={{
                        placeholder: "",
                        disableUnderline: true,
                    }}
                />
            </CreateTokenFormControl>

            <ClearFix height={50}/>
            <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                <CreateTokenFormLabel>Bid Price</CreateTokenFormLabel>
            </Stack>
            <ClearFix height={10}/>
            <CreateTokenFormControl>
                <CreateTokenTextForm
                    helperText={"Price per token (BUSD)"}
                    InputProps={{
                        placeholder: "",
                        disableUnderline: true,
                    }}
                />
            </CreateTokenFormControl>
            </>
            }






            <ClearFix height={50}/>
            <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                <CreateTokenFormLabel>Token Address</CreateTokenFormLabel>
                <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
            </Stack>
            <ClearFix height={10}/>
            <CreateTokenFormControl>
                <CreateTokenTextForm
                    helperText={"If I spend 1 BNB how many tokens will I receive?"}
                    InputProps={{
                        placeholder: "",
                        disableUnderline: true,
                    }}
                />
            </CreateTokenFormControl>
            <ClearFix height={50}/>
            <CreateTokenFormLabel>Whitelist</CreateTokenFormLabel>
            <ClearFix height={10}/>
            <RadioGroup row aria-label="whitelist" name="row-radio-buttons-group" >
                <FormControlLabel value="disable" control={<CreateTokenRadio />} label="Disable" sx={{color: "#EAFBF3", marginRight: "50px"}}/>
                <FormControlLabel value="enable" control={<CreateTokenRadio />} label="Enable" sx={{color: "#EAFBF3"}}/>
            </RadioGroup>
            <ClearFix height={50}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Soft Cap (BUSD)</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <CreateTokenTextForm
                            helperText={"Soft cap must be >=10% of hard cap"}
                            InputProps={{
                                placeholder: "0",
                                disableUnderline: true,
                            }}
                        />
                    </CreateTokenFormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Hard Cap (BUSD)</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <CreateTokenTextForm
                            InputProps={{
                                placeholder: "0",
                                disableUnderline: true,
                            }}
                        />
                    </CreateTokenFormControl>
                </Grid>
            </Grid>
            <ClearFix height={50}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Minimum Buy (BUSD)</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <CreateTokenTextForm
                            InputProps={{
                                placeholder: "0",
                                disableUnderline: true,
                            }}
                        />
                    </CreateTokenFormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Maximum Buy (BUSD)</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <CreateTokenTextForm
                            InputProps={{
                                placeholder: "0",
                                disableUnderline: true,
                            }}
                        />
                    </CreateTokenFormControl>
                </Grid>
            </Grid>
            <ClearFix height={70}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Refund Type</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <Select
                            value={refund}
                            onChange={handleRefundChange}
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                        >
                            <MenuItem value="">Select Refund Type</MenuItem>
                            <MenuItem value={'main_net'}>Main net</MenuItem>
                            <MenuItem value={'dev_net'}>Dev net</MenuItem>
                            <MenuItem value={'local_net'}>Local net</MenuItem>
                        </Select>
                    </CreateTokenFormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Router</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <Select
                            value={router}
                            onChange={handleRouterChange}
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                        >
                            <MenuItem value="">Select Router</MenuItem>
                            <MenuItem value={'main_net'}>Main net</MenuItem>
                            <MenuItem value={'dev_net'}>Dev net</MenuItem>
                            <MenuItem value={'local_net'}>Local net</MenuItem>
                        </Select>
                    </CreateTokenFormControl>
                </Grid>
            </Grid>
            <ClearFix height={50}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Liquidity (%)</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <CreateTokenTextForm
                            InputProps={{
                                placeholder: "0",
                                disableUnderline: true,
                            }}
                        />
                    </CreateTokenFormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Listing Rate</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <CreateTokenTextForm
                            helperText={"1 BUSD = 4267.5373 CD3D"}
                            InputProps={{
                                placeholder: "0",
                                disableUnderline: true,
                            }}
                        />
                    </CreateTokenFormControl>
                </Grid>
            </Grid>
            <ClearFix height={50}/>
            <CreateTokenHelperText error={true}>Enter the percentage of raised funds that should be allocated to Liquidity (Min : 50% Max : 100%)</CreateTokenHelperText>
            <CreateTokenHelperText error={true}>If I spend 1 BUSD how many tokens will I receive? Usually this amount is lower than presale rate to allow for a higher listing price</CreateTokenHelperText>
            <ClearFix height={50}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Start Date (UTC)</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <CreateTokenTextForm
                            InputProps={{
                                placeholder: "Select Date",
                                disableUnderline: true,
                                endAdornment: <InputAdornment position={"end"}>
                                    <DateRangeIcon/>
                                </InputAdornment>
                            }}
                        />
                    </CreateTokenFormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>End Date (UTC)</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <CreateTokenTextForm
                            InputProps={{
                                placeholder: "Select Date",
                                disableUnderline: true,
                                endAdornment: <InputAdornment position={"end"}>
                                    <DateRangeIcon/>
                                </InputAdornment>
                            }}
                        />
                    </CreateTokenFormControl>
                </Grid>
            </Grid>
            <ClearFix height={50}/>
            <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                <CreateTokenFormLabel>Liquidity Lockup (days)</CreateTokenFormLabel>
                <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
            </Stack>
            <ClearFix height={10}/>
            <CreateTokenFormControl>
                <CreateTokenTextForm
                    InputProps={{
                        placeholder: "",
                        disableUnderline: true,
                    }}
                />
            </CreateTokenFormControl>
            <ClearFix height={50}/>
            <Stack direction={"column"} justifyContent={"center"} alignItems={"start"}>
                <FormControlLabel control={<CreateTokenSelect/>} label="Using Vesting Period?" sx={{color: "#EAFBF3"}}/>
                <FormControlLabel control={<CreateTokenSelect/>} label="Using Anti-Rug System (Team Vesting System)?" sx={{color: "#EAFBF3"}}/>
            </Stack>
            <ClearFix height={50}/>
            <CreateTokenHelperText error={true}>Need 1,563,453 CD3D to create a token sale.</CreateTokenHelperText>
            <ClearFix height={70}/>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <CreateTokenBackButton variant={"outlined"} size={"large"} onClick={() => onBack()}>Back</CreateTokenBackButton>
                <CreateTokenNextButton size={"large"} onClick={() => onNext()}>Next</CreateTokenNextButton>
            </Stack>
        </CreateTokensContentContainer>
    );
}

export default CreateSaleInfo;