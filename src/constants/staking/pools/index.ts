import { ChainId } from '@deathswap/sdk'
import { DefaultStakingPoolInfo } from '../types'
import { FANTOM_MAINNET_POOLS } from './harmony/mainnet'
import { FANTOM_TESTNET_POOLS } from './harmony/testnet'
import { BSC_MAINNET_POOLS } from './bsc/mainnet'
import { BSC_TESTNET_POOLS } from './bsc/testnet'

export const DEFAULT_STAKING_POOL_INFOS: {
  [chainId in ChainId]?: DefaultStakingPoolInfo[]
} = {
  [ChainId.FANTOM_MAINNET]: FANTOM_MAINNET_POOLS,
  [ChainId.FANTOM_TESTNET]: FANTOM_TESTNET_POOLS,
  [ChainId.BSC_MAINNET]: BSC_MAINNET_POOLS,
  [ChainId.BSC_TESTNET]: BSC_TESTNET_POOLS
}
