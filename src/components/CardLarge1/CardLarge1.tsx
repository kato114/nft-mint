import React, { FC, useEffect, useState } from "react";
import OAPImage from "shared/OAPImage/OAPImage";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import TimeCountDown from "./TimeCountDown";
import collectionPng1 from "images/arrow-left.svg";
import collectionPng2 from "images/arrow-right.svg";
import { getOriginContract } from "utils/contractHelpers";
import { useWeb3Context } from "hooks/useWeb3Context";
import { ethers } from "ethers";
import whitelist1 from "config/whitelist1";
import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'
import whitelist2 from "config/whitelist2";
import toast from "react-hot-toast";
import { formatETH2USD } from "utils/formatHelper";
import { useETHPrice } from "hooks/useETHPrice";
// import nft2d from "images/nfts/1.png"
import gif from "images/origin.gif"
import { CHAIN } from "config";
import { Link } from "react-router-dom";

const whitelist1LeafNodes = whitelist1.map(addr => keccak256(addr));
const whitelist1MerkleTree = new MerkleTree(whitelist1LeafNodes, keccak256, {sortPairs: true});
// console.log("whitelist1 merkletree: ", whitelist1MerkleTree.getHexRoot())
const whitelist2LeafNodes = whitelist2.map(addr => keccak256(addr));
const whitelist2MerkleTree = new MerkleTree(whitelist2LeafNodes, keccak256, {sortPairs: true});
// console.log("whitelist2 merkletree: ", whitelist2MerkleTree.getHexRoot())

export interface CardLarge1Props {
  className?: string;
}

