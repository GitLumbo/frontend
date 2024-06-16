import Image from "next/image";
import Link from "next/link";
import TitleImg from "../../public/inhalink.png";
import styles from "./LoginLayout.module.css";
export default function LoginLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Link href="/">
        <header className={styles.header}>
          <Image src={TitleImg} alt="InhaLink" width={50} />
          <h1>Inha Link</h1>
        </header>
      </Link>
      <main>{children}</main>
      <footer>© 2024 곽서현</footer>
    </div>
  );
}
