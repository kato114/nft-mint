import { useEffectOnce } from "hooks/useEffectOnce"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "state/hooks"
import { fetchNFTDataAsync, updateMarketplaceItemPrice } from "."

export const useMarketplaceData = () => {
  const dispatch = useAppDispatch()
  
  // useEffectOnce(() => {
  //   dispatch(fetchNFTDataAsync())
  // })

  useEffect(() => {
    dispatch(fetchNFTDataAsync())
  }, [dispatch])
}

export function useMarketplaceDataFromStore() {
  const data = useSelector((state: any) => state.marketplace)
  return data
}

export const useMarketplaceItemPrice = (id: number, price: number) => {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
      const updateItemPrice = async (id: number, price: number) => {
        const ret = {id, price}
        dispatch(updateMarketplaceItemPrice({item: ret}))
      }
      if (id && price) {
        updateItemPrice(id, price)
      }
    }, [id, dispatch, price])
  }
  