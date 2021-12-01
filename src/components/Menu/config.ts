import { MenuEntry } from '@zaigar-finance/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Project Info',
    icon: 'GroupsIcon',
    href: '/about',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/pool',
      },
     /* {
        label: t('LP Migration'),
        href: 'https://v1exchange.pancakeswap.finance/#/migrate',
      }, */
    ],
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: t(' Vaults'),
    icon: 'VaultIcon',
    href: '/vaults',
  }, 
  {
    label: t('Zai Options'),
    icon: 'PredictionsIcon',
    href: '/options/0x0',
  }, 
/*  {
    label: t('Lottery'),
    icon: 'TicketIcon',
    href: '/lottery',
  }, */
 /* {
    label: t('Collectibles'),
    icon: 'NftIcon',
    href: '/collectibles',
  }, */
 /* {
    label: t('Team Battle'),
    icon: 'TeamBattleIcon',
    href: '/competition',
  }, */
 /* {
    label: t('Teams & Profile'),
    icon: 'GroupsIcon',
    items: [
      {
        label: t('Leaderboard'),
        href: '/teams',
      },
      {
        label: t('Task Center'),
        href: '/profile/tasks',
      },
      {
        label: t('Your Profile'),
        href: '/profile',
      },
    ],
  }, */
  {
    label: 'Bounty Campaign',
    icon: 'TeamBattleIcon',
    href: 'https://bitcointalk.org/index.php?topic=5373501.0',
  },
  {
    label: 'Charts',
    icon: 'InfoIcon',
    items: [
    //  {
     //   label: 'CoinMarketCap',
    //    href: 'https://coinmarketcap.com/currencies/zaigar-finance/',
    //  },
      {
        label: 'ZFAI-Price Chart',
        href: 'https://dex.guru/token/0x205cD59eEA8e8c5083f16D20e1050fD4a7d72037-bsc',
      },      
      {
        label: 'ZFAI-PancakeSwap',
        href: 'https://pancakeswap.info/token/0x205cD59eEA8e8c5083f16D20e1050fD4a7d72037',
      },     
      {
        label: 'ZAIF-Price Chart',
        href: 'https://dex.guru/token/0x280c3fc949b1a1d7a470067ca6f7b48b3cb219c5-bsc',
      },      
      {
        label: 'ZAIF-PancakeSwap',
        href: 'https://pancakeswap.info/token/0x280C3Fc949b1a1D7a470067cA6F7b48b3CB219c5',
      },
  //    {
 //       label: 'Add to Metamask',
 //       href: 'https://bit.ly/3sSDdrB',
 //     },    
    ],
  },
/* {
    label: t('IFO'),
    icon: 'IfoIcon',
    href: '/ifo',
  }, */
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Whitepaper(EN)',
        href: 'https://zaigar.finance/ZaigarFinancewpenglish.pdf',
      },
      {
        label: 'Whitepaper(PT)',
        href: 'https://zaigar.finance/ZaigarFinancewpportuguese.pdf',
      },
      {
        label: 'zaigar.com',
        href: 'https://zaigar.com',
      },
    ],
  },
  {
    label: 'Docs',
    icon: 'GitbookIcon',
    href: 'https://docs.zaigar.finance/',
  },
  {
    label: 'GitHub',
    icon: 'GithubIcon',
    href: 'https://github.com/zaigar-finance/',
  },
  {
    label: 'Audit By TechRate',
    icon: 'AuditIcon',
    href: 'https://zaigar.finance/ZaigarFinanceTechRateAudit.pdf',
  }, 
]

export default config
