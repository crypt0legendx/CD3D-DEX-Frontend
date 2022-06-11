import { serializeTokens } from './tokens'

export const PoolCategory = {
    COMMUNITY : 'Community',
    CORE : 'Core',
    BINANCE : 'Binance', // Pools using native BNB behave differently than pools using a token
    AUTO : 'Auto',
}

const serializedTokens = serializeTokens()

export const pools = [
    {
        sousId: 0,
        stakingToken: serializedTokens.cd3d,
        earningToken: serializedTokens.cd3d,
        contractAddress: {
            97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
            56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
        },
        poolCategory: PoolCategory.CORE,
        harvest: true,
        tokenPerBlock: '10',
        sortOrder: 1,
        isFinished: false,
    }
];
