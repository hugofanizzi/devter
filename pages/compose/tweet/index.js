import styles from "pages/compose/tweet/tweet.module.scss"

import AppLayout from "components/AppLayout"
import Button from "components/Button"
// import { useState } from "react"

export default function ComposeTweet() {
  // const [user, setUser] = useState()

  return (
    <>
      <AppLayout>
        <form action="">
          <textarea
            className={styles.textarea}
            placeholder="¿Qué esta pasando?"
          ></textarea>
          <div className={styles.div}>
            <Button>Devitear</Button>
          </div>
        </form>
      </AppLayout>
    </>
  )
}
