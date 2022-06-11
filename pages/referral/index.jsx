import React from "react";
import {Box, Container, Stack, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import ClearFix from "../../components/ClearFix/ClearFix";
import FormSubmitBtn from "../../components/Form/FormSubmitBtn";

const ReferralContainer = styled(Container)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: '15px',
    padding: '50px 10px',
    backdropFilter: "blur(30px)",
    position: "relative",
    marginTop: "50px",
    overflow: "hidden",
    '& .MuiTypography-h3': {
        color: "#75E4AA",
        fontSize: "28px",
    },
    '& .MuiTypography-subtitle1': {
        color: "#EAFBF3",
        fontSize: "14px",
        textAlign: "center",
    },
    '& .MuiTypography-subtitle2': {
        color: "#4CDC8F",
        fontSize: "14px",
    }
});

const ReferralLinkContainer = styled(Box)({
    borderRadius: '15px',
    width: "70%",
    border: '1px solid #26164A',
    padding: "10px 20px",
    backgroundColor: 'rgba(29, 22, 45, 0.02)',
    backdropFilter: "blur(30px)",
    '& .MuiTypography-subtitle1': {
        color: "#EAFBF3",
        fontSize: "14px",
        textAlign: "center",
    },

    '& button': {
        fontSize: "14px !important",
    }
});

const Referral = () => {
    return (
        <Container maxWidth={"xl"}>
            <ReferralContainer>
                <Stack direction={"column"} justifyContent={"start"} alignItems={"center"} spacing={2}>
                    <Typography component={"h3"} variant={"h3"}>Refer and Earn</Typography>
                    <Typography component={"span"} variant={"subtitle1"}>Share your referral link with others to earn 30% of the dividends of those who sign up using it.</Typography>
                    <ClearFix height={8}/>
                    <Typography component={"span"} variant={"subtitle2"}>Referral Link</Typography>
                    <ReferralLinkContainer>
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography component={"span"} variant={"subtitle1"}>0x06947004d71C135800C64dF38D4a11907212A955</Typography>
                            <Box sx={{width: "140px"}}>
                                <FormSubmitBtn label={"Copy Link"} fullWidth={true} onSubmit={() => {
                                }}/>
                            </Box>
                        </Stack>
                    </ReferralLinkContainer>
                    <ClearFix height={20}/>
                </Stack>
            </ReferralContainer>
        </Container>
    );
}

export default Referral;