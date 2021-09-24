import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Zaigar Finance',
  description:
    'Cheaper and faster? Discover Zaigar Finance, the DEX of Zaigar group on Binance Smart Chain (BSC) with the best farms.',
  image: 'https://zaigar.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Zaigar Finance')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Zaigar Finance')}`,
      }
    case '/prediction':
      return {
        title: `${t('Zai Options')} | ${t('Zaigar Finance')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Zaigar Finance')}`,
      }
      case '/vaults':
        return {
          title: `${t('Vaults')} | ${t('Zaigar Finance')}`,
        }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Zaigar Finance')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Zaigar Finance')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('Zaigar Finance')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Zaigar Finance')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Zaigar Finance')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('Zaigar Finance')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('Zaigar Finance')}`,
      }
    default:
      return null
  }
}
