import {CreateTokenBackButton, CreateTokenFormControl, CreateTokenFormLabel, CreateTokenNextButton, CreateTokensContentContainer, CreateTokenSecondLabel} from "../create_token_sales_widget";
import {Grid, Stack} from "@mui/material";
import ClearFix from "../../ClearFix/ClearFix";
import CreateTokenTextForm from "../CreateTokenTextForm";
import React from "react";

const CreateSaleAdditionalInfo = ({onNext, onBack}) => {
    return (
        <CreateTokensContentContainer>
            <Stack direction={"row"} justifyContent={"end"} alignItems={"center"}>
                <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                <CreateTokenFormLabel>Fields are required</CreateTokenFormLabel>
            </Stack>
            <ClearFix height={50}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Logo URL</CreateTokenFormLabel>
                        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                    </Stack>
                    <ClearFix height={10}/>
                    <CreateTokenFormControl>
                        <CreateTokenTextForm
                            helperText={"URL must end with a supported image extension png, jpg, jpeg or gif"}
                            InputProps={{
                                placeholder: "",
                                disableUnderline: true,
                            }}
                        />
                    </CreateTokenFormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Website</CreateTokenFormLabel>
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
                </Grid>
            </Grid>
            <ClearFix height={50}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Facebook</CreateTokenFormLabel>
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
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Twitter</CreateTokenFormLabel>
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
                </Grid>
            </Grid>
            <ClearFix height={50}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Github</CreateTokenFormLabel>
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
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Telegram</CreateTokenFormLabel>
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
                </Grid>
            </Grid>
            <ClearFix height={50}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Instagram</CreateTokenFormLabel>
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
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Discord</CreateTokenFormLabel>
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
                </Grid>
            </Grid>
            <ClearFix height={50}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Reddit</CreateTokenFormLabel>
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
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <CreateTokenFormLabel>Youtube</CreateTokenFormLabel>
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
                </Grid>
            </Grid>
            <ClearFix height={50}/>
            <CreateTokenFormLabel>Description</CreateTokenFormLabel>
            <ClearFix height={10}/>
            <CreateTokenFormControl>
                <CreateTokenTextForm
                    InputProps={{
                        placeholder: "",
                        disableUnderline: true,
                    }}
                    multiline
                    rows={6}
                />
            </CreateTokenFormControl>
            <ClearFix height={70}/>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <CreateTokenBackButton variant={"outlined"} size={"large"} onClick={() => onBack()}>Back</CreateTokenBackButton>
                <CreateTokenNextButton size={"large"} onClick={() => onNext()}>Next</CreateTokenNextButton>
            </Stack>
        </CreateTokensContentContainer>
    );
}
export default CreateSaleAdditionalInfo;