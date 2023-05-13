import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button, ArrowForwardIcon, Link, Heading } from '@zaigar-finance/uikit'
import { useTranslation } from 'contexts/Localization'

const StyledSubheading = styled(Heading)`
  background: -webkit-linear-gradient(#ffffff, #ffffff);
  font-size: 24px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 5px;
  margin-top: 5px;
`

const StyledHeading = styled(Heading)`
  color: #ffffff;
  background: -webkit-linear-gradient(#0ABAB5 0%, #0000 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 6px transparent;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
`

const Wrapper = styled.div`
  border-radius: 15px;
  width: 100%;
  background-image: linear-gradient(#18b53c, #0000);
  max-height: max-content;
  overflow: hidden;
`

const Inner = styled(Flex)`
  position: relative;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  max-height: 220px;
`

const LeftWrapper = styled(Flex)`
  z-index: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`

const RightWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 24px;
  opacity: 0.8;

  & img {
    height: 200px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    opacity: 1;

    & img {
      height: 90%;
    }
  }
`

const NftBanner = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
    <Inner>
      <LeftWrapper>
        <StyledSubheading>{t('Staking Update!')}</StyledSubheading>
        <StyledHeading scale="xl">{t('Stake your ZFAIs and earn up to 60% APR clicking here.')}</StyledHeading>
        <Flex margin-bottom="10px">
        <Link href="https://zaigar.finance/vaults">
              <ArrowForwardIcon ml="3px" color="contrast" />
              <Text color="contrast" bold fontSize="20px" ml="6px" mr="4px">
                {t('Enter Page')}
              </Text>         
          </Link>
        </Flex>
      </LeftWrapper>
    </Inner>
  </Wrapper>
  )
}

export default NftBanner
