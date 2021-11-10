import { Bet, BetPosition } from 'state/types'
import { formatNumber } from 'utils/formatBalance'

export const formatUsd = (usd: number) => {
  return `$${formatNumber(usd || 0, 4, 4)}`
}

export const formatBnb = (bnb: number) => {
  return bnb ? bnb.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 }) : '0'
}

export const getMultiplier = (total: number, amount: number) => {
  if (total === 0 || amount === 0) {
    return 0
  }
  
  return total / amount
}

export const getMultiplierv4 = (total: number, amount: number) => {
  if (total === 0 || amount === 0) {
    return 0
  }
  
  const finalaccount = total / amount
  const subtractFee = finalaccount*5/100

  return finalaccount - subtractFee 
}

/**
 * Calculates the total payout given a bet
 */
export const getPayout = (bet: Bet, rewardRate = 1) => {
  if (!bet || !bet.round) {
    return 0
  }

  const { bullAmount, bearAmount, totalAmount } = bet.round
  const multiplier = getMultiplier(totalAmount, bet.position === BetPosition.BULL ? bullAmount : bearAmount)
  return bet.amount * multiplier * rewardRate
}

export const getNetPayout = (bet: Bet, rewardRate = 1): number => {
  if (!bet || !bet.round) {
    return 0
  }

  const payout = getPayout(bet, rewardRate)
  return payout - bet.amount
}
