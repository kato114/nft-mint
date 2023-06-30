import { ZERO_ADDRESS } from "config"
import { zeroAddress } from "ethereumjs-util"
import { useEffect, useState } from "react"
import { getMarketplaceContract } from "utils/contractHelpers"

export const useGetWinnerInAuction = (collection: any, id: any, account: any) => {
  const [winner, setWinner] = useState<"Winner" | "Non" | "NoWinner">("Non")
  useEffect(() => {
    const fetchWinner = async (collection: string, id: number, account: string) => {
        try {
            const contract = getMarketplaceContract()
            const result = await contract.methods.nftInfoForAuction(collection, id).call()
            if(result.highestBidAddress.toString().toLowerCase() === account.toLowerCase()) {
                setWinner("Winner")
            } else if(result.highestBidAddress.toString().toLowerCase() === ZERO_ADDRESS) {
                setWinner("NoWinner")
            } else {
                setWinner("Non")
            }
        } catch (error) {
            console.error(error)
        }
    }
    if(collection && id && account) {
        fetchWinner(collection, Number(id), account)
    }
  }, [account, collection, id])
  return winner
}