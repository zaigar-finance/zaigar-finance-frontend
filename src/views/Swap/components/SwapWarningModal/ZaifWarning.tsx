import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Text } from '@zaigar-finance/uikit'

const ZaifWarning = () => {
  const { t } = useTranslation()

  return (
    <>
      <Text>{t('To trade ZAIF, you must:')} </Text>
      <Text>• {t('Click on the settings icon')}</Text>
      <Text mb="24px">• {t('Set your slippage tolerance to 6%+')}</Text>
      <Text>{t('This is because ZAIF Token has a 5% fee on each transaction:')}</Text>
      <Text>• {t('2% fee = redistributed to all existing holders')}</Text>
      <Text>• {t('1% fee = is automatically burned')}</Text>
      <Text>• {t('2% fee = goes to a treasure address for marketing campaigns')}</Text>
    </>
  )
}

export default ZaifWarning
