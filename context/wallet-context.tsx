"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface BusinessProfile {
  businessName: string
  category: string
  revenueRange: string
  primaryRegions: string[]
}

interface WalletContextType {
  address: string | null
  isConnected: boolean
  isConnecting: boolean
  network: string
  businessProfile: BusinessProfile | null
  isOnboarded: boolean
  dataUploaded: boolean
  analysisComplete: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  setBusinessProfile: (profile: BusinessProfile) => void
  setDataUploaded: (val: boolean) => void
  setAnalysisComplete: (val: boolean) => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isConnecting: false,
  network: "Polygon",
  businessProfile: null,
  isOnboarded: false,
  dataUploaded: false,
  analysisComplete: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  setBusinessProfile: () => {},
  setDataUploaded: () => {},
  setAnalysisComplete: () => {},
})

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [network] = useState("Polygon")
  const [businessProfile, setBusinessProfileState] = useState<BusinessProfile | null>(null)
  const [dataUploaded, setDataUploaded] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const connectWallet = useCallback(async () => {
    setIsConnecting(true)
    try {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0])
        }
      } else {
        // Demo mode - simulate wallet connection
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setAddress(null)
    setBusinessProfileState(null)
    setDataUploaded(false)
    setAnalysisComplete(false)
  }, [])

  const setBusinessProfile = useCallback((profile: BusinessProfile) => {
    setBusinessProfileState(profile)
  }, [])

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        isConnecting,
        network,
        businessProfile,
        isOnboarded: !!businessProfile,
        dataUploaded,
        analysisComplete,
        connectWallet,
        disconnectWallet,
        setBusinessProfile,
        setDataUploaded,
        setAnalysisComplete,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

// TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<string[]>
      on: (event: string, callback: (...args: unknown[]) => void) => void
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void
    }
  }
}
