import {getAddress} from '@ethersproject/address'
import {AddressZero} from '@ethersproject/constants'
import {Contract} from "@ethersproject/contracts";
import {BigNumber} from "@ethersproject/bignumber";
import {abi as IUniswapV2Router02ABI} from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import {ChainId, JSBI, Percent, Token, CurrencyAmount, Currency, ETHER, TokenAmount} from 'cd3d-dex-libs-sdk'

import {getWeb3NoAccount} from "./web3";
import {ROUTER_ADDRESS} from "../constants";
import {parseUnits} from "@ethersproject/units";
import {NETWORK_CHAIN_ID} from "../connectors";

export const toHex = (amount) => {
    return getWeb3NoAccount().utils.toHex(amount);
};

export const toWei = (amount) => {
    return getWeb3NoAccount().utils.toWei(amount.toString());
};

export const toGwei = (amount) => {
    return getWeb3NoAccount().utils.toWei(amount.toString(), "gwei");
};

export const getBidPrice = (busd = 0, cd3d = 0) => {
    const bidPrice = busd / cd3d;
    return bidPrice.toFixed(2);
};

export const getUnitPrice = (amount1 = 0, amount2 = 0, fractionDigits = 9) => {
    console.log(amount1, amount2, Number(amount2));
    if (Number(amount2) === 0) return 0;
    const bidPrice = Number(amount1) / Number(amount2);
    return bidPrice.toFixed(fractionDigits);
};

export function isAddress(value) {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

const BSCSCAN_PREFIXES = {
    56: '',
    97: 'testnet.'
}

export function getBscScanLink(data, type, chainId = NETWORK_CHAIN_ID) {
    const prefix = `https://${BSCSCAN_PREFIXES[chainId] || BSCSCAN_PREFIXES[ChainId.MAINNET]}bscscan.com`

    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${data}`
        }
        case 'token': {
            return `${prefix}/token/${data}`
        }
        case 'address':
        default: {
            return `${prefix}/address/${data}`
        }
    }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address, chars = 4) {
    const parsed = isAddress(address)
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// add 10%
export function calculateGasMargin(value) {
    return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num) {
    return new Percent(JSBI.BigInt(Math.floor(num)), JSBI.BigInt(10000))
}

export function calculateSlippageAmount(value, slippage) {
    if (slippage < 0 || slippage > 10000) {
        throw Error(`Unexpected slippage value: ${slippage}`)
    }
    return [
        JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
        JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000))
    ]
}

// account is not optional
export function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address, ABI, library, account) {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(address, ABI, getProviderOrSigner(library, account))
}

// account is optional
export function getRouterContract(_, library, account) {
    return getContract(ROUTER_ADDRESS, IUniswapV2Router02ABI, library, account)
}

export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens, currency) {
    if (currency === ETHER) return true
    return Boolean(currency instanceof Token && defaultTokens[currency.chainId]?.[currency.address])
}


/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export default function isZero(hexNumberString) {
    return /^0x0*$/.test(hexNumberString)
}

// try to parse a user entered amount for a given token
export function tryParseAmount(value, currency) {
    if (!value || !currency) {
        return undefined
    }
    try {
        const typedValueParsed = parseUnits(value, currency.decimals).toString()
        if (typedValueParsed !== '0') {
            return currency instanceof Token
                ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
                : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed))
        }
    } catch (error) {
        // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
        console.info(`Failed to parse input amount: "${value}"`, error)
    }
    // necessary for all paths to return a value
    return undefined
}

//currency format
export function currency(value) {
    let formatter = new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatter.format(value);
}

