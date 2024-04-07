import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@deathswap/sdk'
import { SerializableFraction } from '../../serialize'

export const updateTvl = createAction<{
  chainId: ChainId
  tvlType: string
  tvl?: SerializableFraction
}>('stakingTvls/update')
