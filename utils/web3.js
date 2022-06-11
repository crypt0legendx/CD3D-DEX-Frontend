import Web3 from "web3";
import getRpcUrl from "./getRpcUrl";
import { ethers } from "ethers";

const RPC_URL = getRpcUrl();
export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  timeout: 10000,
});
const web3NoAccount = new Web3(httpProvider);

const getWeb3NoAccount = () => {
  return web3NoAccount;
};

export { getWeb3NoAccount };
export default web3NoAccount;
