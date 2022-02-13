import { BigNumber, ethers } from 'ethers'
import { Metadata } from '../Types/metadata'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants'

let provider: ethers.providers.Web3Provider | undefined

export const getProvider = () => provider
export const getSigner = () => provider?.getSigner()

export const getBaseProvider = () => {
  if ((window as any).ethereum) {
    return (window as any).ethereum as ethers.providers.Web3Provider
  }
}

export const connectWallet = async () => {
  provider = new ethers.providers.Web3Provider((window as any).ethereum)
  await provider.send('eth_requestAccounts', [])
}

export const getAccounts = async () => {
  if (provider) {
    const accounts: string[] = await provider.send('eth_accounts', [])
    return accounts
  }
}

export const getTokens = async (account: string) => {
  if (provider) {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    )
    const tokens: BigNumber[] = await contract.listTokenOf(account)
    const metadataList: Metadata[] = []
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i]
      const dataURI = await contract.tokenURI(t.toNumber())
      const data = await (await fetch(dataURI)).json()
      metadataList.push(data)
    }
    return metadataList
  }
}
