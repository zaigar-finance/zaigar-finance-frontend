import React, { useEffect, useRef } from 'react'
import { useHistory ,useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core'
import { Helmet } from 'react-helmet-async'
import { useMatchBreakpoints, useModal } from '@zaigar-finance/uikit'
import { useAppDispatch } from 'state'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import Cookies from 'js-cookie'
import { useGetPredictionsStatus, useIsChartPaneOpen } from 'state/predictions/hooks'
import { useInitialBlock } from 'state/block/hooks'
import { initializePredictions } from 'state/predictions'
import { PredictionStatus } from 'state/types'
import usePersistState from 'hooks/usePersistState'
import PageLoader from 'components/Loader/PageLoader'
import usePollOraclePrice from './hooks/usePollOraclePrice'
import usePollPredictions from './hooks/usePollPredictions'
import Container from './components/Container'
import CollectWinningsPopup from './components/CollectWinningsPopup'
import SwiperProvider from './context/SwiperProvider'
import Desktop from './Desktop'
import Mobile from './Mobile'
import RiskDisclaimer from './components/RiskDisclaimer'
import ChartDisclaimer, { CHART_LOCAL_STORAGE_KEY } from './components/ChartDisclaimer'


const Predictions = () => {
  const urlElements = window.location.href.split('/');
  let urlElement = (urlElements[4]);
  /* dica para url com o ref=
  const x = new URLSearchParams(window.location.search);
  const param = x.get("ref"); */
  
  if(urlElement === "0x0"){
    urlElement = "0x0000000000000000000000000000000000000000";
  }
  const REF_KEY = 'ReferAddress';
  const test = Cookies.get(REF_KEY);

 if(test === undefined){
      Cookies.set(REF_KEY, urlElement, { expires: 1 }); 
 }

  const { isXl } = useMatchBreakpoints()
  const [hasAcceptedRisk, setHasAcceptedRisk] = usePersistState(false, {
    localStorageKey: 'pancake_predictions_accepted_risk-2',
  })
  const { account } = useWeb3React()
  const status = useGetPredictionsStatus()
  const isChartPaneOpen = useIsChartPaneOpen()
  const dispatch = useAppDispatch()
  const initialBlock = useInitialBlock()
  const isDesktop = isXl
  const handleAcceptRiskSuccess = () => setHasAcceptedRisk(true)
  const [onPresentRiskDisclaimer] = useModal(<RiskDisclaimer onSuccess={handleAcceptRiskSuccess} />, false)
  const [onPresentChartDisclaimer] = useModal(<ChartDisclaimer />, false)

  // TODO: memoize modal's handlers
  const onPresentRiskDisclaimerRef = useRef(onPresentRiskDisclaimer)
  const onPresentChartDisclaimerRef = useRef(onPresentChartDisclaimer)

  // Disclaimer
  useEffect(() => {
    if (!hasAcceptedRisk) {
      onPresentRiskDisclaimerRef.current()
    }
  }, [hasAcceptedRisk, onPresentRiskDisclaimerRef])

  // Chart Disclaimer
  useEffect(() => {
    if (isChartPaneOpen) {
      const showChartDisclaimer = JSON.parse(localStorage.getItem(CHART_LOCAL_STORAGE_KEY))

      if (showChartDisclaimer !== true) {
        onPresentChartDisclaimerRef.current()
      }
    }
  }, [onPresentChartDisclaimerRef, isChartPaneOpen])

  useEffect(() => {
    if (initialBlock > 0) {
      // Do not start initialization until the first block has been retrieved
      dispatch(initializePredictions(account))
    }
  }, [initialBlock, dispatch, account])

  usePollPredictions()
  usePollOraclePrice()

  if (status === PredictionStatus.INITIAL) {
    return <PageLoader />
  }

  return (
    <>
      <Helmet>
        <script src="https://s3.tradingview.com/tv.js" type="text/javascript" id="tradingViewWidget" />
      </Helmet>
      <SwiperProvider>
        <Container>
          {isDesktop ? <Desktop /> : <Mobile />}
          <CollectWinningsPopup />
        </Container>
      </SwiperProvider>
    </>
  )
}

export default Predictions
