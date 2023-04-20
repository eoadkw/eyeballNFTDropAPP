import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useNFTs,
} from "@thirdweb-dev/react"
import type { NextPage } from "next"
import { useState } from "react"
import Header from "../components/Header"
import styles from "../styles/MyNfts.module.css"

const MyNfts: NextPage = () => {
  const { contract } = useContract("0x3d83715a40b6Bc7914DD52a0B83F8859b481ea68")
  const { data: nfts, isLoading, error } = useNFTs(contract)
  const address = useAddress()
  const [msgid, setMsgid] = useState("")
  const [msg, setMsg] = useState("")
  // console.log(address)
  const readNote = (id: string) => {
    contract
      ?.call("notes", id)
      .then((data) => {
        setMsg(data)
        setMsgid(id)
      })
      .catch((err) => setMsg(""))
  }
  return (
    <div className={styles.container}>
      <Header />
      {msg ? <p>Note: {msg}</p> : null}
      <section className={styles.info}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          nfts
            ?.filter((nft) => nft.owner == address)
            ?.map((nft) => {
              return (
                <div key={nft.metadata.id}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    height="200"
                    style={{ borderRadius: "10px" }}
                  />
                  <p>
                    ID: {nft.metadata.id} | {nft.metadata.name}
                  </p>
                  <button onClick={() => readNote(nft.metadata.id)}>
                    Read Note
                  </button>
                </div>
              )
            })
        )}
      </section>
    </div>
  )
}
export default MyNfts
