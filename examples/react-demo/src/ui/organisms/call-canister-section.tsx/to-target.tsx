import { Section } from "./section"
import { idlFactory as demoIDL } from "../../../idl/service_idl"
import { useIdentityKit } from "@nfid/identitykit/react"
import { CallCanisterMethod } from "./constants"

export function ToTarget({ className }: { className?: string }) {
  const { user } = useIdentityKit()

  return (
    <Section
      className={className}
      request={{
        method: "icrc49_call_canister",
        params: {
          canisterId: import.meta.env.VITE_TARGET_CANISTER,
          sender: user?.principal.toString() || "",
          method: CallCanisterMethod.greet_no_consent,
          arg: "RElETAABcQJtZQ==",
        },
      }}
      canisterIDL={demoIDL}
      actorArgs={"me"}
      getCodeSnippet={({ canisterId, method }) => `const { agent } = useIdentityKit()
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: "${canisterId}",
  })
  const response = await actor.${method}("me")`}
    />
  )
}
