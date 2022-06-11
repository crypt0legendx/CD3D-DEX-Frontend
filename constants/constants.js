import { injected } from "../connectors";
import { toWei, toGwei } from "../utils";
export const connectorsByName = {
  Injected: injected
};

export const Addresses = {
  presale: {
    56: "0x815bf098C634a23Fe9FA1Da8B4B0D255B80A90fB",
  },
  // presale: {
  //   56: "0x815bf098C634a23Fe9FA1Da8B4B0D255B80A90fB",
  // },
  busd: {
    56: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    97: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"
  }
};

export const TokenToBeAuctioned = 20000000;

export const AmountExpected = 200000;

export const Injected = "Injected";

export const auctioningToken = "0x51a32114E3F759179B7EF6Aa41c8f5F1269D429D";

export const biddingToken = "0x28BDc4Ac5447376cE4394f6bf98D4ACeF3789D2F";

export const orderCancellationEndDate = "1633612393";

export const auctionEndDate = "1633612393";

export const auctionedSellAmount = toGwei(TokenToBeAuctioned);

export const _minBuyAmount = toWei(AmountExpected);

export const minimumBiddingAmountPerOrder = toWei(0);

export const minFundingThreshold = 0;

export const isAtomicClosureAllowed = false;

export const accessManagerContract = 0x0000000000000000000000000000000000000000;

export const accessManagerContractData = toWei(0);
