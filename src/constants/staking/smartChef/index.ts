import { ChainId } from '@deathswap/sdk'
import { SmartChefPoolInfo } from '../types'
import { FANTOM_MAINNET_SMART_CHEF_POOLS } from './harmony/mainnet'
import { FANTOM_TESTNET_SMART_CHEF_POOLS } from './harmony/testnet'
import { BSC_MAINNET_SMART_CHEF_POOLS } from './bsc/mainnet'
import { BSC_TESTNET_SMART_CHEF_POOLS } from './bsc/testnet'

export const SMART_CHEF_POOL_INFOS: {
  [chainId in ChainId]?: Record<string, SmartChefPoolInfo[]>
} = {
  [ChainId.FANTOM_MAINNET]: FANTOM_MAINNET_SMART_CHEF_POOLS,
  [ChainId.FANTOM_TESTNET]: FANTOM_TESTNET_SMART_CHEF_POOLS,
  [ChainId.BSC_MAINNET]: BSC_MAINNET_SMART_CHEF_POOLS,
  [ChainId.BSC_TESTNET]: BSC_TESTNET_SMART_CHEF_POOLS
}
