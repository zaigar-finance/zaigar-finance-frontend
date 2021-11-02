import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { formatUsdv2, formatBnbv2 } from 'views/Predictions/helpers'
import { useWeb3React } from '@web3-react/core'
import { getReferralContract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { simpleRpcProvider } from 'utils/providers'
import useRefresh from './useRefresh'
import useLastUpdated from './useLastUpdated'

type UseReferralState = {
  referrerCount: number
  commission: BigNumber
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export const useReferrerCount = () => {
  const { slowRefresh } = useRefresh()
  const [referrerCount, getReferrerCount] = useState<number>()
  const { account } = useWeb3React()

  useEffect(() => {
    async function fetchReferrerCount() {
      const referrerContract = getReferralContract()

      const referralCount = await referrerContract.referralsCount(account)
      getReferrerCount(referralCount.toNumber())
      
    }

    if (account) {
      fetchReferrerCount()
    }
  }, [account,slowRefresh])

  return referrerCount
}

export const useReferralCommission = () => {
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  const [referralCommission, getComission] = useState<string>()

  useEffect(() => {
    const fetchComission = async () => {
      const contract = getReferralContract()
      const res = await contract.totalReferralCommissions(account)
      getComission(formatBnbv2(res))
    }

    if (account) {
      fetchComission()
    }
  }, [account,slowRefresh])

  return referralCommission
}