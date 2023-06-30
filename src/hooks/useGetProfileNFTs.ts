import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { SUBGRAPH_URL } from "config"
import { get2durl, getDescription, getNFTName } from "config/nfts"
import { ethers } from "ethers"
import { bidAuctionHistoryQuery, bidNonAuctionHistoryQuery, mintedOriginsQuery, originItemQuery, ownedOriginsQuery, saleHistoryQuery } from "queries/query"
import { useEffect, useState } from "react"
import { NFTData } from "state/marketplace"
import { getOriginAddress } from "utils/addressHelpers"

export const useGetProfileNFTs = (account: string | undefined) => {
    const [ownedLoading, setOwnedLoading] = useState<"idle" | "loaded" | "failed">("idle")
    const [mintedLoading, setMintedLoading] = useState<"idle" | "loaded" | "failed">("idle")
    const [ownedNFTs, setOwnedData] = useState<NFTData[]>([])
    const [mintedNFTs, setMintedData] = useState<NFTData[]>([])
    const [auctionNFTs, setAuctionData] = useState<NFTData[]>([])
    const [listedNFTs, setListedData] = useState<NFTData[]>([])

    useEffect(() => {
        const fetchOwnedNFTData = async (account: string) => {
            let _origins: NFTData[] = [];
            setOwnedLoading("idle")
            try{
              const client = new ApolloClient({
                uri: SUBGRAPH_URL,
                cache: new InMemoryCache(),
              });
            
              const { data: result, error: error } = await client.query({
                query: gql(ownedOriginsQuery),
                variables: {
                //   first: 1000,
                //   skip: 0,
                    owner: account
                },
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
                setOwnedData(_origins)
                setAuctionData(_origins.filter((item: any) => item.isAuction))
                setListedData(_origins.filter((item: any) => !item.isAuction && item.listOrAuctionStartPrice > 0))
                setOwnedLoading("loaded")
              }
            } catch (error) {
              console.error(error)
              setOwnedLoading("failed")
            }
        }
        const fetchMintedNFTData = async (account: string) => {
            let _origins: NFTData[] = [];
            setMintedLoading("idle")
            try{
              const client = new ApolloClient({
                uri: SUBGRAPH_URL,
                cache: new InMemoryCache(),
              });
            
              const { data: result, error: error } = await client.query({
                query: gql(mintedOriginsQuery),
                variables: {
                //   first: 1000,
                //   skip: 0,
                    creator: account
                },
                fetchPolicy: "cache-first",
              });
            
              if (result && !error) {
                _origins = result.origins.map((item: any) => {
                  const name = ""
                  const description = ""
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
                setMintedData(_origins)
                setMintedLoading("loaded")
              }
            } catch (error) {
              console.error(error)
              setMintedLoading("failed")
            }
        }
        if(account) {
            fetchOwnedNFTData(account)
            fetchMintedNFTData(account)
        }
    }, [account])

    return {
      ownedNFTs: ownedNFTs, 
      mintedNFTs: mintedNFTs, 
      auctionNFTs: auctionNFTs, 
      listedNFTs: listedNFTs, 
      mintedLoading: mintedLoading, 
      ownedLoading: ownedLoading
    }
}