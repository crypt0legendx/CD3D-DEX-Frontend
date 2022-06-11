import random from "lodash/random";
import {ChainId} from "cd3d-dex-libs-sdk";
import {NETWORK_CHAIN_ID} from "../connectors";

export const nodes = {
  [ChainId.MAINNET]: ["https://bsc-dataseed.binance.org/"],
  [ChainId.TESTNET]: ["https://data-seed-prebsc-1-s1.binance.org:8545"]
};

const getNodeUrl = () => {
  const randomIndex = random(0, nodes[NETWORK_CHAIN_ID].length - 1);
  return nodes[NETWORK_CHAIN_ID][randomIndex];
};

export default getNodeUrl;
