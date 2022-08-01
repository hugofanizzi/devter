import styles from "./AppLayout.module.css";

export default function AppLayout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
