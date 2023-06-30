import { CHAIN } from "config";
import { useWeb3Context } from "hooks/useWeb3Context";
import React, { FC } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";
import { callCancelListing } from "utils/calls";

export interface ModalCancelListingProps {
  show: boolean;
  onCloseModalCancelListing: () => void;
  reload: boolean
  setReload: (reload: boolean) => void
}

const ModalCancelListing: FC<ModalCancelListingProps> = ({ show, onCloseModalCancelListing, reload, setReload }) => {
  const web3Context = useWeb3Context()
  const params = useParams()

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Cancel Listing
        </h3>
        <span className="text-sm">
          Are you sure you want to cancel listing this NFT? You cannot undo this action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleCancelListingItem} type="button">
            Submit
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalCancelListing}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const handleCancelListingItem = async () => {
    const result = await callCancelListing(web3Context, params.collection, params.id)
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
    //   // const result = await callCancelListing(web3Context?.provider, web3Context?.account, params.collection, params.id, price)
    //   return null
    // }
    // return null
    // await handleCancelListingItem()
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalCancelListing}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalCancelListing;
