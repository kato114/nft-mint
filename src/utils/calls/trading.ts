import { CHAIN } from 'config'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import { getMarketplaceContract, getStandardERC20Contract, getStandardERC721Contract } from '../contractHelpers'

export const callApprovalForAllERC721 = async (web3Context: any, erc721: any, operator: string) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  try {
    const contract = getStandardERC721Contract(erc721, web3Context.provider)
    await contract.methods
      .setApprovalForAll(operator, true)
      .send({ from: web3Context.account })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}

export const callApprovalForAllERC20 = async (web3Context: any, erc20: any, operator: string) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  try {
    const contract = getStandardERC20Contract(erc20, web3Context.provider)
    await contract.methods
      .approve(operator, ethers.constants.MaxUint256)
      .send({ from: web3Context.account })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}

export const callList = async (web3Context: any, collection: any, id: any, price: any) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  try {
    const marketplace = getMarketplaceContract(web3Context.provider)
    await marketplace.methods
      .listItemForSale(collection, id, ethers.utils.parseEther(price.toString()))
      .send({ from: web3Context.account })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}

export const callEdit = async (web3Context: any, collection: any, id: any, price: any) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  try {
    const marketplace = getMarketplaceContract(web3Context.provider)
    await marketplace.methods
      .editItemForSale(collection, id, ethers.utils.parseEther(price.toString()))
      .send({ from: web3Context.account })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}

export const callCancelListing = async (web3Context: any, collection: any, id: any) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  try {
    const marketplace = getMarketplaceContract(web3Context.provider)
    await marketplace.methods
      .cancelItemForSale(collection, id)
      .send({ from: web3Context.account })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}

export const callBuy = async (web3Context: any, collection: any, id: any, price: any) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  try {
    const marketplace = getMarketplaceContract(web3Context.provider)
    await marketplace.methods
      .buyForListedItem(collection, id)
      .send({ from: web3Context.account, value: ethers.utils.parseEther(price.toString()) })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}


export const callOffer = async (web3Context: any, collection: any, id: any, price: any) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  if(Number(price) <= 0) {
    toast.error("Invalid Bid Price.")
    return false
  }
  
  try {
    const marketplace = getMarketplaceContract(web3Context.provider)
    await marketplace.methods
      .bidOnNonAuctionItem(collection, id, ethers.utils.parseEther(price.toString()))
      .send({ from: web3Context.account })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}

export const callAcceptBid = async (web3Context: any, collection: any, id: any, index: any) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  try {
    const marketplace = getMarketplaceContract(web3Context.provider)
    await marketplace.methods
      .acceptBid(collection, id, index)
      .send({ from: web3Context.account })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}

export const callCreateAuction = async (web3Context: any, collection: any, id: any, startPrice: any, auctionPeriod: any) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  if(Number(startPrice) <= 0) {
    toast.error("Invalid Starting Price.")
    return false
  }
  
  if(Number(auctionPeriod) <= 0) {
    toast.error("Invalid End Time.")
    return false
  }
  
  try {
    const marketplace = getMarketplaceContract(web3Context.provider)
    await marketplace.methods
      .createAuction(collection, id, ethers.utils.parseEther(startPrice.toString()), Number(auctionPeriod))
      .send({ from: web3Context.account })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}

export const callBidAuction = async (web3Context: any, collection: any, id: any, price: any) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  if(Number(price) <= 0) {
    toast.error("Invalid Price.")
    return false
  }
  
  try {
    const marketplace = getMarketplaceContract(web3Context.provider)
    await marketplace.methods
      .bidOnAuction(collection, id)
      .send({ from: web3Context.account, value: ethers.utils.parseEther(price.toString()) })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}

export const callEndAuction = async (web3Context: any, collection: any, id: any) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  try {
    const marketplace = getMarketplaceContract(web3Context.provider)
    await marketplace.methods
      .endAuction(collection, id)
      .send({ from: web3Context.account })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}

export const callCancelAuction = async (web3Context: any, collection: any, id: any) => {
  if(!web3Context?.provider || !web3Context?.account) {
    toast.error("Confirm your wallet connection.")
    return false
  }
  if(web3Context?.chainId !== CHAIN) {
    toast.error("Confirm You are in Goerli Network.")
    return false
  }

  if(web3Context?.chainId !== CHAIN) {
    toast.error("Make sure you are in Ethereum.")
    return false
  }
  
  try {
    const marketplace = getMarketplaceContract(web3Context.provider)
    await marketplace.methods
      .cancelAuction(collection, id)
      .send({ from: web3Context.account })
    toast.success("Transaction Success!")
    return true
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong.")
    return false
  }
}
