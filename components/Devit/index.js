import Avatar from "components/Avatar"
import styles from "components/Devit/devit.module.scss"

import useTimeAgo from "hooks/useTimeAgo"

export default function Devit({
  avatar,
  userName,
  content,
  id,
  createdAt,
  img,
}) {
  const timeago = useTimeAgo(createdAt)

  return (
    <>
      <article className={styles.article}>
        <div className={styles.div}>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> - </span>
            <date className={styles.date}>{timeago}</date>
          </header>
          <span>{content}</span>
          {img && <img className={styles.img} src={img} />}
        </section>
      </article>
    </>
  )
}
