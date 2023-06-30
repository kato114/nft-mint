import { ethers } from 'ethers'
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { SUBGRAPH_URL } from 'config'
import { originQuery } from 'queries/query'
import { NFTData } from '.'
import { get2durl, getDescription, getNFTName } from 'config/nfts';

export const fetchNFTData = async () => {
  let _origins: NFTData[] = [];
  try{
    const client = new ApolloClient({
      uri: SUBGRAPH_URL,
      cache: new InMemoryCache(),
    });
  
    const { data: result, error: error } = await client.query({
      query: gql(originQuery),
      // variables: {
      //   first: 1000,
      //   skip: 0,
      // },
      fetchPolicy: "cache-first",
    });
  
    if (result && !error) {
      _origins = result.origins.map((item: any) => {
        const name = getNFTName(item.tokenId)
        const description = getDescription()
        const image = get2durl(item.tokenId)
        return {
          id: item.tokenId,
          name: name,
          description: description,
          image: image,
          owner: item.owner,
          isAuction: item.isAuction,
          highestBidPrice: Number(ethers.utils.formatEther(item.highestBidPrice)),
          listOrAuctionStartPrice: Number(ethers.utils.formatEther(item.listOrAuctionStartPrice)),
          saleCreateTime: Number(item.saleCreateTime),
          auctionEndTime: Number(item.auctionEndTime),
          battlePassLevel: Number(item.battlePassLevel),
          battlePassPrice: Number(ethers.utils.formatEther(item.battlePassPrice)),
          characterLevel: Number(item.characterLevel),
          characterPrice: Number(ethers.utils.formatEther(item.characterPrice)),
          clothesLevel: Number(item.clothesLevel),
          clothesPrice: Number(ethers.utils.formatEther(item.clothesPrice)),
          weaponLevel: Number(item.weaponLevel),
          weaponPrice: Number(ethers.utils.formatEther(item.weaponPrice)),
          totalVolume: Number(ethers.utils.formatEther(item.totalVolume)),
          createdAt: Number(item.createdAt)
        }
      })
    }
  } catch (error) {
    console.error(error)
  }

  return _origins
}
