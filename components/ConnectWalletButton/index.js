import React from 'react'
import useAuth from '../../hooks/useAuth'
import CustomContainedButton from "../CustomContainedButton";
import {ConnectorName} from "../../constants";
import FormSubmitBtn from "../Form/FormSubmitBtn";

const ConnectButton = (props) => {
    const { login, logout } = useAuth()

    return (
        <FormSubmitBtn
            label={'Enable Contract'}
            onSubmit={() => {login(ConnectorName)}}
            fullWidth={true}
        />
        /*<CustomContainedButton btnTitle={'Connect Wallet'} customStyles={{ color: 'white' }} onClick={() => login(ConnectorName)} {...props}/>*/
    )
}

export default ConnectButton
