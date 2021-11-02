import React, { useState } from 'react'
import { Box, CopyIcon, Flex, FlexProps,Text} from '@zaigar-finance/uikit'
import styled from 'styled-components'

interface ReferralCountProps extends FlexProps {
  count: number
}

const Wrapper = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-radius: 16px;
  position: relative;
`

const Count = styled.div`
  flex: 1;
  position: relative;
  padding-left: 16px;

  & > input {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.text};
    display: block;
    font-weight: 600;
    font-size: 16px;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }

`

const RefCount: React.FC<ReferralCountProps> = ({ count, ...props }) => {
  return (
    <Box position="relative" {...props}>
      <Wrapper>
        <Text color="secondary" ml="5px" mr="1px">Referrals: </Text>
        <Count title='Your Referral Count:' >
          <input type="text" color="white" readOnly value={count} />
        </Count>
      </Wrapper>
    </Box>
  )
}

export default RefCount