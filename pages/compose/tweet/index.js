import styles from "pages/compose/tweet/tweet.module.scss"

import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"
import { addDevit, uploadImage } from "firebaseservices/client"
import { useRouter } from "next/router"
import Head from "next/head"
import { getDownloadURL } from "firebase/storage"
import Avatar from "components/Avatar"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImageURL] = useState(null)

  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    const onProgress = () => {}
    const onError = () => {}
    const onComplete = () => {
      console.log("onComplete")
      getDownloadURL(task.snapshot.ref).then(setImageURL)
    }

    if (task) {
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Devit</title>
        </Head>
        <section className={styles.formContainer}>
          {user && (
            <section className={styles.avatarContainer}>
              <Avatar src={user.avatar} />
            </section>
          )}
          <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
              className={
                drag === DRAG_IMAGE_STATES.DRAG_OVER
                  ? styles[`textarea--drag`]
                  : styles.textarea
              }
              placeholder="¿Qué esta pasando?"
              value={message}
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            ></textarea>
            {imgURL && (
              <section className={styles.removeImage}>
                <button
                  onClick={() => setImageURL(null)}
                  className={styles.button}
                >
                  x
                </button>
                <img className={styles.img} src={imgURL} />
              </section>
            )}
            <div className={styles.div}>
              <Button disabled={isButtonDisabled}>Devitear</Button>
            </div>
          </form>
        </section>
      </AppLayout>
    </>
  )
}
