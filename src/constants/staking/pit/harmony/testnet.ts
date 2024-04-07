import { ChainId } from '@deathswap/sdk'
import getPairTokensWithDefaults from '../../../../utils/getPairTokensWithDefaults'
import { PitInfo } from '../../types'

export const FANTOM_TESTNET_PIT_POOLS: PitInfo[] = [
  {
    pid: 0,
    tokens: getPairTokensWithDefaults(ChainId.FANTOM_TESTNET, 'WONE/BUSD')
  }
]
