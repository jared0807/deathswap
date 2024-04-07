import { Blockchain } from '@deathswap/sdk'
import useBlockchain from './useBlockchain'

export default function usePlatformName(): string {
  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 'CobraSwap'
    case Blockchain.FANTOM:
      return 'ViperSwap'
    case Blockchain.ETHEREUM:
      return 'VenomSwap'
    default:
      return 'ViperSwap'
  }
}
