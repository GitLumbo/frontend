"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/app/components/UserContext";
import { fetchProfileByToken } from "@/app/lib/auth";
import styles from "./loginForm.module.css";
import Link from "next/link";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/users/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      const userData = await fetchProfileByToken(data.token);
      if (userData !== null) {
        setUser(userData);
        router.push("/");
      }
    } else {
      setError(data.error);
    }
  };

  return (
    <div className={styles.login__form}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.input__form}>
          <label>이메일: </label>
          <input type="text" />
        </div>
        <div className={styles.input__form}>
          <label>비밀번호: </label>
          <input type="password" />
        </div>
        <button type="submit" className={styles.login__btn}>
          로그인
        </button>
      </form>
      <Link href="/register" className={styles.auth__link}>
        <span>아이디가 없으시다면? 회원가입</span>
      </Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
export default LoginForm;