const CardLarge1: FC<CardLarge1Props> = ({className}) => {
  const web3Context = useWeb3Context()
  const ethPrice = useETHPrice()
  // const [randomIndex, setRandomIndex] = useState(0)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const _randomIndex = randomIndex + 1 >= 3 ? 0 : randomIndex + 1;
  //     setRandomIndex(_randomIndex);
  //     clearInterval(interval);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [randomIndex])

  const [saleConfig, setSaleConfig] = useState({
    whitelistSaleTime1: 0,
    whitelistSaleTime2: 0,
    publicSaleTime: 0,
    whitelistSalePrice1: 0,
    whitelistSalePrice2: 0,
    publicSalePrice: 0,
    whitelistSaleLimit1: 0,
    whitelistSaleLimit2: 0,
    publicSaleLimit: 0,
  })
  enum SaleState{"Preparing", "WhitelistSale1", "WhitelistSale2", "PublicSale", "End"}
  const [saleState, setSaleState] = useState<SaleState>(SaleState.Preparing)
  const [currentSalePrice, setCurrentSalePrice] = useState(0)
  const [currentSaleLimit, setCurrentSaleLimit] = useState(0)
  useEffect(() => {
    const fetchSaleConfig = async () => {
      console.log("sniper: fetch sale config")
      try {
        const origin = getOriginContract(null)
        const result = await origin.methods.saleConfig().call()
        setSaleConfig({
          whitelistSaleTime1: Number(result["whitelistSaleTime1"]),
          whitelistSaleTime2: Number(result["whitelistSaleTime2"]),
          publicSaleTime: Number(result["publicSaleTime"]),
          whitelistSalePrice1: Number(ethers.utils.formatEther(result["whitelistSalePrice1"])),
          whitelistSalePrice2: Number(ethers.utils.formatEther(result["whitelistSalePrice2"])),
          publicSalePrice: Number(ethers.utils.formatEther(result["publicSalePrice"])),
          whitelistSaleLimit1: Number(result["whitelistSaleLimit1"]),
          whitelistSaleLimit2: Number(result["whitelistSaleLimit2"]),
          publicSaleLimit: Number(result["publicSaleLimit"]),
        })
        
        const result1 = await origin.methods.getSaleState().call()
        setSaleState(Number(result1))

        if(Number(result1) === SaleState.WhitelistSale1) {
          setCurrentSalePrice(Number(ethers.utils.formatEther(result["whitelistSalePrice1"])))
          setCurrentSaleLimit(Number(result["whitelistSaleLimit1"]))
          setMintNum(Number(result["whitelistSaleLimit1"]))
        } else if(Number(result1) === SaleState.WhitelistSale2) {
          setCurrentSalePrice(Number(ethers.utils.formatEther(result["whitelistSalePrice2"])))
          setCurrentSaleLimit(Number(result["whitelistSaleLimit2"]))
        } else if(Number(result1) === SaleState.PublicSale) {
          setCurrentSalePrice(Number(ethers.utils.formatEther(result["publicSalePrice"])))
          setCurrentSaleLimit(Number(result["publicSaleLimit"]))
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchSaleConfig()
  }, [SaleState.PublicSale, SaleState.WhitelistSale1, SaleState.WhitelistSale2])
  

  const [minted, setMinted] = useState(0)
  useEffect(() => {
    const fetchMinted = async () => {
      try {
        const origin = getOriginContract()
        const result = await origin.methods.getTotalMinted().call()
        setMinted(Number(result))
      } catch (error) {
        console.error(error)
      }
    }
    fetchMinted()
  }, [])

  const [mintNum, setMintNum] = useState(1)
  const handlePlus = async () => {
    setMintNum(mintNum + 1)
  }

  const handleMinus = async () => {
    setMintNum(mintNum - 1)
  }

  const handleMint = async () => {
    if(!web3Context?.account) {
      toast.error("Confirm Your Wallet Connection.")
      return false
    }
    if(web3Context?.chainId !== CHAIN) {
      toast.error("Confirm You are in Goerli Network.")
      return false
    }
    try {
      const claimingAddress = keccak256(web3Context.account);
      const origin = getOriginContract(web3Context.provider)
      if(saleState === SaleState.WhitelistSale1) {      
        const hexProof = whitelist1MerkleTree.getHexProof(claimingAddress);
        await origin.methods.whitelistMint1(hexProof).send({from: web3Context.account, value: ethers.utils.parseEther((saleConfig.whitelistSalePrice1 * mintNum).toString())})
      } else if(saleState === SaleState.WhitelistSale2) {
        const hexProof = whitelist2MerkleTree.getHexProof(claimingAddress);
        await origin.methods.whitelistMint2(hexProof, mintNum).send({from: web3Context.account, value: ethers.utils.parseEther((saleConfig.whitelistSalePrice2 * mintNum).toString())})
      } else if(saleState === SaleState.PublicSale) {
        await origin.methods.mintNFTForPublicSale(mintNum).send({from: web3Context.account, value: ethers.utils.parseEther((saleConfig.publicSalePrice * mintNum).toString())})
      }
      toast.success("Mint Success")
    } catch (error) {
      console.error(error)
      toast.error("Something Went Wrong.")
    }
  }

  return (
    <div
      className={`nc-CardLarge1 nc-CardLarge1--hasAnimation relative flex flex-col-reverse lg:flex-row justify-end ${className}`}
    >
      
      <div className="lg:absolute z-8 lg:left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 -mt-2 lg:mt-0 sm:px-5 lg:px-0 w-full lg:max-w-lg ">
        <div className="nc-CardLarge1__left p-4 sm:p-8 xl:py-14 md:px-10 bg-white dark:bg-[#101d34] shadow-lg rounded-3xl space-y-3 sm:space-y-8 ">
          {/* TITLE */}
          <h1 className="text-4xl font-semibold text-center pt-8">
            {/* <div title="Public Mint"> */}
              {/* {randomTitle[Math.floor(Math.random() * randomTitle.length)]} */}
              {saleState === SaleState.Preparing? "Minting is not started." : 
              saleState === SaleState.WhitelistSale1? "First Whitelist Mint" : 
              saleState === SaleState.WhitelistSale2? "Second Whitelist Mint" : "Public Mint"}
            {/* </div> */}
          </h1>
          

          {saleState !== SaleState.Preparing && <div>
            <div className="flex flex-col gap-1 w-full items-center justify-around">
              <div className="text-xl lg:text-2xl 2xl:text-3xl font-semibold">
                20,000/{minted} Minted
              </div>
            </div>

            {/* AUTHOR AND COLLECTION */}
            <div className="flex flex-col gap-1 w-full items-center justify-around">
              <div className="text-xl lg:text-2xl 2xl:text-3xl font-semibold">
                Mint Num
              </div>
              <div className="flex flex-row gap-8 align-center justify-center">
                <button className="flex items-center" onClick={handleMinus} disabled={saleState === SaleState.WhitelistSale1? true : mintNum <= 1}>
                  <Avatar sizeClass="w-14 h-14" imgUrl={collectionPng1} />
                </button>
                <div className="flex items-center">
                  <div className="text-4xl font-semibold ">{mintNum}</div>
                </div>
                <button className="flex items-center" onClick={handlePlus} disabled={saleState === SaleState.WhitelistSale1? true : mintNum >= currentSaleLimit}>
                  <Avatar sizeClass="w-14 h-14" imgUrl={collectionPng2} />
                </button>
              </div>
              <span className="text-sm text-center">
                {saleState === SaleState.WhitelistSale1? "First Whistelist can mint 2 Origin and game assets in a transaction" :
                saleState === SaleState.WhitelistSale2? "Second Whistelist can mint 1 Origin and game assets in a transaction" :
                "You will recieve Origins and game assets"}
              </span>
            </div>

            {/* PRICE */}
            <div className="pt-6 flex justify-center w-full" >
              <div className="flex flex-col items-center justify-around w-full max-w-[300px] items-center p-6 border-2 border-green-500 rounded-xl relative">
                <span className="block absolute bottom-full translate-y-1.5 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400 ring ring-offset-0 ring-white dark:ring-neutral-900">
                  Total Price
                </span>
                <span className="text-3xl xl:text-4xl font-semibold text-green-500">
                  {currentSalePrice * mintNum} ETH
                </span>
                <span className="text-lg text-neutral-400">
                  (≈ ${formatETH2USD(currentSalePrice * mintNum, ethPrice)})
                </span>
              </div>
            </div>
          </div>}

          {/* AUTION TIME */}
          {saleState < SaleState.WhitelistSale1 && <TimeCountDown title="First Whitelist Mint In:" start={saleConfig.whitelistSaleTime1}/>}
          {saleState < SaleState.WhitelistSale2 && <TimeCountDown title="Second Whitelist Mint In:" start={saleConfig.whitelistSaleTime2}/>}
          {saleState < SaleState.PublicSale && <TimeCountDown title="Public Mint In:" start={saleConfig.publicSaleTime}/>}

          <div className="w h-[1px] bg-neutral-100 dark:bg-neutral-700"></div>

          {/* DESCRIPTION */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <ButtonPrimary className="flex-1" onClick={handleMint}>
              Mint Now
            </ButtonPrimary>
            <ButtonSecondary className="flex-1">
              <Link to={web3Context?.account ? `profile/${web3Context?.account}` : ``}>View on Profile</Link>
              
            </ButtonSecondary>
          </div>
        </div>
        {/* <div className="p-4 sm:pt-8 sm:px-10 ">
          <NextPrev
            btnClassName="w-11 h-11 text-xl"
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        </div> */}
      </div>

      <div className="w-full lg:w-[50%] relative pb-8 ">
        <div className="nc-CardLarge1__right ">
          {/* <OAPImage
            className="inset-0 object-cover rounded-3xl sm:rounded-[40px] border-4 sm:border-[14px] border-white dark:border-neutral-800"
            src_origin={nft2d}
            alt={"title"}
          /> */}
          {/* <OAPImage
            className=""
            src_origin={gif}
            alt={"title"}
          /> */}
          <img src={gif} alt="gif" />

          {/* META TYPE */}
          {/* <ItemTypeVideoIcon className="absolute w-8 h-8 md:w-10 md:h-10 left-3 bottom-3 sm:left-7 sm:bottom-7 " /> */}

          {/* META FAVORITES */}
          {/* <LikeButton className="absolute right-3 top-3 sm:right-7 sm:top-7" /> */}
        </div>
      </div>
    </div>
  );
};

export default CardLarge1;
