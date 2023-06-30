import { CHAIN } from "config";
import useBNBBalance from "hooks/useBNBBalance";
import { useWeb3Context } from "hooks/useWeb3Context";
import React, { FC, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";
import { callBidAuction } from "utils/calls";

export interface ModalBidAuctionProps {
  show: boolean;
  onCloseModalBidAuction: () => void;
  reload: boolean
  setReload: (reload: boolean) => void
}

const ModalBidAuction: FC<ModalBidAuctionProps> = ({ show, onCloseModalBidAuction, reload, setReload }) => {
  const web3Context = useWeb3Context()
  const textareaRef = useRef(null);
  const params = useParams()
  const ethBalance = useBNBBalance(web3Context?.provider, web3Context?.account)

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
          (element as HTMLTextAreaElement).setSelectionRange(
            (element as HTMLTextAreaElement).value.length,
            (element as HTMLTextAreaElement).value.length
          );
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Bid on Auction
        </h3>
        <span className="text-sm">Are you sure you want to bid?</span>
        <div className="mt-8 relative rounded-md shadow-sm">
          <Input ref={textareaRef} defaultValue={"1.000"} type={"text"} />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">ETH</div>
          {/* <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300 sm:text-sm rounded-md"
            >
              <option>ETH</option>
              <option>BC</option>
              <option>BTH</option>
            </select>
          </div> */}
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary type="button" onClick={handleBidAuctionItem}>Submit</ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalBidAuction}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const handleBidAuctionItem = async () => {
    const element: HTMLTextAreaElement | null = textareaRef.current;
    if (element) {
      const price = (element as HTMLTextAreaElement).value
      if(Number(price) > ethBalance) {
        toast.error("Insufficient ETH Balance. You need to buy ETH first.")
        return
      }
      const result = await callBidAuction(web3Context, params.collection, params.id, price)
      if(result) setReload(!reload)
    }
    return false
  }

  const renderTrigger = async () => {
    // return null;
    // const a;

    // if(!web3Context?.account) {
    //   toast.error("Please connect wallet first.")
    // }
    // const element: HTMLTextAreaElement | null = textareaRef.current;
    // if (element) {
    //   const price = (element as HTMLTextAreaElement).value
    //   console.log("sniper: input value: ", (element as HTMLTextAreaElement).value)
    //   // const result = await callBidAuction(web3Context?.provider, web3Context?.account, params.collection, params.id, price)
    //   return null
    // }
    // return null
    // await handleBidAuctionItem()
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalBidAuction}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalBidAuction;
