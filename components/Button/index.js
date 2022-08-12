import styles from "./button.module.scss"

export default function Button({ disabled, children, onClick }) {
  return (
    <>
      <button className={styles.button} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </>
  )
}
