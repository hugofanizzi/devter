import Avatar from "components/Avatar"
import styles from "components/Devit/devit.module.scss"
import useDateTimeFormat from "hooks/useDateTimeFormat"

import useTimeAgo from "hooks/useTimeAgo"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Devit({
  avatar,
  userName,
  content,
  id,
  createdAt,
  img,
}) {
  const createdAtFormated = useDateTimeFormat(createdAt)
  const timeago = useTimeAgo(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article className={styles.article} onClick={handleArticleClick}>
        <div className={styles.div}>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> - </span>
            <Link href={`/status/${id}`}>
              <a className={styles.a}>
                <time title={createdAtFormated} className={styles.time}>
                  {timeago}
                </time>
              </a>
            </Link>
          </header>
          <span>{content}</span>
          {img && <img className={styles.img} src={img} />}
        </section>
      </article>
    </>
  )
}
