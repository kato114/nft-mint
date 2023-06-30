import React, { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import NcImage from "shared/NcImage/NcImage";
import CardNFT from "components/CardNFT";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import collectionBanner from "images/nfts/collectionBanner.png";
import logoGif from "images/logo.gif"
import NftMoreDropdown from "components/NftMoreDropdown";
import ButtonDropDownShare from "components/ButtonDropDownShare";
import TabFilters, { FilterOptions } from "components/TabFilters";
import SectionSliderCollections from "components/SectionSliderCollections";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { useMarketplaceData, useMarketplaceDataFromStore } from "state/marketplace/hooks";

export interface PageCollectionProps {
  className?: string;
}

const PageCollection: FC<PageCollectionProps> = ({ className = "" }) => {
  useMarketplaceData()
  const data = useMarketplaceDataFromStore()

  const [displayNFTs, setDisplayNFTs] = useState([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: {
      min: 0.00,
      max: 10
    },
    saleType: "All",
    sort: "Non"
  })
  useEffect(() => {
    let _displayNFTs = data.nfts.slice()
    if(filterOptions.saleType === "On Auction") {
      _displayNFTs = _displayNFTs.filter((item: any) => item.isAuction)
    }
    if(filterOptions.saleType === "Buy now") {
      _displayNFTs = _displayNFTs.filter((item: any) => !item.isAuction && Number(item.listOrAuctionStartPrice) > 0)
    }

    if(filterOptions.sort === "Recent") {
      _displayNFTs = _displayNFTs.sort((prev: any, next: any) => Number(next.id) - Number(prev.id))
    }
    if(filterOptions.sort === "Price-low-hight") {
      _displayNFTs = _displayNFTs.sort((prev: any, next: any) => {
        const price1 = Number(prev.listOrAuctionStartPrice) > Number(prev.highestBidPrice) ? Number(prev.listOrAuctionStartPrice) : Number(prev.highestBidPrice)
        const price2 = Number(next.listOrAuctionStartPrice) > Number(next.highestBidPrice) ? Number(next.listOrAuctionStartPrice) : Number(next.highestBidPrice)
        return Number(price2) - Number(price1)
      })
    }
    if(filterOptions.sort === "Price-hight-low") {
      _displayNFTs = _displayNFTs.sort((prev: any, next: any) => {
        const price1 = Number(prev.listOrAuctionStartPrice) > Number(prev.highestBidPrice) ? Number(prev.listOrAuctionStartPrice) : Number(prev.highestBidPrice)
        const price2 = Number(next.listOrAuctionStartPrice) > Number(next.highestBidPrice) ? Number(next.listOrAuctionStartPrice) : Number(next.highestBidPrice)
        return Number(price1) - Number(price2)
      })
    }
    setDisplayNFTs(_displayNFTs)
  }, [data, filterOptions])

  return (
    <div
      className={`nc-PageCollection  ${className}`}
      data-nc-id="PageCollection"
    >
      <Helmet>
        <title>BATTLEGROUND ONE</title>
      </Helmet>

      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          <NcImage
            containerClassName="absolute inset-0"
            src={collectionBanner}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative container -mt-14 lg:-mt-20">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row lg:items-center">
            <div className="flex flex-col sm:flex-row md:block items-center sm:justify-between">
              <div className="w-40 sm:w-48 md:w-56 xl:w-60">
                {/* <NcImage
                  src={logoGif}
                  containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
                /> */}
                <img src={logoGif} className="overflow-hidden" alt="logo" />
              </div>
              <div className="mt-4 flex items-center sm:justify-center space-x-3">
                <div className="flex space-x-1.5 text-neutral-700 dark:text-neutral-300">
                  <a
                    href="##"
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
                  >
                    <i className="text-base sm:text-xl lab la-facebook-f"></i>
                  </a>
                  <a
                    href="##"
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
                  >
                    <i className="text-base sm:text-xl lab la-twitter"></i>
                  </a>
                </div>
                <div className="h-5 border-l border-neutral-200 dark:border-neutral-700"></div>
                <div className="flex space-x-1.5">
                  <ButtonDropDownShare
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer "
                    panelMenusClass="origin-top-right !-right-5 !w-40 sm:!w-52"
                  />
                  <NftMoreDropdown
                    actions={[
                      {
                        id: "report",
                        name: "Report abuse",
                        icon: "las la-flag",
                      },
                      {
                        id: "delete",
                        name: "Delete item",
                        icon: "las la-trash-alt",
                      },
                    ]}
                    containerClassName="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:ml-8 xl:ml-14 flex-grow">
              <div className="text-center md:text-left">
                <h2 className="inline-block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                  {"Origin of BATTLEGROUND ONE"}
                </h2>
                <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                    BATTLEGROUND ONE rapresents a new 
                    mindset that aims to revolutionize the web
                    3.0 gaming world by providing the most 
                    complete, engaging, profitable and 
                    sustainable gaming ecosystem ever.
                </span>
              </div>
              <div className="mt-6 xl:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 xl:gap-6">
                {/* ----- 1 ----- */}
                <div className="rounded-2xl flex flex-col items-center justify-center shadow-md border border-neutral-50 dark:border-neutral-800 p-5 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Floor Price
                  </span>
                  <span className="font-medium text-base mt-4 sm:text-xl sm:mt-6">
                    {data.floorPrice}
                  </span>
                  <span className="text-xs text-green-500 mt-1">ETH</span>
                </div>

                {/* ----- Volume ----- */}
                <div className="rounded-2xl flex flex-col items-center justify-center shadow-md border border-neutral-50 dark:border-neutral-800 p-5 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Volume
                  </span>
                  <span className="font-medium text-base mt-4 sm:text-xl sm:mt-6">
                    {data.totalVolume}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    ETH
                  </span>
                </div>
                {/* ----- Latest Price ----- */}
                <div className="rounded-2xl flex flex-col items-center justify-center shadow-md border border-neutral-50 dark:border-neutral-800 p-5 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Owners
                  </span>
                  <span className="font-medium text-base mt-4 sm:text-xl sm:mt-6">
                    {data.owners}
                  </span>
                  <span className="text-xs text-green-500 mt-1">total</span>
                </div>

                {/* -----Items ----- */}
                <div className="rounded-2xl flex flex-col items-center justify-center shadow-md border border-neutral-50 dark:border-neutral-800 p-5 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Items
                  </span>
                  <span className="font-medium text-base mt-4 sm:text-xl sm:mt-6">
                    {data.items}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    total
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-20 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <TabFilters setFilterOptions={setFilterOptions} />

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10  mt-8 lg:mt-10">
            {displayNFTs && displayNFTs.map((item: any, index: any) => (
              <CardNFT data={item} key={index} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
        </main>

        {/* === SECTION 5 === */}
        {/* <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionSliderCollections />
        </div> */}

        {/* SUBCRIBES */}
        {/* <SectionBecomeAnAuthor /> */}
      </div>
    </div>
  );
};

export default PageCollection;
