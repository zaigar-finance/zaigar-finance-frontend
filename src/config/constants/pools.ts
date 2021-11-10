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
    tokenPerBlock: '0.40',
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
