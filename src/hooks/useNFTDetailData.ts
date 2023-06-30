import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { SUBGRAPH_URL } from "config"
import { get2durl, getDescription, getNFTName } from "config/nfts"
import { ethers } from "ethers"
import { bidAuctionHistoryQuery, bidNonAuctionHistoryQuery, originItemQuery, saleHistoryQuery } from "queries/query"
import { useEffect, useState } from "react"
import { getOriginAddress } from "utils/addressHelpers"

export const useNFTDetailData = (collection: string | undefined, id: string | undefined, reload: boolean) => {
    const [dataLoading, setDataLoading] = useState<"idle" | "loaded" | "failed">("idle")
    const [saleLoading, setSaleLoading] = useState<"idle" | "loaded" | "failed">("idle")
    const [bidLoading, setBidLoading] = useState<"idle" | "loaded" | "failed">("idle")
    const [data, setData] = useState({
        id: 0,
        name: "",
        description: "",
        image: "",
        collection: "",
        creator: "",
        mintHash: "",
        owner: "",
        collectionName: "",
        isAuction: false,
        listOrAuctionStartPrice: 0,
        highestBidPrice: 0,
        saleCreateTime: 0,
        auctionEndTime: 0,
        battlePassLevel: 0,
        battlePassPrice: 0,
        characterLevel: 0,
        characterPrice: 0,
        clothesLevel: 0,
        clothesPrice: 0,
        weaponLevel: 0,
        weaponPrice: 0,
        totalVolume: 0,
        createdAt: 0,
    })
    const [saleHistory, setSaleHistory] = useState([])
    const [bidHistory, setBidHistory] = useState([])

    useEffect(() => {
        const fetchBidHistory = async (id: number, isAuction: boolean, saleCreateTime: number) => {
            try {
                const client = new ApolloClient({
                    uri: SUBGRAPH_URL,
                    cache: new InMemoryCache(),
                });
            
                const { data: result, error: error } = await client.query({
                    query: gql(isAuction? bidAuctionHistoryQuery : bidNonAuctionHistoryQuery),
                    variables: {
                        //   first: 1000,
                        //   skip: 0,
                        tokenId: id,
                    },
                    fetchPolicy: "cache-first",
                });
                if (result && !error) {
                    const result_array = isAuction? result.originBidOnAuctionHistories : result.originBidOnNonAuctionHistories
                    const bids = await result_array.map((item: any) => {
                        return {
                            bidder: item.bidder,
                            price: Number(ethers.utils.formatEther(item.price)),
                            createdAt: Number(item.createdAt)
                        }
                    })
                    return {result: bids, loading: "success"}
                }
                return {result: null, loading: "failed"}
            } catch(error) {
                console.error(error)
                return {result: null, loading: "failed"}
            }
        }
        const fetchSaleHistory = async (id: number) => {
            try {
                const client = new ApolloClient({
                    uri: SUBGRAPH_URL,
                    cache: new InMemoryCache(),
                });
            
                const { data: result, error: error } = await client.query({
                    query: gql(saleHistoryQuery),
                    variables: {
                        //   first: 1000,
                        //   skip: 0,
                        tokenId: id,
                    },
                    fetchPolicy: "cache-first",
                });
                if (result && !error) {
                    const sales = await result.originSaleHistories.map((item: any) => {
                        return {
                            seller: item.seller,
                            buyer: item.buyer,
                            paidAmount: Number(ethers.utils.formatEther(item.paidAmount)),
                            createdAt: Number(item.createdAt)
                        }
                    })
                    return {result: sales, loading: "success"}
                }
                return {result: null, loading: "failed"}
            } catch(error) {
                console.error(error)
                return {result: null, loading: "failed"}
            }
        }
        const fetchNFTDetailData =async (id: number) => {
            try {
                const client = new ApolloClient({
                    uri: SUBGRAPH_URL,
                    cache: new InMemoryCache(),
                });
            
                const { data: result, error: error } = await client.query({
                    query: gql(originItemQuery),
                    variables: {
                        //   first: 1000,
                        //   skip: 0,
                        tokenId: id,
                    },
                    fetchPolicy: "cache-first",
                });
                if (result && !error) {
                    const _origin = await result.origins.map((item: any) => {
                        const name = getNFTName(item.tokenId)
                        const description = getDescription()
                        const image = get2durl(item.tokenId)
                        return {
                            id: Number(item.tokenId),
                            name: name,
                            description: description,
                            image: image,
                            creator: item.creator,
                            mintHash: item.mintHash,
                            owner: item.owner,
                            collection: getOriginAddress(),
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
                    if(_origin && _origin.length > 0) {
                        return {result: _origin[0], loading: "success"}
                    } else {
                        return {result: null, loading: "failed"}
                    }
                }
                return {result: null, loading: "failed"}
            } catch(error) {
                console.error(error)
                return {result: null, loading: "failed"}
            }
        }
        const fetchData = async (collection: string, id: number) => {
            setDataLoading("idle")
            setSaleLoading("idle")
            setBidLoading("idle")
            const {result: data, loading: data_loading} = await fetchNFTDetailData(id)
            const {result: sales, loading: sale_loading} = await fetchSaleHistory(id)
            if(data_loading === "success") {
                setData(data)
                setDataLoading("loaded")
            } else {
                setDataLoading("failed")
            }
            
            if(sale_loading === "success") {
                setSaleHistory(sales)
                setSaleLoading("loaded")
            } else {
                setSaleLoading("failed")
            }


            if(data_loading === "success") {
                const {result: bids, loading: bid_loading} = await fetchBidHistory(id, data.isAuction, data.saleCreateTime)
                
                if(bid_loading === "success") {
                    setBidHistory(bids)
                    setBidLoading("loaded")
                } else {
                    setBidLoading("failed")
                }

            } else {
                setBidLoading("failed")
            }
        }
        if(collection && id) {
            fetchData(collection, Number(id))
        }
    }, [collection, id, reload])

    return {data: data, saleHistory: saleHistory, bidHistory: bidHistory, dataLoading: dataLoading, saleLoading: saleLoading, bidLoading: bidLoading}
}