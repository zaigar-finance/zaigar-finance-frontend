import React, { useEffect, useMemo, useState, useCallback } from 'react'
import {
  ArrowBackIcon,
  Card,
  CardBody,
  CardHeader,
  CardRibbon,
  Flex,
  Heading,
  IconButton,
  Button,
  LogoIcon,
  Text,
  BalanceInput,
  Slider,
  Box,
  AutoRenewIcon,
} from '@zaigar-finance/uikit'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import Cookies from 'js-cookie'
import { ethers } from 'ethers'
import { Token, TokenAmount } from '@pancakeswap/sdk'
import { useSingleCallResult } from 'state/multicall/hooks'
import { parseUnits } from 'ethers/lib/utils'
import { useWeb3React } from '@web3-react/core'
import { useGetMinBetAmount } from 'state/predictions/hooks'
import { useTranslation } from 'contexts/Localization'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { usePredictionsContract,useERC20 } from 'hooks/useContract'
import useTokenBalance, { useGetBnbBalance } from 'hooks/useTokenBalance'
import { getZaifAddress } from 'utils/addressHelpers'
import { BIG_ZERO, ethersToBigNumber } from 'utils/bigNumber'
import { usePriceZaifBusd } from 'state/farms/hooks'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import useToast from 'hooks/useToast'
import { BetPosition } from 'state/types'
import { formatBigNumber, formatFixedNumber } from 'utils/formatBalance'
import ConnectWalletButton from 'components/ConnectWalletButton'
import ApproveConfirmButtons, { ButtonArrangement } from 'views/Profile/components/ApproveConfirmButtons'
import PositionTag from '../PositionTag'
import useSwiper from '../../hooks/useSwiper'
import FlexRow from '../FlexRow'
import useApprovePrediction from '../../hooks/useApproveContract'

interface SetPositionCardProps {
  position: BetPosition
  togglePosition: () => void
  epoch: number
  onBack: () => void
  onSuccess: (decimalValue: string, hash: string) => Promise<void>
}

// /!\ TEMPORARY /!\
// Set default gasPrice (6 gwei) when calling BetBull/BetBear before new contract is released fixing this 'issue'.
// TODO: Remove on beta-v2 smart contract release.
const gasPrice = parseUnits('10', 'gwei')
const dust = parseUnits('0.01', 18)
const percentShortcuts = [10, 25, 50, 75]

const GetButtonProps = (
  value: ethers.BigNumber,
  zaifBalance: ethers.BigNumber,
  minBetAmountBalance: ethers.BigNumber,
) => {

  const { balance: userBalance } = useTokenBalance(getZaifAddress())
  
  const hasSufficientBalance = () => {

     if (userBalance.gt(0)) {
      return value.lte(zaifBalance)
    }
    return userBalance.gt(0)
  }

  if (!hasSufficientBalance()) {
    return { key: 'Insufficient ZAIF balance', disabled: true }
  }

  if (userBalance.eq(0)) {
    return { key: 'Enter an amount', disabled: true }
  }

  return { key: 'Confirm', disabled: value.lt(minBetAmountBalance) }
}

const getValueAsEthersBn = (value: string) => {
  const valueAsFloat = parseFloat(value)
  return Number.isNaN(valueAsFloat) ? ethers.BigNumber.from(0) : parseUnits(value)
}

const SetPositionCard: React.FC<SetPositionCardProps> = ({ position, togglePosition, epoch, onBack, onSuccess }) => {
  const [value, setValue] = useState('')
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [isTxPending, setIsTxPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [percent, setPercent] = useState(0)
  const [allowanceResult, setAllowance] = useState(0);
  const { balance: userBalance } = useTokenBalance(getZaifAddress())
  const { account } = useWeb3React()
  const { swiper } = useSwiper()
  const { toastSuccess } = useToast()
  const zaifPriceBusd = usePriceZaifBusd()
 // const { balance: bnbBalance } = useGetBnbBalance()
  const minBetAmount = useGetMinBetAmount()
  const zaifContract = getZaifAddress();
  const zaifAddress = useERC20(zaifContract)
  const { t } = useTranslation()
  const { toastError } = useToast()
  const predictionsContract = usePredictionsContract()

  // Approval
  const approvedState = async () => { 
    try {
      const response = await zaifAddress.allowance(account, "0x13fb969fD1108a9e7e8f7a02a3F982Ca3ef4D2ce")
      const currentAllowance = ethersToBigNumber(response)
      setAllowance(currentAllowance.toNumber())
      return currentAllowance.gt(0)
    } catch (error) {
      console.log(error)
      return false
    }
  }
  approvedState();
// const test = approvedState();
  // const approvalState = await useSingleCallResult(zaifAddress, 'allowance', [account,"0xD13e8A06A461Fd5b6c3aFb49b22E380FA6d46f67"]).result
  const isApproved = account && allowanceResult > 0
//  console.log(isApproved)

  const { onApprove } = useApprovePrediction(zaifAddress)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])
