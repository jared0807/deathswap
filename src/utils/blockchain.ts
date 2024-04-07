import { Blockchain, ChainId, Currency, ETHER, BINANCE_COIN, FANTOM } from '@deathswap/sdk'

export function getBlockchain(chainId: ChainId | undefined): Blockchain {
  switch (chainId) {
    case ChainId.MAINNET:
    case ChainId.ROPSTEN:
    case ChainId.RINKEBY:
    case ChainId.GÖRLI:
    case ChainId.KOVAN:
      return Blockchain.ETHEREUM
    case ChainId.BSC_MAINNET:
    case ChainId.BSC_TESTNET:
      return Blockchain.BINANCE_SMART_CHAIN
    case ChainId.FANTOM_MAINNET:
    case ChainId.FANTOM_TESTNET:
      return Blockchain.FANTOM
    default:
      return Blockchain.ETHEREUM
  }
}

export function getBlockchainAdjustedCurrency(
  blockchain: Blockchain,
  currency: Currency | undefined
): Currency | undefined {
  if (!currency) return currency
  if (currency !== ETHER) return currency
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return BINANCE_COIN
    case Blockchain.FANTOM:
      return FANTOM
    default:
      return ETHER
  }
}

// Returns the block time in seconds
export function getBlockchainBlockTime(blockchain: Blockchain): number {
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 3
    case Blockchain.FANTOM:
      return 2
    default:
      return 13
  }
}

export function getBlockchainName(chainId: ChainId | undefined): string {
  switch (chainId) {
    case ChainId.MAINNET:
    case ChainId.ROPSTEN:
    case ChainId.RINKEBY:
    case ChainId.GÖRLI:
    case ChainId.KOVAN:
      return 'Ethereum'
    case ChainId.BSC_MAINNET:
    case ChainId.BSC_TESTNET:
      return 'Binance Smart Chain'
    case ChainId.FANTOM_MAINNET:
    case ChainId.FANTOM_TESTNET:
      return 'Fantom'
    default:
      return 'Ethereum'
  }
}
