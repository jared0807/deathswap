import { ChainId, Currency, ETHER, FANTOM, BINANCE_COIN, WETH } from '@deathswap/sdk'
import { NETWORK_CHAIN_ID } from '../connectors'

export default function baseCurrencies(chainId: ChainId | undefined): Currency[] {
  const currencies: Currency[] = []

  if (chainId) {
    switch (chainId) {
      case ChainId.BSC_MAINNET:
      case ChainId.BSC_TESTNET:
        currencies.push(BINANCE_COIN)
        currencies.push(WETH[chainId])
        //currencies.push(GOVERNANCE_TOKENS[chainId])
        break
      case ChainId.FANTOM_MAINNET:
      case ChainId.FANTOM_TESTNET:
        currencies.push(FANTOM)
        currencies.push(WETH[chainId])
        //currencies.push(GOVERNANCE_TOKENS[chainId])
        break
      default:
        currencies.push(ETHER)
        currencies.push(WETH[chainId])
        break
    }
  } else {
    currencies.push(ETHER)
    currencies.push(WETH[NETWORK_CHAIN_ID as ChainId])
  }

  return currencies
}
