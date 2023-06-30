import { CHAIN } from "config";
import { useWeb3Context } from "hooks/useWeb3Context";
import React, { FC, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";
import { callCreateAuction } from "utils/calls";

export interface ModalAuctionProps {
  show: boolean;
  onCloseModalAuction: () => void;
  reload: boolean
  setReload: (reload: boolean) => void
}

const ModalAuction: FC<ModalAuctionProps> = ({ show, onCloseModalAuction, reload, setReload }) => {
  const web3Context = useWeb3Context()
  const textareaRef = useRef(null);
  const datetimeRef = useRef(null)
  const params = useParams()

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
        console.log("sniper: textareaRef ref: ", textareaRef)
        console.log("sniper: datatime ref: ", datetimeRef)
        const element1: HTMLTextAreaElement | null = datetimeRef.current;
        if (element1) {
          (element1 as HTMLTextAreaElement).focus();
          // (element1 as HTMLTextAreaElement).setSelectionRange(
          //   (element1 as HTMLTextAreaElement).value.length,
          //   (element1 as HTMLTextAreaElement).value.length
          // );
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Auction Item To Sell
        </h3>
        <span className="text-sm">Are you sure you want to Auction your NFT to sell?</span>
        <div className="mt-8 rounded-md shadow-sm">
          <div>Start Price</div>
          <div className="relative">
            <Input ref={textareaRef} defaultValue={"1.000"} type={"text"} />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">ETH</div>
          </div>
        </div>
        <div className="mt-8 relative rounded-md shadow-sm">
          <div>End Date</div>
          <Input ref={datetimeRef} defaultValue={"1.000"} type={"datetime-local"} />
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary type="button" onClick={handleAuctionItem}>Submit</ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalAuction}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const handleAuctionItem = async () => {
    const element: HTMLTextAreaElement | null = textareaRef.current;
    const element1: HTMLTextAreaElement | null = datetimeRef.current;
    if (element && element1) {
      const price = (element as HTMLTextAreaElement).value
      const endTime = (element1 as HTMLTextAreaElement).value
      const duration = Math.floor(new Date(endTime).getTime() / 1000 - Date.now() / 1000)
      console.log("sniper: ", price, duration)
      const result = await callCreateAuction(web3Context, params.collection, params.id, price, duration)
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
    //   // const result = await callCreateAuction(web3Context?.provider, web3Context?.account, params.collection, params.id, price)
    //   return null
    // }
    // return null
    // await handleAuctionItem()
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalAuction}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalAuction;
