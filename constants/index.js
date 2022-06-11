import {ChainId, Currency, JSBI, Percent, Token, WETH} from 'cd3d-dex-libs-sdk'
import {mainnetTokens, testnetTokens} from "./tokens";
import {BIG_TEN} from "../utils/bigNumber";

export const ROUTER_ADDRESS = '0x98f86FE4b5C782CA7c0Fa012446056ddDce1C313'

export const BSC_BLOCK_TIME = 3

export const CAKE = new Token(
    ChainId.MAINNET,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'CAKE',
    'PancakeSwap Token'
)

export const WBNB = new Token(ChainId.MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB')
export const DAI = new Token(ChainId.MAINNET, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin')
export const BTCB = new Token(ChainId.MAINNET, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'Binance BTC')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD')

export const UST = new Token(
    ChainId.MAINNET,
    '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
    18,
    'UST',
    'Wrapped UST Token'
)

export const ETH = new Token(
    ChainId.MAINNET,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'ETH',
    'Binance-Peg Ethereum Token'
)

const WETH_ONLY = {
    [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
    [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST = {
    ...WETH_ONLY,
    [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BTCB, USDT, UST, ETH],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the lists of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES = {
    [ChainId.MAINNET]: {},
}

// used for display in the default lists when adding liquidity
export const SUGGESTED_BASES = {
    ...WETH_ONLY,
    [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDT],
}

// used to construct the lists of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR = {
    ...WETH_ONLY,
    [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BTCB, USDT],
}

export const PINNED_PAIRS = {
    [ChainId.MAINNET]: [
        [mainnetTokens.cd3d, mainnetTokens.wbnb],
        [mainnetTokens.busd, mainnetTokens.wbnb],
        [mainnetTokens.cd3d, mainnetTokens.busd],
    ],
}

export const NetworkContextName = 'NETWORK'

// Connect Wallet Name
export const ConnectorName = "Injected";

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH


export const Field = {
    CURRENCY_A: 1,
    CURRENCY_B: 2,
    LIQUIDITY_PERCENT: 3,
    LIQUIDITY: 4
}


/////////////////////////////////////////////////////////////////////////////////////////////
///
/// Swap

export const MIN_SWAP_PRICE = 10;
export const SWAP_TOKEN_LIST = {
    [ChainId.MAINNET]: [Currency.ETHER, mainnetTokens.cd3d, mainnetTokens.busd],
    [ChainId.TESTNET]: [Currency.ETHER, testnetTokens.cd3d, testnetTokens.busd],
}

///////////////////////////////////////////////////////////////////////////////////////////////
///
/// Farming

export const CD3D_PER_BLOCK = 40
export const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365 // 10512000
export const CD3D_PER_YEAR = CD3D_PER_BLOCK * BLOCKS_PER_YEAR
export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://18.116.235.55' : 'http://localhost:3001'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/liquidity`
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 200000

export { default as farmsConfig } from './farms'
export { pools as poolsConfig, PoolCategory } from './pools'
