import { Addresses } from "../constants/constants";
import {NETWORK_CHAIN_ID} from "../connectors";

export const getAddress = (address) => {
  return address[NETWORK_CHAIN_ID];
};

export const getPreSaleAddress = () => {
  return getAddress(Addresses.presale);
};

export const getBUSDAddress = () => {
  return getAddress(Addresses.busd);
};
