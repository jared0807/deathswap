import { Fraction, TokenAmount } from '@deathswap/sdk'

export default function calculatePoolShare(baseBlockRewards: TokenAmount, poolBlockRewards: TokenAmount): Fraction {
  return new Fraction(poolBlockRewards.raw, baseBlockRewards.raw)
}
