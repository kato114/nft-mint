
export const getStakingInfo = `query($first: Int, $skip: Int) {
    stakings(first: $first, skip: $skip, orderBy: tokenId) {
      tokenId
      owner
      startTime
      stakedDays
    }
  }`

export const getLamboNFTHolders = `query($first: Int, $skip: Int) {
  lamboNFTHolders(first: $first, skip: $skip, orderBy: tokenId) {
    tokenId
    owner
    approved
  }
}`

export const getSaleLists = `query($first: Int, $skip: Int) {
    saleLists(first: $first, skip: $skip, orderBy: tokenId) {
      id
      tokenId
      price
      totalVolume
    }
  }`

export const originQuery = `query origin {
  origins(orderBy: tokenId, orderDirection: asc) {
    tokenId
    owner
    rank
    auctionEndTime
    battlePassLevel
    battlePassPrice
    characterLevel
    characterPrice
    clothesLevel
    clothesPrice
    createdAt
    highestBidPrice
    isAuction
    listOrAuctionStartPrice
    saleCreateTime
    weaponLevel
    weaponPrice
    totalVolume
  }
}
`

export const originItemQuery = `query origin($tokenId: BigInt!) {
  origins(where: {tokenId: $tokenId}) {
    tokenId
    owner
    creator
    mintHash
    rank
    auctionEndTime
    battlePassLevel
    battlePassPrice
    characterLevel
    characterPrice
    clothesLevel
    clothesPrice
    createdAt
    highestBidPrice
    isAuction
    listOrAuctionStartPrice
    saleCreateTime
    weaponLevel
    weaponPrice
    totalVolume
  }
}`

export const saleHistoryQuery = `
  query sale($tokenId: BigInt!) {
    originSaleHistories(where: {tokenId: $tokenId}) {
      buyer
      seller
      createdAt
      paidAmount
    }
  }
`

export const bidNonAuctionHistoryQuery = `
query bid($tokenId: BigInt!) {
  originBidOnNonAuctionHistories(
    where: {tokenId: $tokenId}
    orderBy: createdAt
    orderDirection: asc
    ) {
    price
    createdAt
    bidder
  }
}
`

export const bidAuctionHistoryQuery = `
query bid($tokenId: BigInt!) {
  originBidOnAuctionHistories(where: {tokenId: $tokenId}) {
    price
    createdAt
    bidder
  }
}
`

export const ownedOriginsQuery = `
query created($owner: Bytes!) {
  origins(where: {owner: $owner}) {
    tokenId
    creator
    weaponPrice
    weaponLevel
    totalVolume
    saleCreateTime
    rank
    mintHash
    listOrAuctionStartPrice
    isAuction
    highestBidPrice
    createdAt
    clothesPrice
    clothesLevel
    characterPrice
    characterLevel
    battlePassPrice
    battlePassLevel
    auctionEndTime
    owner
  }
}
`

export const mintedOriginsQuery = `
query created($creator: Bytes!) {
  origins(where: {creator: $creator}) {
    tokenId
    creator
    weaponPrice
    weaponLevel
    totalVolume
    saleCreateTime
    rank
    mintHash
    listOrAuctionStartPrice
    isAuction
    highestBidPrice
    createdAt
    clothesPrice
    clothesLevel
    characterPrice
    characterLevel
    battlePassPrice
    battlePassLevel
    auctionEndTime
    owner
  }
}
`