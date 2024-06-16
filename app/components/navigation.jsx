import Link from "next/link";
import styles from "./navigation.module.css";
import Image from "next/image";
import TitleImg from "../../public/inhalink.png";
import { CgProfile, CgHome, CgPen } from "react-icons/cg";
const Navigation = ({ user }) => {
  return (
    <nav className={styles.nav}>
      <div>
        <div>
          <Link href="/" scroll={false}>
            <Image src={TitleImg} alt="InhaLink" width={50} />
          </Link>
        </div>
        <ul>
          <li key="home">
            <Link href="/" scroll={false}>
              <div>
                <CgHome />
              </div>
            </Link>
          </li>
          <li key="create">
            <Link href={user ? "/create" : "/login"} scroll={false}>
              <div>
                <CgPen />
              </div>
            </Link>
          </li>
          <li key="profile">
            <Link href={user ? `/profile/${user.id}` : "/login"} scroll={false}>
              <div>
                <CgProfile />
              </div>
            </Link>
          </li>
        </ul>
        <div className={styles.login__btn}>
          {!user ? (
            <Link href="/login">
              <button>로그인</button>
            </Link>
          ) : (
            <Link href="/logout">
              <button>로그아웃</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