// ? toastSuccess('Success','You can now Play on Zai Options with ZAIF!') : toastError('Error','Some error occur, make sure you are paying enough gas!')
 /* const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm , handleEnterPosition } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await zaifAddress.allowance(account, predictionsContract.address)
          const currentAllowance = ethersToBigNumber(response)
          return currentAllowance.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return zaifAddress.approve(predictionsContract.address, ethers.constants.MaxUint256)
      },
      onApproveSuccess: async () => {
        toastSuccess(t('Contract enabled - you can now play on Zai Options!'))
      },
      onConfirm: () => {

      },
      onSuccess: async () => {
        toastSuccess(t('Bet Done!'))
      },
    }) */

   const renderApprovalOrBetsButton = () => {
    return isApproved ? (
      <Button
      width="100%"
      disabled={!account || disabled}
      onClick={handleEnterPosition}
      isLoading={isTxPending}
      endIcon={isTxPending ? <AutoRenewIcon color="currentColor" spin /> : null}
    >
      {t(key)}
    </Button>
    ) : (
      <Button mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
        {t('Enable Contract')}
      </Button>
    )
  } 

  // Convert zaif balance to ethers.BigNumber
  const zaifBalanceAsBn = useMemo(() => {
    return ethers.BigNumber.from(userBalance.toString())
  }, [userBalance])
  const maxBalance = useMemo(() => {
    return zaifBalanceAsBn.gt(dust) ? zaifBalanceAsBn.sub(dust) : dust
  }, [zaifBalanceAsBn])
  const balanceDisplay = formatBigNumber(zaifBalanceAsBn)

  const valueAsBn = getValueAsEthersBn(value)
  const showFieldWarning = account && valueAsBn.gt(0) && errorMessage !== null

  const handleInputChange = (input: string) => {
    const inputAsBn = getValueAsEthersBn(input)

    if (inputAsBn.eq(0)) {
      setPercent(0)
    } else {
      const inputAsFn = ethers.FixedNumber.from(inputAsBn)
      const maxValueAsFn = ethers.FixedNumber.from(maxBalance)
      const hundredAsFn = ethers.FixedNumber.from(100)
      const percentage = inputAsFn.divUnsafe(maxValueAsFn).mulUnsafe(hundredAsFn)
      const percentageAsFloat = percentage.toUnsafeFloat()

      setPercent(percentageAsFloat > 100 ? 100 : percentageAsFloat)
    }
    setValue(input)
  }

  const handlePercentChange = (sliderPercent: number) => {
    if (sliderPercent > 0) {
      const maxValueAsFn = ethers.FixedNumber.from(maxBalance)
      const hundredAsFn = ethers.FixedNumber.from(100)
      const sliderPercentAsFn = ethers.FixedNumber.from(sliderPercent.toFixed(18)).divUnsafe(hundredAsFn)
      const balancePercentage = maxValueAsFn.mulUnsafe(sliderPercentAsFn)
      setValue(formatFixedNumber(balancePercentage))
    } else {
      setValue('')
    }
    setPercent(sliderPercent)
  }

  // Clear value
  const handleGoBack = () => {
    setValue('')
    setPercent(0)
    onBack()
  }

  // Disable the swiper events to avoid conflicts
  const handleMouseOver = () => {
    swiper.keyboard.disable()
    swiper.mousewheel.disable()
    swiper.detachEvents()
  }

  const handleMouseOut = () => {
    swiper.keyboard.enable()
    swiper.mousewheel.enable()
    swiper.attachEvents()
  }

  const { key, disabled } = GetButtonProps(valueAsBn, maxBalance, minBetAmount)

  
  const handleEnterPosition = async () => {
    const betMethod = position === BetPosition.BULL ? 'betBull' : 'betBear'

       // Get Referral Address
       const getreferrer = Cookies.get("ReferAddress");
       const referrerAddress = getreferrer.replace(/"/g,"");

      const zaifBetting = valueAsBn.toString(); 

    try {
      const tx = await predictionsContract[betMethod](epoch,referrerAddress, zaifBetting)
      setIsTxPending(true)
      const receipt = await tx.wait()
      onSuccess(valueAsBn.toString(), receipt.transactionHash as string)
    } catch {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setIsTxPending(false)
    }
  }

  // Warnings
  useEffect(() => {
    const inputAmount = getValueAsEthersBn(value)
    const hasSufficientBalance = inputAmount.gt(0) && inputAmount.lte(maxBalance)

    if (!hasSufficientBalance) {
      setErrorMessage({ key: 'Insufficient ZAIF balance' })
    } else if (inputAmount.gt(0) && inputAmount.lt(minBetAmount)) {
      setErrorMessage({
        key: 'A minimum amount of %num% %token% is required',
        data: { num: formatBigNumber(minBetAmount), token: 'ZAIF' },
      })
    } else {
      setErrorMessage(null)
    }
  }, [value, maxBalance, minBetAmount, setErrorMessage])

  return (
    <Card onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <CardHeader p="16px">
        <Flex alignItems="center">
          <IconButton variant="text" scale="sm" onClick={handleGoBack} mr="8px">
            <ArrowBackIcon width="24px" />
          </IconButton>
          <FlexRow>
            <Heading scale="md">{t('Set Position')}</Heading>
          </FlexRow>
          <PositionTag betPosition={position} onClick={togglePosition}>
            {position === BetPosition.BULL ? t('Up') : t('Down')}
          </PositionTag>
        </Flex>
      </CardHeader>
      <CardBody py="16px">
        <Flex alignItems="center" justifyContent="space-between" mb="8px">
          <Text textAlign="right" color="textSubtle">
            {t('Commit')}:
          </Text>
          <Flex alignItems="center">
            <LogoIcon mr="4px  " />
            <Text bold textTransform="uppercase">
              ZAIF
            </Text>
          </Flex>
        </Flex>
        <BalanceInput
          value={value}
          onUserInput={handleInputChange}
          isWarning={showFieldWarning}
          inputProps={{ disabled: !account || isTxPending }}
        />
        {showFieldWarning && (
          <Text color="failure" fontSize="12px" mt="4px" textAlign="right">
            {t(errorMessage.key, errorMessage.data)}
          </Text>
        )}
        <Text textAlign="right" mb="16px" color="textSubtle" fontSize="12px" style={{ height: '18px' }}>
          {account && t('Balance: %balance%', { balance: balanceDisplay })}
        </Text>
        <Slider
          name="balance"
          min={0}
          max={100}
          value={percent}
          onValueChanged={handlePercentChange}
          valueLabel={account ? `${percent.toFixed(percent > 0 ? 1 : 0)}%` : ''}
          step={0.01}
          disabled={!account || isTxPending}
          mb="4px"
          className={!account || isTxPending ? '' : 'swiper-no-swiping'}
        />
        <Flex alignItems="center" justifyContent="space-between" mb="16px">
          {percentShortcuts.map((percentShortcut) => {
            const handleClick = () => {
              handlePercentChange(percentShortcut)
            }

            return (
              <Button
                key={percentShortcut}
                scale="xs"
                variant="tertiary"
                onClick={handleClick}
                disabled={!account || isTxPending}
                style={{ flex: 1 }}
              >
                {`${percentShortcut}%`}
              </Button>
            )
          })}
          <Button
            scale="xs"
            variant="tertiary"
            onClick={() => handlePercentChange(100)}
            disabled={!account || isTxPending}
          >
            {t('Max')}
          </Button>
        </Flex>
        <Box mb="8px">
          {account ? (
            renderApprovalOrBetsButton()
          ) : (
            <ConnectWalletButton width="100%" />
          )}
        </Box>
        <Text as="p" fontSize="12px" lineHeight={1} color="textSubtle">
          {t('You won’t be able to remove or change your position once you enter it.')}
        </Text>
      </CardBody>
    </Card>
  )
}

export default SetPositionCard
