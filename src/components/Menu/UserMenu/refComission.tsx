import React, { useState } from 'react'
import { Box, CopyIcon, Flex, FlexProps,Text} from '@zaigar-finance/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

interface ReferralComissionProps extends FlexProps {
  totalCommission: string
}

const Wrapper = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-radius: 16px;
  position: relative;
`

const Commission = styled.div`
  flex: 1;
  position: relative;
  padding-left: 16px;

  & > input {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.text};
    display: block;
    font-weight: 600;
    font-size: 15px;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }


`

const RefCommission: React.FC<ReferralComissionProps> = ({ totalCommission, ...props }) => {
  return (
    <Box position="relative" {...props}>
      <Wrapper>
        <Text color="secondary" text-size="1px" ml="3px" mr="30px">Earned(ZAIF): </Text>
        <Commission title='Total Ref Commission:' >
          <input type="text" readOnly value={totalCommission} />
        </Commission>
      </Wrapper>
    </Box>
  )
}

export default RefCommission