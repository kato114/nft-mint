import { ethers } from 'ethers'
import Web3 from 'web3'
import { simpleRpcProvider } from 'utils/providers'
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { RPC_URL } from 'config'

// Addresses
import {
  getNFTAddress,
  getStakingAddress,
  getRewardAddress,
  getMulticallAddress1,
  getMulticallAddress2,
  getMulticallAddress3,
  getRegisterAddress,
  getRouterAddress,
  getMarketplaceAddress,
  getOriginAddress,
  getCharacterAddress,
  getClothesAddress,
  getWeaponAddress,
  getBattlePassAddress,
} from 'utils/addressHelpers'

// ABI
import ERC721ABI from 'config/abis/erc721.json'
import ERC20ABI from 'config/abis/erc20.json'
import nft from 'config/abis/nft.json'
import reward from 'config/abis/reward.json'
import NFTStaking from 'config/abis/nftStaking.json'
import MultiCallAbi from 'config/abis/multicall.json'
import RegisterAbi from 'config/abis/register.json'
import RouterABI from 'config/abis/router.json'
import GameAssetABI from 'config/abis/gameasset.json'
import OriginABI from 'config/abis/origin.json'
import MarketplaceABI from 'config/abis/marketplace.json'
import FeedABI from 'config/abis/price_feed.json'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export function getContractWithWeb3(abi: any, address: string, provider: any) {
  const web3 = new Web3(provider)

  return new web3.eth.Contract(abi, address)
}

export const getNFTContract = (provider: any) => {
  return getContractWithWeb3(nft, getNFTAddress(), provider)
}

export const getRewardContract = (provider: any) => {
  return getContractWithWeb3(reward, getRewardAddress(), provider)
}

export const getStakingContract = (provider: any) => {
  return getContractWithWeb3(NFTStaking, getStakingAddress(), provider)
}

export const getMulticallContract1 = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress1(), signer) as any
}

export const getMulticallContract2 = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress2(), signer) as any
}

export const getMulticallContract3 = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress3(), signer) as any
}

export const getRegisterContract = (provider: any) => {
  return getContractWithWeb3(RegisterAbi, getRegisterAddress(), provider)
}

export const getRouterContract = (provider: any) => {
  return getContractWithWeb3(RouterABI, getRouterAddress(), provider)
}

export const getCharacterContract = (provider?: any) => {
  const _provider = provider ?? RPC_URL
  return getContractWithWeb3(GameAssetABI, getCharacterAddress(), _provider)
}
export const getClothesContract = (provider?: any) => {
  const _provider = provider ?? RPC_URL
  return getContractWithWeb3(GameAssetABI, getClothesAddress(), _provider)
}
export const getWeaponContract = (provider?: any) => {
  const _provider = provider ?? RPC_URL
  return getContractWithWeb3(GameAssetABI, getWeaponAddress(), _provider)
}
export const getBattlePassContract = (provider?: any) => {
  const _provider = provider ?? RPC_URL
  return getContractWithWeb3(GameAssetABI, getBattlePassAddress(), _provider)
}
export const getOriginContract = (provider?: any) => {
  const _provider = provider ?? RPC_URL
  return getContractWithWeb3(OriginABI, getOriginAddress(), _provider)
}
export const getMarketplaceContract = (provider?: any) => {
  const _provider = provider ?? RPC_URL
  return getContractWithWeb3(MarketplaceABI, getMarketplaceAddress(), _provider)
}

export const getStandardERC721Contract = (erc721: string, provider?: any) => {
  const _provider = provider ?? RPC_URL
  return getContractWithWeb3(ERC721ABI, erc721, _provider)
}

export const getStandardERC20Contract = (erc20: string, provider?: any) => {
  const _provider = provider ?? RPC_URL
  return getContractWithWeb3(ERC20ABI, erc20, _provider)
}

export const getPriceFeedContract = (priceFeed: string, provider?: any) => {
  const _provider = provider ?? RPC_URL
  return getContractWithWeb3(FeedABI, priceFeed, _provider)
}
