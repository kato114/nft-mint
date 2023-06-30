
import React, { useEffect, useState } from "react"
import ButtonPrimary from "shared/Button/ButtonPrimary"
import ModalBidAuction from "components/ModalBidAuction"
import { useGetWinnerInAuction } from "hooks/useGetWinnerInAuction"
import { useParams } from "react-router-dom"
import { useWeb3Context } from "hooks/useWeb3Context"
import { toast } from "react-hot-toast"
import { callEndAuction } from "utils/calls"
import { formatETH2USD } from "utils/formatHelper"
import { useETHPrice } from "hooks/useETHPrice"

interface Props {
    data: any
    reload: boolean
    setReload: (reload: boolean) => void
}

const UserAuctionSection: React.FC<Props> = ({data, reload, setReload}) => {
  const params = useParams()
  const ethPrice = useETHPrice()
  const web3Context = useWeb3Context()
  const winner = useGetWinnerInAuction(params.collection, params.id, web3Context?.account)

  const [isShowBidAuction, setIsShowBidAuction] = useState(false);
  const openModalBidAuction = () => setIsShowBidAuction(true);
  const closeModalBidAuction = () => setIsShowBidAuction(false);

  const handleBidAuction = () => {
    if(Date.now() > data.auctionEndTime * 1000) {
        toast.error("Auction was already ended.")
        return
    }
    openModalBidAuction()
  }

  const handleWithdraw = async () => {
    const result = await callEndAuction(web3Context, params.collection, params.id)
    if(result) setReload(!reload)
  }
  
  return (
    <div className="pb-9 pt-14">
      <ModalBidAuction show={isShowBidAuction} onCloseModalBidAuction={closeModalBidAuction}  reload={reload} setReload={setReload}/>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1 flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative m-2">
          <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
            Current Price
          </span>
          <span className="text-3xl xl:text-4xl font-semibold text-green-500">
            {data.highestBidPrice > 0? data.highestBidPrice : data.listOrAuctionStartPrice} ETH
          </span>
          <span className="text-lg text-neutral-400 sm:ml-5">
            (≈ ${formatETH2USD(data.highestBidPrice > 0? data.highestBidPrice : data.listOrAuctionStartPrice, ethPrice)}) 
          </span>
        </div>          
        
        {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-5 mt-2 sm:mt-0 sm:ml-10">
          [96 in stock]
        </span> */}
      </div>

      <div className="mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <ButtonPrimary onClick={Date.now() > data.auctionEndTime * 1000 && winner === "Winner" ? handleWithdraw : handleBidAuction} className="flex-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 12H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="ml-2.5">{Date.now() > data.auctionEndTime * 1000 && winner === "Winner" ? "Withdraw NFT" : "Bid on Auction"}</span>
        </ButtonPrimary>
      </div>
    </div>
  )
  }

export default UserAuctionSection