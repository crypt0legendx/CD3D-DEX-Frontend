import React, {useState} from "react";
import {CreateTokenFormControl, CreateTokenFormLabel, CreateTokenHelperText, CreateTokenNextButton, CreateTokenSecondLabel, CreateTokensContentContainer, CreateTokenSpan} from "../create_token_sales_widget";
import {MenuItem, Select, Stack} from "@mui/material";
import ClearFix from "../../ClearFix/ClearFix";
import CreateTokenTextForm from "../CreateTokenTextForm";
import AddLogo from "../AddLogo";

const CreatePresaleVerifyToken = ({onNext}) => {
    const [network, setNetwork] = useState('');
    const [saleType, setSaleType] = useState('')

    const handleNetworkChange = (event) => {
        setNetwork(event.target.value);
    }

    const handleSaleType = (event) => {
        setSaleType(event.target.value);
    }
    return (
        <CreateTokensContentContainer>
            <Stack direction={"row"} justifyContent={"end"} alignItems={"center"}>
                <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
                <CreateTokenFormLabel>Fields are required</CreateTokenFormLabel>
            </Stack>


            <ClearFix height={10}/>
            <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                <CreateTokenFormLabel>Sale Type</CreateTokenFormLabel>
                <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
            </Stack>
            <ClearFix height={10}/>
            <CreateTokenFormControl>
                <Select
                    value={saleType}
                    onChange={handleSaleType}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                >
                    <MenuItem value={'batch_auction'}>Batch Auction</MenuItem>
                    <MenuItem value={'participation'}>Participation</MenuItem>
                </Select>
            </CreateTokenFormControl>
            <ClearFix height={50}/>



            <ClearFix height={10}/>
            <CreateTokenFormLabel>Network</CreateTokenFormLabel>
            <ClearFix height={10}/>
            <CreateTokenFormControl>
                <Select
                    value={network}
                    onChange={handleNetworkChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                >
                    <MenuItem value="">Select Network</MenuItem>
                    <MenuItem value={'main_net'}>Main net</MenuItem>
                    <MenuItem value={'dev_net'}>Dev net</MenuItem>
                    <MenuItem value={'local_net'}>Local net</MenuItem>
                </Select>
            </CreateTokenFormControl>
            <ClearFix height={50}/>
            <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                <CreateTokenFormLabel>Token Address</CreateTokenFormLabel>
                <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
            </Stack>
            <ClearFix height={10}/>
            <CreateTokenFormControl>
                <CreateTokenTextForm
                    id={"test"}
                    InputProps={{
                        placeholder: "Search token name or token symbol",
                        disableUnderline: true,
                    }}
                />
            </CreateTokenFormControl>
            <CreateTokenHelperText error={true}>Create pool fee: 1 BNB</CreateTokenHelperText>
            <CreateTokenHelperText error={true}>Sale fee: 1% of tokens + 1% of BNB raised</CreateTokenHelperText>
            <ClearFix height={50}/>
            <Stack direction={"column"} spacing={5}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Name</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>Token Name</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Symbol</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>SYM</CreateTokenSpan>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <CreateTokenSpan component={"span"} variant={"subtitle1"}>Decimal</CreateTokenSpan>
                    <CreateTokenSpan component={"span"} variant={"subtitle2"}>9</CreateTokenSpan>
                </Stack>
            </Stack>
            
            <ClearFix height={50}/>
            <AddLogo/>
            <ClearFix height={10}/>


            {saleType == 'participation' ? 
            <>
            <ClearFix height={50}/>
            <CreateTokenFormLabel>LP Token Currency</CreateTokenFormLabel>
            <ClearFix height={10}/>
            <CreateTokenFormControl>
                <Select
                    value={network}
                    onChange={handleNetworkChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                >
                    <MenuItem value="">Select LP Token Currency</MenuItem>
                    <MenuItem value={'main_net'}>Main net</MenuItem>
                    <MenuItem value={'dev_net'}>Dev net</MenuItem>
                    <MenuItem value={'local_net'}>Local net</MenuItem>
                </Select>
            </CreateTokenFormControl>
            <CreateTokenHelperText>CD3D = other half of LP token pair, i.e. BNB-CD3D LP</CreateTokenHelperText>
            </>
            :
            <>
            <ClearFix height={50}/>
            <CreateTokenFormLabel>Sale Currency</CreateTokenFormLabel>
            <ClearFix height={10}/>
            <CreateTokenFormControl>
                <Select
                    value={network}
                    onChange={handleNetworkChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                >
                    <MenuItem value="">Select Sale Currency</MenuItem>
                    <MenuItem value={'main_net'}>Main net</MenuItem>
                    <MenuItem value={'dev_net'}>Dev net</MenuItem>
                    <MenuItem value={'local_net'}>Local net</MenuItem>
                </Select>
            </CreateTokenFormControl>
            <CreateTokenHelperText>Use CD3D for your accepted Sale Currency and enjoy 15% added CD3D to Owner address post-sale.</CreateTokenHelperText>
            </>
            }




            <ClearFix height={50}/>
            <Stack direction={"row"} justifyContent={"end"} alignItems={"center"}>
                <CreateTokenNextButton size={"large"} onClick={() => onNext()}>Next</CreateTokenNextButton>
            </Stack>
        </CreateTokensContentContainer>
    );
}
export default CreatePresaleVerifyToken;