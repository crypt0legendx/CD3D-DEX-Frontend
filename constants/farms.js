import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const farms = [
    /**
     * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
     */
    {
        pid: 0,
        lpSymbol: 'CD3D',
        lpAddresses: {
            56: '0x9108c36dc1dcbf08187d4f4d4579d72e6a35d979',
            97: '0xFd4C59960Ba11F34a978a737E63ff6ECa9aB4979',
        },
        token: serializedTokens.syrup,
        quoteToken: serializedTokens.wbnb,
    },
    {
        pid: 1,
        lpSymbol: 'CD3D-BNB LP',
        lpAddresses: {
            56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
            97: '0x44a718ca8812dc35cf4f43096b646f72d2bd5a08',
        },
        token: serializedTokens.cd3d,
        quoteToken: serializedTokens.wbnb,
    },
    {
        pid: 2,
        lpSymbol: 'BUSD-BNB LP',
        lpAddresses: {
            56: '0x6b4b63fb0b458c14aab4fd0530aa3cb8870cf23d',
            97: '0x97483cfce39ea7015bd65f02f825561e08b6f614',
        },
        token: serializedTokens.busd,
        quoteToken: serializedTokens.wbnb,
    },
    {
        pid: 3,
        lpSymbol: 'CD3D-BUSD LP',
        lpAddresses: {
            56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
            97: '0xeffbdfa135a793e721de661e2f696aebceceee72',
        },
        token: serializedTokens.busd,
        quoteToken: serializedTokens.cd3d,
    }
]

export default farms
