import React, { useState, useCallback } from 'react'
import { TransactionResponse } from '@ethersproject/providers'
import { TokenAmount, Pair } from '@deathswap/sdk'
import Modal from '../../../Modal'
import { AutoColumn } from '../../../Column'
import styled from 'styled-components'
import { RowBetween } from '../../../Row'
import { TYPE, CloseIcon } from '../../../../theme'
import { ButtonError } from '../../../Button'
import CurrencyInputPanel from '../../../CurrencyInputPanel'
import { maxAmountSpend } from '../../../../utils/maxAmountSpend'
import { useDerivedUnstakeInfo } from '../../../../state/stake/hooks'
import { SmartChefStakingPool } from '../../../../state/stake/types'
//import { wrappedCurrencyAmount } from '../../utils/wrappedCurrency'
import { useTransactionAdder } from '../../../../state/transactions/hooks'
import { LoadingView, SubmittedView } from '../../../ModalViews'
import { useSmartChefContract } from '../../../../hooks/useContract'
import useBlockchain from '../../../../hooks/useBlockchain'
import { performWithdrawal } from '../../../../utils/staking/smartChef/performWithdrawal'

/*const HypotheticalRewardRate = styled.div<{ dim: boolean }>`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 20px;

  opacity: ${({ dim }) => (dim ? 0.5 : 1)};
`*/

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  stakingInfo: SmartChefStakingPool
}

export default function ModifiedStakingModal({ isOpen, onDismiss, stakingInfo }: StakingModalProps) {
  const blockchain = useBlockchain()

  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const { parsedAmount, error } = useDerivedUnstakeInfo(typedValue, stakingInfo.stakedAmount)
  /*const parsedAmountWrapped = wrappedCurrencyAmount(parsedAmount, chainId)

  let hypotheticalRewardRate: TokenAmount = new TokenAmount(stakingInfo.rewardRate.token, '0')
  if (parsedAmountWrapped?.greaterThan('0')) {
    hypotheticalRewardRate = stakingInfo.getHypotheticalRewardRate(
      stakingInfo.stakedAmount.add(parsedAmountWrapped),
      stakingInfo.totalStakedAmount.add(parsedAmountWrapped),
      stakingInfo.totalRewardRate
    )
  }*/

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
  const [failed, setFailed] = useState<boolean>(false)
  const wrappedOnDismiss = useCallback(() => {
    setHash(undefined)
    setAttempting(false)
    setFailed(false)
    onDismiss()
  }, [onDismiss])

  const smartChef = useSmartChefContract(stakingInfo.address)

  // pair contract for this token to be staked
  const dummyPair = stakingInfo.stakedTokens
    ? new Pair(new TokenAmount(stakingInfo.stakedTokens[0], '0'), new TokenAmount(stakingInfo.stakedTokens[1], '0'))
    : undefined

  async function onWithdraw() {
    if (smartChef && stakingInfo?.stakedAmount) {
      setAttempting(true)

      await performWithdrawal(blockchain, smartChef, stakingInfo, parsedAmount)
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Withdraw deposited liquidity`
          })
          setHash(response.hash)
        })
        .catch((error: any) => {
          setAttempting(false)
          if (error?.code === -32603) {
            setFailed(true)
          }
          console.log(error)
        })
    }
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  // used for max input button
  const maxAmountInput = maxAmountSpend(stakingInfo.stakedAmount)
  const atMaxAmount = Boolean(maxAmountInput && parsedAmount?.equalTo(maxAmountInput))

  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      {!attempting && !hash && !failed && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>Withdraw</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>

          {stakingInfo.stakedAmount && (
            <CurrencyInputPanel
              value={typedValue}
              onUserInput={onUserInput}
              onMax={handleMax}
              showMaxButton={!atMaxAmount}
              currency={stakingInfo.stakedAmount.token}
              pair={dummyPair}
              label={''}
              disableCurrencySelect={true}
              overrideSelectedCurrencyBalance={stakingInfo.stakedAmount}
              customBalanceText={'Available to withdraw: '}
              id="stake-liquidity-token"
            />
          )}

          <RowBetween>
            <ButtonError disabled={!!error} error={!!error && !!parsedAmount} onClick={onWithdraw}>
              {error ?? 'Withdraw'}
            </ButtonError>
          </RowBetween>
        </ContentWrapper>
      )}
      {attempting && !hash && !failed && (
        <LoadingView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Withdrawing Liquidity</TYPE.largeHeader>
            <TYPE.body fontSize={20}>{parsedAmount?.toSignificant(4)} VENOM-LP</TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {attempting && hash && !failed && (
        <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Transaction Submitted</TYPE.largeHeader>
            <TYPE.body fontSize={20}>Withdraw {parsedAmount?.toSignificant(4)} VENOM-LP</TYPE.body>
          </AutoColumn>
        </SubmittedView>
      )}
      {!attempting && !hash && failed && (
        <ContentWrapper gap="sm">
          <RowBetween>
            <TYPE.mediumHeader>
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                ⚠️
              </span>
              Error!
            </TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          <TYPE.subHeader style={{ textAlign: 'center' }}>
            Your transaction couldn&apos;t be submitted.
            <br />
            You may have to increase your Gas Price (GWEI) settings!
          </TYPE.subHeader>
        </ContentWrapper>
      )}
    </Modal>
  )
}
