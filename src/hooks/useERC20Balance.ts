import { RPC_URL } from 'config'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { getStandardERC20Contract } from 'utils/contractHelpers'

const useERC20Balance = (account: any, erc20: any) => {
  const [erc20Balance, setERC20Balance] = useState(0)

  useEffect( () => {
    const fetchBNBBalance = async (account: string, erc20: string) => {
        const contract = getStandardERC20Contract(erc20)
        const _balance = ethers.utils.formatEther(await contract.methods.balanceOf(account).call())
        setERC20Balance(Number(_balance))
    }
    if(account && erc20) {
        fetchBNBBalance(account, erc20)
    }
  }, [account, erc20])

  return erc20Balance
}

export default useERC20Balance