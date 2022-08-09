import Avatar from "components/Avatar"
import styles from "components/Devit/devit.module.scss"

export default function Devit({ avatar, username, message, id }) {
  return (
    <>
      <article className={styles.article}>
        <div className={styles.div}>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>
    </>
  )
}
