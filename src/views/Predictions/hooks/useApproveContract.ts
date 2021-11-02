import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { usePredictionsContract } from 'hooks/useContract'

const useApprovePrediction = (lpContract: Contract) => {
  const predictionContract = usePredictionsContract()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await lpContract.approve(predictionContract.address, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [lpContract, predictionContract])

  return { onApprove: handleApprove }
}

export default useApprovePrediction
