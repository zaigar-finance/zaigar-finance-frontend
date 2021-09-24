import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@zaigar-finance/uikit'
// import useI18n from 'hooks/useI18n'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
import RoadMapCard from './About/components/RoadMapCard'
import TeamCard from './About/components/TeamCard'

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/zai/3.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 52px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/zai/3.svg');
    background-position: center;
    height: 87px;
    padding-top:160px;
  }
`

const Cards = styled(BaseLayout)`
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
  margin-top: 30px;

  & > div {
    grid-column: span 12;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`

const About: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <Hero />
        <Text>{t('Zaigar is a cryptocurrency rewards marketing company that has been in the market for over 3 years and has more than 30,000 users around the world, having already provided services to large companies in this new economy. With the aim of always continuing to support the development of the cryptocurrency industry, we are now officially launching our DeFi (Decentralized Finance) platform, Zaigar Finance, implemented within the Binance Smart Chain (BSC) network. A simple, fast, and secure platform that allows all members of our community to carry out operations with cryptocurrencies in an extremely easy and uncomplicated way. Furthermore, by adopting well-known strategies in the DeFi universe, it has an economic model capable of generating rewards in crypto assets through Farming and Staking.')}</Text>     
      <div>
        <Cards min-width="100%">
          <RoadMapCard min-width="100%" />
          <TeamCard />
        </Cards>
      </div>
    </Page>
  )
}

export default About
