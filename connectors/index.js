import { InjectedConnector } from "@web3-react/injected-connector";
import {Web3Provider} from "@ethersproject/providers";
import NetworkConnector from "./NetworkConnector";


const NETWORK_URL ='https://data-seed-prebsc-1-s1.binance.org:8545/';
export const NETWORK_CHAIN_ID = parseInt(97 ?? '56')
export const injected = new InjectedConnector({
  supportedChainIds: [97, 56],
});

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
})

let networkLibrary
export function getNetworkLibrary() {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider))
}

