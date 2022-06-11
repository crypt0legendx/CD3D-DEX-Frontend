import store from '../state'
import {ChainId} from "cd3d-dex-libs-sdk";
import {GAS_PRICE_GWEI} from "./tokenHelpers";

/**
 * Function to return gasPrice outwith a react component
 */
const getGasPrice = () => {
    const chainId = process.env.REACT_APP_CHAIN_ID
    const state = store.getState()
    const userGas = state.user.gasPrice || GAS_PRICE_GWEI.default
    return chainId === ChainId.MAINNET.toString() ? userGas : GAS_PRICE_GWEI.testnet
}

export default getGasPrice
