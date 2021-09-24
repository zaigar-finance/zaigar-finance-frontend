import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@zaigar-finance/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
  min-width: 100%
`

const Airdrop = () => {
  const { t } = useTranslation()

  return (  
    <Page>
      <StyledNotFound>
        <LogoIcon />
        <Heading size="xxl" text-align="center" ml="5px">ZFAI AIRDROP RAFFLE</Heading>
        <iframe height="1000" width="100%" title="airdrop" src="https://gleam.io/0lX4g/zaigar-finance" frameBorder="0" frame-src="https://gleam.io/0lX4g/zaigar-finance" />
      </StyledNotFound>
    </Page>
  )
}

export default Airdrop
