import { useEffect, useState } from "react";
import { getPriceFeedAddress } from "utils/addressHelpers";
import { getPriceFeedContract } from "utils/contractHelpers";

export const useETHPrice = () => {
  const [ethPrice, setETHPrice] = useState(0);

  useEffect(() => {
    const fetchETHPrice =async () => {
      const feedContract = getPriceFeedContract(getPriceFeedAddress())
      const _price = await feedContract.methods.latestAnswer().call()
      if(_price !== 0) {
        setETHPrice(_price / 10**8)
      }
    }
    fetchETHPrice()
  }, []);

  return ethPrice;
};
