import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getStandardERC20Contract, getStandardERC721Contract } from "utils/contractHelpers";

export const useIsApprovedERC721 = (account: string | undefined, erc721: string | undefined, operator: string, reload: boolean) => {
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const fetchIsApproved = async (account: string, erc721: string) => {
        try {
            const contract = getStandardERC721Contract(erc721)
            const result = await contract.methods.isApprovedForAll(account, operator).call()
            setIsApproved(result)
        } catch (error) {
            console.error(error)
        }
    };
    if(account && erc721) {
        fetchIsApproved(account, erc721);
    }
  }, [account, erc721, operator, reload]);

  return isApproved;
};

export const useIsApprovedERC20 = (account: string | undefined, erc20: string | undefined, operator: string, reload: boolean) => {
  const [allowance, setAllowance] = useState(0);

  useEffect(() => {
    const fetchIsApproved = async (account: string, erc20: string) => {
        try {
            const contract = getStandardERC20Contract(erc20)
            const result = await contract.methods.allowance(account, operator).call()
            setAllowance(Number(ethers.utils.formatEther(result)))
        } catch (error) {
            console.error(error)
        }
    };
    if(account && erc20) {
        fetchIsApproved(account, erc20);
    }
  }, [account, erc20, operator, reload]);

  return allowance;
};
