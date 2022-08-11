import Avatar from "components/Avatar"
import styles from "components/Devit/devit.module.scss"

export default function Devit({ avatar, userName, content, id, createdAt }) {
  return (
    <>
      <article className={styles.article}>
        <div className={styles.div}>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span>.</span>
            <date className={styles.date}>{createdAt}</date>
          </header>
          <p>{content}</p>
        </section>
      </article>
    </>
  )
}
