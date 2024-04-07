import { ChainId, WETH, Token } from '@deathswap/sdk'

export default function normalizeWethToken(chainId: ChainId, token: Token | undefined): Token | undefined {
  if (token === undefined) return undefined
  const weth = chainId && WETH[chainId]
  if (token == weth) {
    switch (chainId) {
      case ChainId.BSC_MAINNET:
      case ChainId.BSC_TESTNET:
        return new Token(chainId, token.address, token.decimals, 'BNB', 'Binance Coin')
      case ChainId.FANTOM_MAINNET:
      case ChainId.FANTOM_TESTNET:
        return new Token(chainId, token.address, token.decimals, 'FTM', 'Fantom')
      default:
        return token
    }
  }

  return token
}
