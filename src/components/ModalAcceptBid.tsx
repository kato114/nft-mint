import { CHAIN } from "config";
import { useWeb3Context } from "hooks/useWeb3Context";
import React, { FC } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";
import { callAcceptBid } from "utils/calls";

export interface ModalAcceptBidProps {
  show: boolean;
  onCloseModalAcceptBid: () => void;
  reload: boolean
  setReload: (reload: boolean) => void
}

const ModalAcceptBid: FC<ModalAcceptBidProps> = ({ show, onCloseModalAcceptBid, reload, setReload }) => {
  const web3Context = useWeb3Context()
  const params = useParams()

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Accept a Bid
        </h3>
        <span className="text-sm">
          Are you sure you want to accept this offer?
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleAcceptBidItem} type="button">
            Submit
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalAcceptBid}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const handleAcceptBidItem = async () => {
    const index = 0
    const result = await callAcceptBid(web3Context, params.collection, params.id, index)
    if(result) setReload(!reload)
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
    //   // const result = await callAcceptBid(web3Context?.provider, web3Context?.account, params.collection, params.id, price)
    //   return null
    // }
    // return null
    // await handleAcceptBidItem()
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalAcceptBid}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalAcceptBid;
