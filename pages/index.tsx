import { Web3Button } from "@thirdweb-dev/react"
import type { NextPage } from "next"
import Header from "../components/Header"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.info}>
        <img src="./logo.png" alt="logo" className={styles.eyeLogo} />
        <h1>The EYE BALLS Project </h1>
        <p>NFT Project using thirdweb.com</p>
        <br />
        <Web3Button
          contractAddress="0x3d83715a40b6Bc7914DD52a0B83F8859b481ea68"
          action={(contract) => {
            contract.erc721.claim(1)
          }} // Logic to execute when clicked
        >
          Claim Eye
        </Web3Button>
      </section>
    </div>
  )
}
export default Home
