export const formatETH2USD = (eth: number, price: number) => {
    return Number((eth * price).toFixed(5))
}

export const formatAddress = (address: string | undefined) => {
    return address ? `${address.substring(0, 6)} ... ${address.substring(address.length - 4, address.length)}` : "Undefind Address"
}