import React, { useEffect, useRef, useState } from 'react'
import { useCountUp } from 'react-countup'
import styled from 'styled-components'
import { usePredictionsContract,useERC20 } from 'hooks/useContract'
import { PredictionsContract } from 'utils/types'
import { ethersToBigNumber } from 'utils/bigNumber'
import { BnbUsdtPairTokenIcon, Box, Flex, PocketWatchIcon, Text, CrownIcon } from '@zaigar-finance/uikit'
import { ROUND_BUFFER } from 'state/predictions/config'
import { formatBigNumberToFixed,formatBigNumber } from 'utils/formatBalance'
import { useGetCurrentRoundLockTimestamp, useGetLastOraclePrice } from 'state/predictions/hooks'
import { useTranslation } from 'contexts/Localization'
import { formatRoundTime } from '../helpers'
import useCountdown from '../hooks/useCountdown'

const Token = styled(Box)`
  margin-top: -24px;
  position: absolute;
  top: 50%;
  z-index: 30;

  & > svg {
    height: 48px;
    width: 48px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -52px;

    & > svg {
      height: 58px;
      width: 58px;
    }
  }
`
const Token2 = styled(Box)`
  margin-top: -24px;
  position: absolute;
  top: 60%;
  z-index: 0;

  & > svg {
    height: 48px;
    width: 48px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -47px;

    & > svg {
      height: 54px;
      width: 54px;
    }
  }
`

const Token3 = styled(Box)`
  margin-top: -24px;
  position: absolute;
  top: 50%;
  z-index: 30;

  & > svg {
    height: 48px;
    width: 48px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -38px;

    & > svg {
      height: 64px;
      width: 64px;
    }
  }
`

const Title = styled(Text)`
  font-size: 16px;
  line-height: 21px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
    line-height: 22px;
  }
`

const Price = styled(Text)`
  height: 18px;
  justify-self: start;
  width: 70px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: center;
  }
`

const Interval = styled(Text)`
  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: center;
    width: 32px;
  }
`

const Label = styled(Flex)<{ dir: 'left' | 'right' }>`
  background-color: ${({ theme }) => theme.card.background};
  box-shadow: ${({ theme }) => theme.shadows.level1};
  align-items: center;
  border-radius: ${({ dir }) => (dir === 'right' ? '8px 8px 8px 24px' : '8px 8px 24px 8px')};
  flex-direction: column;
  overflow: initial;
  padding: ${({ dir }) => (dir === 'right' ? '0 28px 0 8px' : '0 8px 0 24px')};
  
  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: center;
    border-radius: ${({ theme }) => theme.radii.card};
    flex-direction: row;
    padding: ${({ dir }) => (dir === 'right' ? '8px 40px 8px 8px' : '8px 18px 8px 40px')};
    margin-bottom: ${({ dir }) => (dir === 'left' ? '25px' : '0px')};
    margin-top: ${({ dir }) => (dir === 'left' ? '-20px' : '0px')};
  }
`

export const PricePairLabel: React.FC = () => {
  const price = useGetLastOraclePrice()
  const priceAsNumber = parseFloat(formatBigNumberToFixed(price, 3, 8))
  const { countUp, update } = useCountUp({
    start: 0,
    end: priceAsNumber,
    duration: 1,
    decimals: 4,
  })


  const updateRef = useRef(update)

  useEffect(() => {
    updateRef.current(priceAsNumber)
  }, [priceAsNumber, updateRef])

  return (
    <Box pl="24px" position="relative" display="inline-block">
      <Token left={0}>
        <BnbUsdtPairTokenIcon />
      </Token>
      <Label dir="left">
        <Title bold textTransform="uppercase">
          DOGEUSDT
        </Title>
        <Price fontSize="12px">{`$${countUp}`}</Price>
      </Label>
    </Box>
  )
}

export const JackpotLabel: React.FC = () =>  {

  const predictionContract = usePredictionsContract()
  const [jackpotAmount, getJackpot] = useState("0");
  const [jackpotLocked, getJackpotLock] = useState(0);

  const jackpotAccumulated = async () => { 
    try {
      const response = await predictionContract.getJackpotAmount()
      const currentJackpot = response
      const formatJackpot = formatBigNumber(currentJackpot,1)
      getJackpot(formatJackpot.toString())
      return currentJackpot.gt(0)
    } catch (error) {
      console.log(error)
      return false
    }
  }

   const jackpotLockedAt = async () => { 
    try {
      const response = await predictionContract.getJackpotLockBlock()
      const currentLockJackpot = ethersToBigNumber(response)
      if(currentLockJackpot.gt(0)){
        getJackpotLock(currentLockJackpot.toNumber() + 200480)
      }else{
        getJackpotLock(currentLockJackpot.toNumber())  
      }
      return currentLockJackpot.gt(0)
    } catch (error) {
      console.log(error)
      return false
    }
  } 

  jackpotAccumulated();
  jackpotLockedAt()


  return (
    <><Box pl="25px" pt="15px" position="absolute" display="flex">
      <Token2 left={0}>
        <CrownIcon />
      </Token2>
      <Label dir="left">
        <Title bold textTransform="uppercase" mr="15px">
          POT
        </Title>
        <Price fontSize="12px" mr="1px"> {`${jackpotAmount}`} ZAIF</Price>
      </Label>
    </Box><Box pl="228px" pt="16px" position="absolute" display="flex">
        <Label dir="left">
        <Text fontSize="13px" bold mr="1px">
          pays block
        </Text>
          <Text ml="5px" fontSize="10px"> {`${jackpotLocked}`}</Text>
        </Label>
      </Box></>
  )

}

interface TimerLabelProps {
  interval: string
  unit: 'm' | 'h' | 'd'
}

export const TimerLabel: React.FC<TimerLabelProps> = ({ interval, unit }) => {
  const currentRoundLockTimestamp = useGetCurrentRoundLockTimestamp()
  const { secondsRemaining } = useCountdown(currentRoundLockTimestamp + ROUND_BUFFER)
  const countdown = formatRoundTime(secondsRemaining)
  const { t } = useTranslation()

  return (
    <Box pr="24px" position="relative">
      <Label dir="right">
        <Title bold color="secondary">
          {secondsRemaining === 0 ? t('Closing') : countdown}
        </Title>
        <Interval fontSize="12px">{`${interval}${t(unit)}`}</Interval>
      </Label>
      <Token3 right={0}>
        <PocketWatchIcon />
      </Token3>
    </Box>
  )
}
