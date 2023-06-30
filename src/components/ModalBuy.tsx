import { CHAIN } from "config";
import { useWeb3Context } from "hooks/useWeb3Context";
import React, { FC } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";
import { callBuy } from "utils/calls";

export interface ModalBuyProps {
  show: boolean;
  price: number;
  onCloseModalBuy: () => void;
  reload: boolean
  setReload: (reload: boolean) => void
}

const ModalBuy: FC<ModalBuyProps> = ({ show, price, onCloseModalBuy, reload, setReload }) => {
  const web3Context = useWeb3Context()
  const params = useParams()

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Buy Now
        </h3>
        <span className="text-sm">
          Are you sure you want to buy this NFT?
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleBuyItem} type="button">
            Submit
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalBuy}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const handleBuyItem = async () => {
    const result = await callBuy(web3Context, params.collection, params.id, price)
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
    //   // const result = await callBuy(web3Context?.provider, web3Context?.account, params.collection, params.id, price)
    //   return null
    // }
    // return null
    // await handleBuyItem()
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalBuy}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalBuy;
