import styles from "./timeline.module.css";
import Link from "next/link";
import AppLayout from "../../components/AppLayout";

export default function Timeline({ userName }) {
  return (
    <>
      <AppLayout>
        <h1 className={styles.h1}>This is the timeline of {userName} </h1>
        <Link href="/">
          <a className={styles.gohome}>Go Home</a>
        </Link>
      </AppLayout>
    </>
  );
}

Timeline.getInitialProps = () => {
  return fetch("http://localhost:3000/api/hello").then((res) => res.json());
};
