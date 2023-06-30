import React from "react";
import { Tab } from "@headlessui/react";
import { personNames } from "contains/fakeData";
import Avatar from "shared/Avatar/Avatar";
import VerifyIcon from "components/VerifyIcon";
import { useParams } from "react-router-dom";
import { formatAddress } from "utils/formatHelper";
import collectionPng from "images/nfts/collection.png";

interface Props {
  bidHistory: any
  saleHistory: any
}

const TabDetail: React.FC<Props> = ({bidHistory, saleHistory}) => {
  const TABS = ["Bid History", "Sale History"];
  const renderTabBidHistory = () => {
    return (
      <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
        {bidHistory && bidHistory.length > 0 && bidHistory.map((item: any, index: any) => (
          <li
            key={index}
            className={`relative py-4 ${
              index % 2 === 1 ? "bg-neutradl-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Avatar imgUrl={collectionPng} sizeClass="h-10 w-10" radius="rounded-full" />
              <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="flex items-center text-sm">
                  <span className="">
                    {`Placed a bid ${item.price} ETH by`}
                  </span>
                  {/* <span className="">
                      {Math.random() > 0.5 ? "Listed by" : "Minted by"}
                    </span> */}

                  <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1">
                    {formatAddress(item.bidder)}
                  </span>
                </span>
                <span className="text-xs mt-1">{item.createdAt}</span>
              </span>
            </div>
          </li>
        ))}
        {(!bidHistory || bidHistory.length === 0) && <div className="w-full text-center p-5">
          Nothing to display
        </div>}
      </ul>
    );
  };

  const renderTabProvenance = () => {
    return (
      <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
        {saleHistory && saleHistory.length > 0 && saleHistory.map((item: any, index: number) => (
          <li
            key={index}
            className={`relative py-4 ${
              index % 2 === 1 ? "bg-neutradl-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Avatar imgUrl={collectionPng} sizeClass="h-10 w-10" radius="rounded-full" />
              <span className="ml-4 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="flex items-center text-sm">
                  <span className="">
                    {`${formatAddress(item.seller)} sold this for $${item.paidAmount} to `}
                  </span>

                  <span className="font-medium text-neutral-900 dark:text-neutral-200 ml-1">
                    {`${formatAddress(item.buyer)}`}
                  </span>
                </span>
                <span className="text-xs mt-1">{item.createdAt}</span>
              </span>
            </div>

            <span className="absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2 ring-blue-400"></span>
          </li>
        ))}
        {(!saleHistory || saleHistory.length === 0) && <div className="w-full text-center p-5">
          Nothing to display
        </div>}
      </ul>
    );
  };

  // const renderTabOwner = () => {
  //   return (
  //     <div className="flex items-center py-4">
  //       <Avatar sizeClass="h-11 w-11" radius="rounded-full" />
  //       <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
  //         <span className="text-sm">Owner</span>
  //         <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
  //           <span>{personNames[1]}</span>
  //           <VerifyIcon iconClass="w-4 h-4" />
  //         </span>
  //       </span>
  //     </div>
  //   );
  // };

  const renderTabItem = (item: string) => {
    switch (item) {
      case "Bid History":
        return renderTabBidHistory();

      case "Sale History":
        return renderTabProvenance();

      // case "Owner":
      //   return renderTabOwner();

      default:
        return null;
    }
  };

  return (
    <div className="w-full pdx-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex justify-start pd-1 space-x-2.5 rounded-full bordedr border-neutral-300 dark:border-neutral-500">
          {TABS.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-full focus:outline-none focus:ring-2 ring-primary-300 ${
                  selected
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                    : "text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {TABS.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={
                "rounded-xl focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 "
              }
            >
              {renderTabItem(tab)}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabDetail;
