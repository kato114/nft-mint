
import { useIsApprovedERC721 } from "hooks/useIsApproved"
import { useWeb3Context } from "hooks/useWeb3Context"
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import ButtonPrimary from "shared/Button/ButtonPrimary"
import ButtonSecondary from "shared/Button/ButtonSecondary"
import { getMarketplaceAddress } from "utils/addressHelpers"
import { callApprovalForAllERC721 } from "utils/calls"
import ModalList from "components/ModalList"
import ModalEdit from "components/ModalEdit"
import ModalCancelListing from "components/ModalCancelListing"
import ModalAcceptBid from "components/ModalAcceptBid"
import ModalAuction from "components/ModalAuction"
import { formatETH2USD } from "utils/formatHelper"
import { useETHPrice } from "hooks/useETHPrice"

interface Props {
    data: any
    reload: boolean
    setReload: (reload: boolean) => void
}

const OwnerListSection: React.FC<Props> = ({data, reload, setReload}) => {
  console.log("sniper: data: ", data)
  const web3Context = useWeb3Context();
  const params = useParams()
  const ethPrice = useETHPrice()
  const [reloadApproval, setReloadApproval] = useState(false)
  const isApproved = useIsApprovedERC721(web3Context?.account, params.collection, getMarketplaceAddress(), reloadApproval)

  const [isShowAuction, setIsShowAuction] = useState(false);
  const [isShowAcceptBid, setIsShowAcceptBid] = useState(false);
  const [isShowList, setIsShowList] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowCancelListing, setIsShowCancelListing] = useState(false);

  const openModalList = () => setIsShowList(true);
  const closeModalList = () => setIsShowList(false);
  const openModalEdit = () => setIsShowEdit(true);
  const closeModalEdit = () => setIsShowEdit(false);
  const openModalCancelListing = () => setIsShowCancelListing(true);
  const closeModalCancelListing = () => setIsShowCancelListing(false);
  const openModalAuction = () => setIsShowAuction(true);
  const closeModalAuction = () => setIsShowAuction(false);
  const openModalAcceptBid = () => setIsShowAcceptBid(true);
  const closeModalAcceptBid = () => setIsShowAcceptBid(false);

  
  const handleListItem = () => {
    openModalList()
  }
  const handleEditItem = () => {
    openModalEdit()
  }
  const handleCancelListing = () => {
    openModalCancelListing()
  }
  const handleAcceptBid = () => {
    openModalAcceptBid()
  }
  const handleAuctionItem = () => {
    openModalAuction()
  }
  const handleCancelAuction = () => {

  }
  const handleApprove = async () => {
    await callApprovalForAllERC721(web3Context, params.collection, getMarketplaceAddress())
    setReloadApproval(!reloadApproval)
  }

  return (
    <div className="pb-9 pt-14">
      <ModalList show={isShowList} onCloseModalList={closeModalList} reload={reload} setReload={setReload}/>
      <ModalAuction show={isShowAuction} onCloseModalAuction={closeModalAuction} reload={reload} setReload={setReload}/>
      <ModalEdit show={isShowEdit} onCloseModalEdit={closeModalEdit} reload={reload} setReload={setReload}/>
      <ModalCancelListing show={isShowCancelListing} onCloseModalCancelListing={closeModalCancelListing} reload={reload} setReload={setReload}/>
      <ModalAcceptBid show={isShowAcceptBid} onCloseModalAcceptBid={closeModalAcceptBid} reload={reload} setReload={setReload}/>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1 flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative m-2">
          <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
            Listing Price
          </span>
          <span className="text-3xl xl:text-4xl font-semibold text-green-500">
            {data.listOrAuctionStartPrice} ETH
          </span>
          <span className="text-lg text-neutral-400 sm:ml-5">
          (≈ ${formatETH2USD(data.listOrAuctionStartPrice, ethPrice)}) 
          </span>
        </div>          
        
        {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-5 mt-2 sm:mt-0 sm:ml-10">
          [96 in stock]
        </span> */}
      </div>

      {isApproved && <div className="mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <ButtonPrimary onClick={data.listOrAuctionStartPrice === 0? handleListItem : handleEditItem} className="flex-1">
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

          <span className="ml-2.5">{data.listOrAuctionStartPrice === 0? "List Item" : "Edit Listing Price"}</span>
        </ButtonPrimary>
        <ButtonSecondary onClick={data.listOrAuctionStartPrice === 0? handleAuctionItem : handleCancelListing} className="flex-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">  openModalCancelListing()
            <path
              d="M8.57007 15.27L15.11 8.72998"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.98001 10.3699C9.65932 10.3699 10.21 9.81923 10.21 9.13992C10.21 8.46061 9.65932 7.90991 8.98001 7.90991C8.3007 7.90991 7.75 8.46061 7.75 9.13992C7.75 9.81923 8.3007 10.3699 8.98001 10.3699Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.52 16.0899C16.1993 16.0899 16.75 15.5392 16.75 14.8599C16.75 14.1806 16.1993 13.6299 15.52 13.6299C14.8407 13.6299 14.29 14.1806 14.29 14.8599C14.29 15.5392 14.8407 16.0899 15.52 16.0899Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-2.5">{data.listOrAuctionStartPrice === 0? "Create Auction" : "Cencel Listing"}</span>
        </ButtonSecondary>
      </div>}

      {!isApproved && <div className="mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <ButtonPrimary onClick={handleApprove} className="flex-1">
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

          <span className="ml-2.5">Enable Origin to List</span>
        </ButtonPrimary>
      </div>}

      
      {data.highestBidPrice > 0 && <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-12">
        <div className="flex-1 flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative m-2">
          <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
            Highest Bid Price
          </span>
          <span className="text-3xl xl:text-4xl font-semibold text-green-500">
            {data.highestBidPrice} ETH
          </span>
          <span className="text-lg text-neutral-400 sm:ml-5">
            (≈ ${formatETH2USD(data.highestBidPrice, ethPrice)}) 
          </span>
        </div>          
        
        {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-5 mt-2 sm:mt-0 sm:ml-10">
          [96 in stock]
        </span> */}
      </div>}

      {data.highestBidPrice > 0 && isApproved && <div className="mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <ButtonPrimary onClick={handleAcceptBid} className="flex-1">
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

          <span className="ml-2.5">Accept a bid</span>
        </ButtonPrimary>
      </div>}
      {data.highestBidPrice > 0 && !isApproved && <div className="mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <ButtonPrimary onClick={handleApprove} className="flex-1">
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

          <span className="ml-2.5">Enable Origin to Accept</span>
        </ButtonPrimary>
      </div>}
    </div>
  )
  }

export default OwnerListSection