import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'Trade anything. No registration, no hassle.',
  bodyText: 'Trade any token on Binance Smart Chain in seconds, just by connecting your wallet. On a trustless and decentralized way',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.zaigar.finance/',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: 'BNB', alt: 'BNB token' },
      { src: 'BTC', alt: 'BTC token' },
      { src: 'ZFAI', alt: 'ZFAI token' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: 'Earn passive income while you sleep.',
  bodyText: 'Use Zaigar Finance to grow your crypto portfolio even when you are sleeping.',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Explore',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.zaigar.finance/products/farms',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'pig', alt: 'Pig bank' },
      { src: 'yield', alt: 'Yield ZFAI' },
      { src: 'coinup', alt: 'Coin up' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: 'ZFAI is the gem of the platform.',
  bodyText:
    'ZFAI token is the heart of Zaigar ecosystem. Buy it, win it, farm it, spend it, stake it.',
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0x205cD59eEA8e8c5083f16D20e1050fD4a7d72037',
    text: 'Buy ZFAI',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.zaigar.finance/tokens/zfai',
    text: 'Learn',
    external: true,
  },

  images: {
    path: '/images/home/cake/',
    attributes: [
      { src: 'bottom-right', alt: 'Small 3d star' },
      { src: 'top-right', alt: 'Small 3d star' },
      { src: 'coin', alt: 'ZFAI token' },
      { src: 'top-left', alt: 'Small 3d star' },
    ],
  },
}

export const zaifSectionData: SalesSectionProps = {
  headingText: 'ZAIF for store of value and governance.',
  bodyText:
    'ZAIF token is our highly limited and deflationary currency with automatic rewards for holders and constant marketing',
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0x280c3fc949b1a1d7a470067ca6f7b48b3cb219c5  ',
    text: 'Buy ZAIF',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.zaigar.finance/tokens/zaif',
    text: 'Learn',
    external: true,
  },

  images: {
    path: '/images/home/zaif/',
    attributes: [
      { src: 'bottom-right', alt: 'Small 3d star' },
      { src: 'top-right', alt: 'Small 3d star' },
      { src: 'coin', alt: 'ZAIF token' },
      { src: 'top-left', alt: 'Small 3d star' },
    ],
  },
}
