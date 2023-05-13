import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
   {
    pid: 0,
    lpSymbol: 'ZFAI',
    depositFee: 0,
    lpAddresses: {
      97: '0xd58bc8587535241FC1F66B28C06bbC4C263B0f2D',
      56: '0x205cD59eEA8e8c5083f16D20e1050fD4a7d72037',
    },
    isTokenOnly: true,
    tokenAddress: {
      97: '0xd58bc8587535241FC1F66B28C06bbC4C263B0f2D',
      56: '0x205cD59eEA8e8c5083f16D20e1050fD4a7d72037',
    }, 
    token: tokens.zfai,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'ZFAI-BNB LP',
    depositFee: 300,
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0x03340dd153a27e16f3c79fa58b90f7fb13470902',
    },
    tokenAddress: {
      97: '0xd58bc8587535241FC1F66B28C06bbC4C263B0f2D',
      56: '0x205cD59eEA8e8c5083f16D20e1050fD4a7d72037',
    }, 
    token: tokens.zfai,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 8,
    lpSymbol: 'BUSD-BNB LP',
    depositFee: 400,
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    tokenAddress: {
      97: '0xd58bc8587535241FC1F66B28C06bbC4C263B0f2D',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    }, 
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  /**
   * V3 by order of release (some may be out of PID order due to multiplier boost)
   */
    {
      pid: 1,
      lpSymbol: 'ZAIF',
      depositFee: 300,
      lpAddresses: {
        97: '0xd614fa47af78087eff6cd439ceed0c5847e01834',
        56: '0x32C065Da7daFe3CFF90a5fE41FEC1e6D71473Cf8',
      },
      isTokenOnly: true,
      tokenAddress: {
        97: '0xd58bc8587535241FC1F66B28C06bbC4C263B0f2D',
        56: '0x280C3Fc949b1a1D7a470067cA6F7b48b3CB219c5',
      }, 
      token: tokens.zaif,
      quoteToken: tokens.wbnb,
    }, 
   {
    pid: 3,
    lpSymbol: 'ZAIF-BNB LP',
    depositFee: 0,
    lpAddresses: {
      97: '0x620d017bd536cd35d1cf57425e697042d008ba52',
      56: '0x32C065Da7daFe3CFF90a5fE41FEC1e6D71473Cf8',
    },
    tokenAddress: {
      97: '0xd58bc8587535241FC1F66B28C06bbC4C263B0f2D',
      56: '0x280C3Fc949b1a1D7a470067cA6F7b48b3CB219c5',
    }, 
    token: tokens.zaif,
    quoteToken: tokens.wbnb,
  }, 
  {
    pid: 13,
    lpSymbol: 'ZFAI-ZAIF LP',
    depositFee: 0,
    lpAddresses: {
      97: '0x620d017bd536cd35d1cf57425e697042d008ba52',
      56: '0xfa94963a6d6d0a4eaf7a598f098f0f49b76625f0',
    },
    tokenAddress: {
      97: '0xd58bc8587535241FC1F66B28C06bbC4C263B0f2D',
      56: '0x205cD59eEA8e8c5083f16D20e1050fD4a7d72037',
    }, 
    token: tokens.zfai,
    quoteToken: tokens.zaif,
  }, 
  {
    pid: 10,
    lpSymbol: 'ZEFI',
    depositFee: 400,
    lpAddresses: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
      56: '0x09B0123e36A2b0A5b95474455E437e8861a6C61E',
    },
    isTokenOnly: true,
    tokenAddress: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
      56: '0x0288D3E353fE2299F11eA2c2e1696b4A648eCC07',
    },
    token: tokens.zefi,
    quoteToken: tokens.busd,
  }, 
  {
    pid: 11,
    lpSymbol: 'YSOY',
    depositFee: 400,
    lpAddresses: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
      56: '0x541B8508dD127159e39866DaA4d9d4f30B47da61',
    },
    isTokenOnly: true,
    tokenAddress: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
      56: '0x57488Fcc3dC72Edb0a4c06a356c2c43C08BdfB42',
    },
    token: tokens.ysoy,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 12,
    lpSymbol: 'KPY-BNB LP',
    depositFee: 400,
    lpAddresses: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
      56: '0x2223A6aC9989Afa5f2f81eE3ab04EE2cbA768a8e',
    },
    tokenAddress: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
      56: '0x809aeb4f6e6aa968019f791edc4d1d423db4aaca',
    },
    token: tokens.kpy,
    quoteToken: tokens.wbnb,
  },  
  {
    pid: 5,
    lpSymbol: 'WBNB',
    depositFee: 400,
    lpAddresses: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    isTokenOnly: true,
    tokenAddress: {
      97: '0xd58bc8587535241FC1F66B28C06bbC4C263B0f2D',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    }, 
    token: tokens.wbnb,
    quoteToken: tokens.busd,
  },  
   {
    pid: 6,
    lpSymbol: 'BUSD',
    depositFee: 400,
    lpAddresses: {
      97: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    tokenAddress: {
      97: '0xd58bc8587535241FC1F66B28C06bbC4C263B0f2D',
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    }, 
    isTokenOnly: true,
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },  
  {
    pid: 7,
    lpSymbol: 'USDT',
    depositFee: 400,
    lpAddresses: {
      97: '0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684',
      56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    },
    isTokenOnly: true,
    tokenAddress: {
      97: '0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684',
      56: '0x55d398326f99059ff775485246999027b3197955',
    }, 
    token: tokens.usdt,
    quoteToken: tokens.wbnb,
  }, 
  {
    pid: 9,
    lpSymbol: 'BTCB',
    depositFee: 400,
    lpAddresses: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
      56: '0xF45cd219aEF8618A92BAa7aD848364a158a24F33',
    },
    isTokenOnly: true,
    tokenAddress: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    }, 
    token: tokens.btcb,
    quoteToken: tokens.busd,
  }, 
]

export default farms
