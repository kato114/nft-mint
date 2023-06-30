import { RPC_URL } from 'config'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

const useBNBBalance = (provider: any, account: any) => {
  const [bnbBalance, setBNBBalance] = useState(0)

  useEffect( () => {
    const fetchBNBBalance = async (provider: any, account: any) => {
        const _balance = ethers.utils.formatEther(await ethers.getDefaultProvider(RPC_URL).getBalance(account))
        setBNBBalance(Number(_balance))
    }
    if(provider) {
        fetchBNBBalance(provider, account)
    }
  }, [provider, account])

  return bnbBalance
}

export default useBNBBalance