import { Blockchain } from '@deathswap/sdk'

export default function getExplorerName(blockchain: Blockchain): string {
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 'BSCScan'
    case Blockchain.FANTOM:
      return 'Harmony Explorer'
    default:
      return 'Etherscan'
  }
}
