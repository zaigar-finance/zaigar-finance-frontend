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
  border-radius: 10px;
  width: 100%;
  background-image: linear-gradient(#0ABAB5, #0000);
  max-height: max-content;
  overflow: hidden;
`

const Inner = styled(Flex)`
  position: relative;
  padding: 24px;
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

const NewsBanner = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Inner>
        <LeftWrapper>
          <StyledSubheading>{t('New Launch!')}</StyledSubheading>
          <StyledHeading scale="xl">{t('Try to predict the market on our new binary options game.')}</StyledHeading>
          <Flex margin-bottom="10px">
          <Link href="/options/0x0">
          <ArrowForwardIcon color="Contrast" />
              <Text color="contrast" bold fontSize="22px" mr="8px">
                {t('Play')}
              </Text>            
          </Link>
          <Link href="https://docs.zaigar.finance/products/zaioptions">
              <ArrowForwardIcon color="Contrast" />
              <Text color="contrast" bold fontSize="22px" mr="4px">
                {t('Learn')}
              </Text>         
          </Link>
          </Flex>
        </LeftWrapper>
        <RightWrapper>
          <img src="/images/decorations/zaioption.png" alt={t('zai option')} />
        </RightWrapper>
      </Inner>
    </Wrapper>
  )
}

export default NewsBanner
