import AppLayout from "components/AppLayout"
import Devit from "components/Devit"
import { fechLatestDevits } from "firebaseservices/client"
import useUser from "hooks/useUser"
import styles from "pages/home/home.module.scss"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fechLatestDevits().then(setTimeline)
  }, [user])
  return (
    <>
      <AppLayout>
        <header className={styles.header}>
          <h2 className={styles.h2}>Inicio</h2>
        </header>
        <section className={styles.section}>
          {timeline.map(
            ({ id, userName, avatar, content, userId, createdAt }) => (
              <Devit
                avatar={avatar}
                id={id}
                key={id}
                content={content}
                userName={userName}
                createdAt={createdAt}
                userId={userId}
              />
            )
          )}
        </section>
        <nav className={styles.nav}></nav>
      </AppLayout>
    </>
  )
}
