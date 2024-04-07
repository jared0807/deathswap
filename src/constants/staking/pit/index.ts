import { ChainId } from '@deathswap/sdk'
import { PitInfo } from '../types'
import { FANTOM_MAINNET_PIT_POOLS } from './harmony/mainnet'
import { FANTOM_TESTNET_PIT_POOLS } from './harmony/testnet'
import { BSC_MAINNET_PIT_POOLS } from './bsc/mainnet'
import { BSC_TESTNET_PIT_POOLS } from './bsc/testnet'

export const PIT_POOLS: {
  [chainId in ChainId]?: PitInfo[]
} = {
  [ChainId.FANTOM_MAINNET]: FANTOM_MAINNET_PIT_POOLS,
  [ChainId.FANTOM_TESTNET]: FANTOM_TESTNET_PIT_POOLS,
  [ChainId.BSC_MAINNET]: BSC_MAINNET_PIT_POOLS,
  [ChainId.BSC_TESTNET]: BSC_TESTNET_PIT_POOLS
}
