import { ChainId } from '@deathswap/sdk'
import getPairTokensWithDefaults from '../../../../utils/getPairTokensWithDefaults'
import { PitInfo } from '../../types'

export const FANTOM_MAINNET_PIT_POOLS: PitInfo[] = [
  {
    pid: 0,
    tokens: getPairTokensWithDefaults(ChainId.FANTOM_MAINNET, 'WONE/BUSD')
  },
  {
    pid: 1,
    tokens: getPairTokensWithDefaults(ChainId.FANTOM_MAINNET, 'WONE/VIPER')
  },
  {
    pid: 2,
    tokens: getPairTokensWithDefaults(ChainId.FANTOM_MAINNET, 'WONE/1ETH')
  },
  {
    pid: 3,
    tokens: getPairTokensWithDefaults(ChainId.FANTOM_MAINNET, 'BUSD/VIPER')
  },
  {
    pid: 4,
    tokens: getPairTokensWithDefaults(ChainId.FANTOM_MAINNET, 'BUSD/bscBUSD')
  }
]
