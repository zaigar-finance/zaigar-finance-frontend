import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.zfai,
    earningToken: tokens.zfai,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0xec318Dedef59cfEC0Ffa0702D5846BC3f1e37aE4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '3.28', // before 10% 0.40  >> now 41% de 8 > 3.28  >> 41% de 4 > 1.64
    sortOrder: 1,
    isFinished: false,
  },
 /* {
    sousId: 1,
    stakingToken: tokens.zaif,
    earningToken: tokens.zfai,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0xec318Dedef59cfEC0Ffa0702D5846BC3f1e37aE4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '4',
    sortOrder: 1,
    isFinished: false,
  }, */
]

export default pools
