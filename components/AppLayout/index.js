import styles from "./AppLayout.module.scss";

export default function AppLayout({ children }) {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
