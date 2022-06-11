import React from "react";
import ClearFix from "../ClearFix/ClearFix";
import {Box, Grid, Stack, Typography} from "@mui/material";
import PropTypes from 'prop-types';
import {CreateTokenDescription, CreateTokensTimeLineContainer, CreateTokenTimeLine} from "./create_token_sales_widget";
import {TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@material-ui/lab";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/Check";
import CreateSaleVerifyToken from "./CreateSale/CreateSaleVerifyToken";
import CreateSaleInfo from "./CreateSale/CreateSaleInfo";
import CreateSaleAdditionalInfo from "./CreateSale/CreateSaleAdditionalInfo";
import CreateSaleFinish from "./CreateSale/CreateSaleFinish";

const CreateSalePage = ({index, value}) => {
    const [step, setStep] = React.useState(0);

    const handleChange = (newValue) => {
        setStep(newValue);
    };
    return (
        <Box role="tabpanel" hidden={value !== index} id={"tab_panel_create_sale"} aria-labelledby={"Create Sale"} sx={{width: '100%'}}>
            <Grid container>
                <Grid item xs={12} sm={12} md={3}>
                    <CreateTokensTimeLineContainer>
                        <CreateTokenTimeLine align="left">
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot className={"completed"}>
                                        {
                                            step === 0 ? <MoreHorizIcon/> : <CheckIcon/>
                                        }
                                    </TimelineDot>
                                    <TimelineConnector className={step > 0 ? "completed" : ""}/>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Typography component={"span"} variant={"subtitle1"}>STEP 1</Typography>
                                    <ClearFix height={5}/>
                                    <Typography className={step >= 0 ? "completed" : ""} variant="h2" component="h2">Verify Token</Typography>
                                    <ClearFix height={7}/>
                                    <Typography component={"span"} variant={"subtitle2"}>Enter the token address and verify</Typography>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot className={step >= 1 ? "completed" : ""}>
                                        {
                                            step === 1 ? <MoreHorizIcon/> : ""
                                        }
                                        {
                                            step > 1 ? <CheckIcon/> : ""
                                        }
                                        {
                                            step < 1 ? <Typography component={"span"} variant={"caption"}>2</Typography> : ""
                                        }
                                    </TimelineDot>
                                    <TimelineConnector className={step > 1 ? "completed" : ""}/>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Typography component={"span"} variant={"subtitle1"}>STEP 2</Typography>
                                    <ClearFix height={5}/>
                                    <Typography className={step >= 1 ? "completed" : ""} variant="h2" component="h2">DeFi Token Sale Info</Typography>
                                    <ClearFix height={7}/>
                                    <Typography component={"span"} variant={"subtitle2"}>Enter the sale information about your raise (all details about your sale)</Typography>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot className={step >= 2 ? "completed" : ""}>
                                        {
                                            step === 2 ? <MoreHorizIcon/> : ""
                                        }
                                        {
                                            step > 2 ? <CheckIcon/> : ""
                                        }
                                        {
                                            step < 2 ? <Typography component={"span"} variant={"caption"}>3</Typography> : ""
                                        }
                                    </TimelineDot>
                                    <TimelineConnector className={step > 2 ? "completed" : ""}/>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Typography component={"span"} variant={"subtitle1"}>STEP 3</Typography>
                                    <ClearFix height={5}/>
                                    <Typography className={step >= 2 ? "completed" : ""} variant="h2" component="h2">Add Additional Info</Typography>
                                    <ClearFix height={7}/>
                                    <Typography component={"span"} variant={"subtitle2"}>Let people know who you are</Typography>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot className={step >= 3 ? "completed" : ""}>
                                        {
                                            step === 3 ? <MoreHorizIcon/> : ""
                                        }
                                        {
                                            step > 3 ? <CheckIcon/> : ""
                                        }
                                        {
                                            step < 3 ? <Typography component={"span"} variant={"caption"}>4</Typography> : ""
                                        }
                                    </TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent className={"last"}>
                                    <Typography component={"span"} variant={"subtitle1"}>STEP 4</Typography>
                                    <ClearFix height={5}/>
                                    <Typography className={step >= 3 ? "completed" : ""} variant="h2" component="h2">Finish</Typography>
                                    <ClearFix height={7}/>
                                    <Typography component={"span"} variant={"subtitle2"}>Review your information</Typography>
                                </TimelineContent>
                            </TimelineItem>
                        </CreateTokenTimeLine>
                    </CreateTokensTimeLineContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                    <Box hidden={step !== 0} sx={{width: '100%'}}>
                        <CreateSaleVerifyToken onNext={() => {
                            handleChange(1);
                        }}/>
                    </Box>
                    <Box hidden={step !== 1} sx={{width: '100%'}}>
                        <CreateSaleInfo onNext={() => {
                            handleChange(2);
                        }} onBack={() => {
                            handleChange(0);
                        }}/>
                    </Box>
                    <Box hidden={step !== 2} sx={{width: '100%'}}>
                        <CreateSaleAdditionalInfo onNext={() => {
                            handleChange(3)
                        }} onBack={() => {
                            handleChange(1)
                        }}/>
                    </Box>
                    <Box hidden={step !== 3} sx={{width: '100%'}}>
                        <CreateSaleFinish onSubmit={() => {
                            alert("Finish")
                        }} onBack={() => {
                            handleChange(2)
                        }}/>
                    </Box>
                    <Box hidden={step !== 3}>
                        <ClearFix height={20}/>
                        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                            <CreateTokenDescription component={"span"} variant={"subtitle1"}>
                                Disclaimer : The information provided shall not in any way constitute a recommendation as to whether you should invest in any product discussed. We accept no liability for any loss occasioned to any person acting or refraining from action as a result of any material
                                provided or
                                published. © 2021 by CD3D Team!
                            </CreateTokenDescription>
                        </Stack>
                    </Box>
                    <ClearFix height={150}/>
                </Grid>
            </Grid>
        </Box>
    );
}
export default CreateSalePage;

CreateSalePage.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}