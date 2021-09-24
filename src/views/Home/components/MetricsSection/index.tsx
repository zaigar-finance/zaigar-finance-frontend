import React, { useState }  from 'react'
import { Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon } from '@zaigar-finance/uikit'
import { useTranslation } from 'contexts/Localization'
import { useSelector } from 'react-redux'
import { useGetStats } from 'hooks/api'
import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import { useAppDispatch } from 'state'
import { State } from 'state/types'
import { useTotalValue, usePriceCakeBusd, PoolsTotalStaking } from 'state/farms/hooks'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber, getBalanceNumber } from 'utils/formatBalance'
import poolsConfig from 'config/constants/pools'
import { fetchPoolsBlockLimits, fetchPoolsStakingLimits, fetchPoolsTotalStaking } from 'state/pools/fetchPools'
import { getTokenPricesFromFarm } from 'state/pools/helpers'
import { fetchPoolsPublicDataAsync } from 'state/pools'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
import GradientLogo from '../GradientLogoSvg'


// Values fetched from bitQuery effective 6/8/21
const txCount = 38392695
const addressCount = 2319694

const Stats = () => {

 
  const cakeValue = usePriceCakeBusd()
  const getPrice = cakeValue.toNumber()
  const { t } = useTranslation()
  const data = useTotalValue();  // useGetStats()
  const { theme } = useTheme()
 
  const [tvlStringText, setTvl] = useState("0");

  PoolsTotalStaking().then((result) => {
   
    const poolStakedValue = result.times(getPrice)

    const tvl = data.plus(poolStakedValue);
    const finalTvl = tvl.toNumber();
  
    const tvlString = tvl ? formatLocalisedCompactNumber(finalTvl) : '0'


    setTvl(tvlString)

  })

 
  const trades = formatLocalisedCompactNumber(txCount)
  const users = formatLocalisedCompactNumber(addressCount)

  const tvlText = t('And users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlStringText })
  const [entrusting, inFunds] = tvlText.split(tvlStringText)

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="secondary" width="36px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <SwapIcon color="primaryDark" width="36px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <ChartIcon color="secondary" width="36px" />,
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Heading textAlign="center" scale="xl">
        {t('Created By Zaigar.')}
      </Heading>
      <Heading textAlign="center" scale="xl" mb="32px">
        {t('Owned By Everybody.')}
      </Heading>
      <Text textAlign="center" color="textSubtle">
        {t('Zaigar Finance is the most growing decentralized farm platform on BSC.')}
      </Text>
      <Flex flexWrap="wrap">
        <Text display="inline" textAlign="center" color="textSubtle" mb="20px">
          {entrusting}
          <>{data ? <>{tvlStringText}</> : <Skeleton display="inline-block" height={16} width={70} mt="2px" />}</>
          {inFunds}
        </Text>
      </Flex>

      <Text textAlign="center" color="textSubtle" bold mb="32px">
        {t('Will you join them?')}
      </Text>

      <Flex flexDirection={['column', null, null, 'row']}>
        <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={t('$%tvl% staked', { tvl: tvlStringText })}
            bodyText={t('Total Value Locked')}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
      </Flex>
    </Flex>
  )
}

export default Stats
