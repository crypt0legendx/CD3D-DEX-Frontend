import {ChainId, Token} from 'cd3d-dex-libs-sdk'
import {serializeToken} from "../utils/tokenHelpers";

const { MAINNET, TESTNET } = ChainId

export const mainnetTokens = {
    wbnb: new Token(
        MAINNET,
        '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        18,
        'WBNB',
        'Wrapped BNB',
        'https://www.binance.com/',
    ),
    // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
    bnb: new Token(
        MAINNET,
        '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        18,
        'BNB',
        'BNB',
        'https://www.binance.com/'
    ),
    busd: new Token(
        MAINNET,
        '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        18,
        'BUSD',
        'Binance USD',
        'https://www.paxos.com/busd/',
    ),
    cd3d: new Token(
        MAINNET,
        '0x9108c36dc1dcbf08187d4f4d4579d72e6a35d979',
        9,
        'CD3D',
        'CD3D',
        'https://cd3d-silk.vercel.app/',
    ),
    qsd: new Token(
        MAINNET,
        '0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2',
        18,
        'QSD',
        'QIAN second generation dollar',
        'https://chemix.io/home',
    ),
    syrup: new Token(
        MAINNET,
        '0x6fA3445BA41440a299D1E4d50944475CcACBE97b',
        18,
        'SYRUP',
        'SyrupBar Token',
        'https://cd3d-silk.vercel.app/',
    )
}

export const testnetTokens = {
    wbnb: new Token(
        TESTNET,
        '0xae13d989dac2f0debff460ac112a837c89baa7cd',
        18,
        'WBNB',
        'Wrapped BNB',
        'https://www.binance.com/',
    ),
    busd: new Token(
        TESTNET,
        '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
        18,
        'BUSD',
        'Binance USD',
        'https://www.paxos.com/busd/',
    ),
    cd3d: new Token(
        TESTNET,
        '0xFd4C59960Ba11F34a978a737E63ff6ECa9aB4979',
        9,
        'CD3D',
        'CD3D',
        'https://cd3d-silk.vercel.app/',
    ),
    syrup: new Token(
        TESTNET,
        '0x9da438fAF36A67E3C36CFda7C49D6DBc6A930F94',
        18,
        'SYRUP',
        'SyrupBar Token',
        'https://cd3d-silk.vercel.app/',
    )
}

const tokens = () => {
    const chainId = process.env.REACT_APP_CHAIN_ID

    // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
    if (parseInt(chainId, 10) === ChainId.TESTNET) {
        return Object.keys(mainnetTokens).reduce((accum, key) => {
            return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
        }, {})
    }

    return mainnetTokens
}

export const serializeTokens = () => {
    const unserializedTokens = tokens()
    return Object.keys(unserializedTokens).reduce((accum, key) => {
        return {...accum, [key]: serializeToken(unserializedTokens[key])}
    }, {})
}

export default tokens()
