import { ChainId } from '@deathswap/sdk'

export const STAKING_SETTINGS: {
  [chainId in ChainId]?: Record<string, any>
} = {
  [ChainId.BSC_MAINNET]: {
    startBlock: 9498500,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  },
  [ChainId.BSC_TESTNET]: {
    startBlock: 10931000,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  },
  [ChainId.FANTOM_MAINNET]: {
    startBlock: 10183471,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  },
  [ChainId.FANTOM_TESTNET]: {
    startBlock: 10183471,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  }
}
