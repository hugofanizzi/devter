import styles from "./AppLayout.module.scss";

export default function AppLayout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
