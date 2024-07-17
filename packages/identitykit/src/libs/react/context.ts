import { createContext, useContext } from "react"
import { IdentityKitProvider } from "./types"
import { Signer } from "@slide-computer/signer"
import { SignerConfig } from "../../lib"
import { IdentityKitTheme } from "./constants"

const defaultState: IdentityKitProvider = {
  signers: [],
  selectedSigner: undefined,
  isModalOpen: false,
  signerIframeRef: undefined,
  toggleModal: () => {
    throw new Error("toggleModal not implemented")
  },
  selectSigner: () => {
    throw new Error("selectSigner not implemented")
  },
  setCustomSigner: () => {
    throw new Error("signer is not available on this url")
  },
  theme: IdentityKitTheme.SYSTEM,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  identityKit: {} as any,
}

export const IdentityKitContext = createContext<IdentityKitProvider>(defaultState)

export function useIdentityKit(): {
  selectedSigner?: Signer
  selectSigner: (signerId?: string | undefined) => void | SignerConfig
} {
  const { selectedSigner, selectSigner } = useContext(IdentityKitContext)

  return {
    selectedSigner,
    selectSigner,
  }
}
