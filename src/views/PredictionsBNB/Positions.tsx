import React from 'react'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import SwiperCore, { Keyboard, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { Box,Flex,FlexProps,Text } from '@zaigar-finance/uikit'
import {useReferrerCount, useReferralCommission} from 'hooks/useReferralStats'
import { useGetCurrentEpoch, useGetSortedRounds } from 'state/predictions/hooks'
import 'swiper/swiper.min.css'
import BigNumber from 'bignumber.js'
import CopyRefAddress from 'components/Menu/UserMenu/CopyAddress'
import RefCount from 'components/Menu/UserMenu/refCount'
import RefCommission from 'components/Menu/UserMenu/refComission'
import { ReferralNode } from 'state/types'
import { formatUsdv2, formatBnbv2 } from './helpers'
import RoundCard from './components/RoundCard'
import Menu from './components/Menu'
import useSwiper from './hooks/useSwiper'
import useOnNextRound from './hooks/useOnNextRound'
import useOnViewChange from './hooks/useOnViewChange'
import { PageView } from './types'


SwiperCore.use([Keyboard, Mousewheel])


const StyledSwiper = styled.div`
  .swiper-wrapper {
    align-items: center;
    display: flex;
  }

  .swiper-slide {
    width: 320px;
  }
`
const Positions: React.FC<{ view?: PageView }> = ({ view }) => {
  const { setSwiper } = useSwiper()
  const rounds = useGetSortedRounds()
  const { account } = useWeb3React()
  const refAddress = `https://zaigar.finance/options/${account}`;
  const referralCount = useReferrerCount()
  const totalCommission = useReferralCommission()
  const currentEpoch = useGetCurrentEpoch()
  const previousEpoch = currentEpoch > 0 ? currentEpoch - 1 : currentEpoch
  const previousRound = rounds.find((round) => round.epoch === previousEpoch)
  const swiperIndex = rounds.indexOf(previousRound)
 
  useOnNextRound()
  useOnViewChange(swiperIndex, view)

  return (
    <Box overflow="hidden">
      <Menu />
      <StyledSwiper>
        <Swiper
          initialSlide={swiperIndex}
          onSwiper={setSwiper}
          spaceBetween={16}
          slidesPerView="auto"
          freeMode
          freeModeSticky
          centeredSlides
          freeModeMomentumRatio={0.25}
          freeModeMomentumVelocityRatio={0.5}
          mousewheel
          keyboard
          resizeObserver
        >
          {rounds.map((round) => (
            <SwiperSlide key={round.epoch}>
              <RoundCard round={round} />
            </SwiperSlide>
          ))}
          {account ? (
          <><Flex>
              <Text ml="10px">Your Referral Address</Text>
            </Flex>
            <CopyRefAddress width="350px" justifyContent="center" alignItems="center" flexDirection="column"  ml="10px" account={refAddress} mb="2px" />
            <><Flex>
              <RefCount width="120px" ml="10px" count={referralCount} />
              <RefCommission display="inline-flex" width="220px" ml="10px" totalCommission={totalCommission}  />
            </Flex>
            </>
           </>
          ) : (
            <Flex justifyContent="center" alignItems="center" flexDirection="column" mt="32px">
              <ConnectWalletButton />
              <Text mt="8px">Connect your wallet to view your referral link</Text>
           </Flex>
          )}
        </Swiper>
      </StyledSwiper>
    </Box>
  )
}

export default Positions
