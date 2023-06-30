import React, { FC, useId, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import VerifyIcon from "components/VerifyIcon";
import TimeCountDown from "./TimeCountDown";
import TabDetail from "./TabDetail";
import collectionPng from "images/nfts/collection.png";
import ItemTypeVideoIcon from "components/ItemTypeVideoIcon";
import LikeButton from "components/LikeButton";
import AccordionInfo from "./AccordionInfo";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { useParams } from "react-router-dom";
import { useNFTDetailData } from "hooks/useNFTDetailData";
import { formatAddress, formatETH2USD } from "utils/formatHelper";
import { useWeb3Context } from "hooks/useWeb3Context";
import { useETHPrice } from "hooks/useETHPrice";
import OwnerListSection from "./_components/OwnerListSection";
import UserListSection from "./_components/UserListSection";
import UserAuctionSection from "./_components/UserAuctionSection";
import OwnerAuctionSection from "./_components/OwnerAuctionSection";

export interface NftDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const NftDetailPage: FC<NftDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const web3Context = useWeb3Context()
  const ethPrice = useETHPrice()
  const params = useParams()
  const [reload, setReload] = useState(false)
  const {data, saleHistory, bidHistory, dataLoading, saleLoading, bidLoading} = useNFTDetailData(params.collection, params.id, reload)

  const renderSection1 = () => {
    return (
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {/* ---------- 1 ----------  */}
        <div className="pb-9 space-y-5">
          <div className="flex justify-between items-center">
            <Badge name="Virtual Worlds" color="green" />
            <LikeSaveBtns />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {data.name}
          </h2>

          {/* ---------- 4 ----------  */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
            <div className="flex items-center ">
              <Avatar imgUrl={collectionPng} sizeClass="h-9 w-9" radius="rounded-full" />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Creator</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                  <span>{formatAddress(data.creator)}</span>
                  <VerifyIcon iconClass="w-4 h-4" />
                </span>
              </span>
            </div>
            <div className="hidden sm:block h-6 border-l border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex items-center">
              <Avatar
                imgUrl={collectionPng}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Collection</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                  <span>{formatAddress(data.collection)}</span>
                  <VerifyIcon iconClass="w-4 h-4" />
                </span>
              </span>
            </div>
            <div className="flex items-center">
              <Avatar
                imgUrl={collectionPng}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Owner</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                  <span>{formatAddress(data.owner)}</span>
                  <VerifyIcon iconClass="w-4 h-4" />
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ---------- 6 ----------  */}
        {data && data.isAuction && <div className="py-9">
          <TimeCountDown end={data.auctionEndTime}/>
        </div>}

        {/* ---------- 7 ----------  */}
        {/* PRICE */}
        
        {data.owner.toLowerCase() === web3Context?.account.toLowerCase() && data.isAuction && <OwnerAuctionSection data={data} reload={reload} setReload={setReload}/>}
        {data.owner.toLowerCase() === web3Context?.account.toLowerCase() && !data.isAuction && <OwnerListSection data={data} reload={reload} setReload={setReload}/>}
        {data.owner.toLowerCase() !== web3Context?.account.toLowerCase() && data.isAuction && <UserAuctionSection data={data} reload={reload} setReload={setReload} />}
        {data.owner.toLowerCase() !== web3Context?.account.toLowerCase() && !data.isAuction && <UserListSection data={data} reload={reload} setReload={setReload} />}
        {/* ---------- 9 ----------  */}
        <div className="pt-9">
          <TabDetail bidHistory={bidHistory} saleHistory={saleHistory}/>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-NftDetailPage  ${className}`}
      data-nc-id="NftDetailPage"
    >
      {/* MAIn */}
      <main className="container mt-11 flex ">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {/* CONTENT */}
          <div className="space-y-8 lg:space-y-10">
            {/* HEADING */}
            <div className="relative">
              <NcImage
                src={data.image}
                containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
              />
              {/* META TYPE */}
              <ItemTypeVideoIcon className="absolute left-3 top-3  w-8 h-8 md:w-10 md:h-10" id={data.id} />

              {/* META FAVORITES */}
              {/* <LikeButton className="absolute right-3 top-3 " /> */}
            </div>

            <AccordionInfo data={data}/>
          </div>

          {/* SIDEBAR */}
          <div className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            {renderSection1()}
          </div>
        </div>
      </main>

      {/* OTHER SECTION */}
      {/* {!isPreviewMode && (
        <div className="container py-24 lg:py-32">
          <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <SectionSliderCategories />
          </div>

          <SectionBecomeAnAuthor className="pt-24 lg:pt-32" />
        </div>
      )} */}
    </div>
  );
};

export default NftDetailPage;
