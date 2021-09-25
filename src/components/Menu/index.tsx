import React from 'react'
import { Menu as UikitMenu } from '@zaigar-finance/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd, usePriceZaifBusd } from 'state/farms/hooks'
import { useProfile } from 'state/profile/hooks'
import config from './config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  const zaifPriceUsd = usePriceZaifBusd()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()

  return (
    <UikitMenu
      userMenu={<UserMenu />}
      globalMenu={<GlobalSettings />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      zaifPriceUsd={zaifPriceUsd.toNumber()}
      links={config(t)}
      priceLinkZaif="https://bscscan.com/token/0x280C3Fc949b1a1D7a470067cA6F7b48b3CB219c5"
      priceLinkZfai="https://bscscan.com/token/0x205cD59eEA8e8c5083f16D20e1050fD4a7d72037"
      profile={{
        username: profile?.username,
        image: profile?.nft ? undefined : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
