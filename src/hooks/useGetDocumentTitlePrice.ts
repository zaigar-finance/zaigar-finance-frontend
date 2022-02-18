import { useEffect } from 'react'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'

const useGetDocumentTitlePrice = () => {
  const cakePriceBusd = useCakeBusdPrice()
  useEffect(() => {
    const cakePriceBusdString = cakePriceBusd ? cakePriceBusd.toFixed(4) : ''
    document.title = `Zaigar Finance - ${cakePriceBusdString}`
  }, [cakePriceBusd])
}
export default useGetDocumentTitlePrice
