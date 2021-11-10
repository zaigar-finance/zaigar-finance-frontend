import styled from 'styled-components'
import { Flex } from '@zaigar-finance/uikit'

const FlexRow = styled(Flex).attrs({ alignItems: 'center' })`
  flex: 1;
  @media screen and (max-width: 360px){
    margin-top:5px;
    margin-bottom:5px; 
  }
  @media screen and (max-width: 414px) and (min-width: 400px){
    margin-top:-15px;
    z-index: 2; 
  }
`

export default FlexRow
