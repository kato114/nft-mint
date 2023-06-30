import { Address } from './types'

export interface NFTConfig {
  nftSymbol: string
  address: Address
}

export const NFT_NUM = 2600
export const REWARD_PER_DAY = 5
export const DAY_SECOND = 15 * 60 // 86400
export const AUTHOR = 'NFT Lambo Club'
export const DAO_FEE = 20
export const MINT_TRANSACTION = '0x175a9bb843c271b135a4ee8316a2affac586e3fe08f005f5415c111b49926fc4'
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
// export const GRAPH_API_URL = 'https://api.studio.thegraph.com/query//nftlamboclub/'
// export const GRAPH_API_URL = 'https://api.studio.thegraph.com/query/34591/nftlamboclub/v0.0.8'
export const GRAPH_API_URL = 'https://api.studio.thegraph.com/query/34591/nftlamboclub_goerli/0.0.1'

export const IPFS_3D_URL = 'QmaH9jYV43rbXhN8Y9KQwE76X9BSwkU1jhKLAFq34CjUiN'
export const IPFS_2D_URL = 'QmSvsUJhjg8RRsC2W33W8NHB5yrM9ieJQ6UZGmW9r7rsna'
export const IPFS_BATTLEPASS_URL = 'QmeH78TmRcm2gWxMhsctqUjQkMSeKovcBTL1kBzAzFhqZB'
export const IPFS_CHARACTER_URL = 'QmQyKuqkdYbWoFYKtmCbkMUJbaogk1xgnuUFMy4JzhLQQQ'
export const IPFS_WEAPON_URL = 'QmeH78TmRcm2gWxMhsctqUjQkMSeKovcBTL1kBzAzFhqZB'
export const IPFS_CLOTHES_URL = 'QmeH78TmRcm2gWxMhsctqUjQkMSeKovcBTL1kBzAzFhqZB'

export const get3durl = (id: any) => {
  return `https://gateway.ipfs.io/ipfs/${IPFS_3D_URL}/3d/${id}.glb`
}

export const get2durl = (id: any) => {
  return `https://gateway.ipfs.io/ipfs/${IPFS_2D_URL}/2d/${id}.png`
}

export const getDescription = () => {
  return `BATTLEGROUND ONE rapresents a new mindset that aims to revolutionize the web 3.0 gaming world by providing the most complete, engaging, profitable and sustainable gaming ecosystem ever.`
}

export const getNFTName = (id: any) => {
  return `Origin of BATTLEGROUND ONE #${id}`
}
//    https://gateway.ipfs.io/ipfs/QmQyKuqkdYbWoFYKtmCbkMUJbaogk1xgnuUFMy4JzhLQQQ/2d/1.png