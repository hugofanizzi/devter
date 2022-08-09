import styles from "./avatar.module.scss"

export default function Avatar({ alt, src, text, withText }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={src} alt={alt} title={alt} />
      {text && <strong>{text}</strong>}
    </div>
  )
}
