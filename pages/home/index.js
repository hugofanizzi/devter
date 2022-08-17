import Devit from "components/Devit"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import { listenLatestDevits } from "firebaseservices/client"
import useUser from "hooks/useUser"
import Head from "next/head"
import Link from "next/link"
import styles from "pages/home/home.module.scss"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline)
    }
    return () => unsubscribe && unsubscribe()
  }, [user])
  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <header className={styles.header}>
        <h2 className={styles.h2}>Inicio</h2>
      </header>
      <section className={styles.section}>
        {timeline.map(
          ({ id, userName, img, avatar, content, userId, createdAt }) => (
            <Devit
              avatar={avatar}
              id={id}
              img={img}
              key={id}
              content={content}
              userName={userName}
              createdAt={createdAt}
              userId={userId}
            />
          )
        )}
      </section>
      <nav className={styles.nav}>
        <Link href="/compose/tweet">
          <a>
            <Home width={32} height={32} stroke="#09f"></Home>
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Search width={32} height={32} stroke="#09f"></Search>
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f"></Create>
          </a>
        </Link>
      </nav>
    </>
  )
}
