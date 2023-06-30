import { CHAIN } from "config";
import useERC20Balance from "hooks/useERC20Balance";
import { useWeb3Context } from "hooks/useWeb3Context";
import React, { FC, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";
import { getWBNBAddress } from "utils/addressHelpers";
import { callOffer } from "utils/calls";

export interface ModalOfferProps {
  show: boolean;
  onCloseModalOffer: () => void;
  reload: boolean
  setReload: (reload: boolean) => void
}

const ModalOffer: FC<ModalOfferProps> = ({ show, onCloseModalOffer, reload, setReload }) => {
  const web3Context = useWeb3Context()
  const textareaRef = useRef(null);
  const params = useParams()
  const wethBalance = useERC20Balance(web3Context?.account, getWBNBAddress())

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
          Make a Offer
        </h3>
        <span className="text-sm">Are you sure you want to make a offer with this price?</span>
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
          <ButtonPrimary type="button" onClick={handleOfferItem}>Submit</ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalOffer}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const handleOfferItem = async () => {
    const element: HTMLTextAreaElement | null = textareaRef.current;
    if (element) {
      const price = (element as HTMLTextAreaElement).value
      // if(Number(price) > wethBalance) {
      //   toast.error("Insufficient WETH Balance. You need to buy WETH first to make a offer.")
      //   return
      // }
      console.log("sniper: price: ", price)
      const result = await callOffer(web3Context, params.collection, params.id, price)
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
    //   // const result = await callOffer(web3Context?.provider, web3Context?.account, params.collection, params.id, price)
    //   return null
    // }
    // return null
    // await handleOfferItem()
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalOffer}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalOffer;
