// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
import tokens from '../constants/tokens'

const getLiquidityUrlPathParts = ({
  quoteTokenAddress,
  tokenAddress,
}) => {
    const wBnbAddress = tokens.wbnb.address
    const firstPart = !quoteTokenAddress || quoteTokenAddress === wBnbAddress ? 'BNB' : quoteTokenAddress
    const secondPart = !tokenAddress || tokenAddress === wBnbAddress ? 'BNB' : tokenAddress
    return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
