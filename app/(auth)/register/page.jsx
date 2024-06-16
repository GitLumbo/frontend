"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../login/loginForm.module.css";
import Link from "next/link";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const password_confirmation = e.target[2].value;

    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/users/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, password_confirmation }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      router.push("/login");
    } else {
      if (data.password) {
        setError("비밀번호가 형식에 맞지 않습니다.");
        setError2("8자이상, 너무 쉬운 문자가 아니어야 함");
      } else if (data.email) {
        if (data.email[0] === "Enter a valid email address.")
          setError("올바른 이메일 주소를 입력해주세요");
        else setError("이미 존재하는 이메일 주소입니다.");
      } else setError(data.error);
    }
  };

  return (
    <div className={styles.login__form}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.input__form}>
          <label>이메일: </label>
          <input type="text" />
        </div>
        <div className={styles.input__form}>
          <label>비밀번호: </label>
          <input type="password" />
        </div>
        <div className={styles.input__form}>
          <label>
            비밀번호
            <br /> 재입력:{" "}
          </label>
          <input type="password" />
        </div>
        <button type="submit" className={styles.login__btn}>
          회원가입
        </button>
      </form>
      <Link href="/login" className={styles.auth__link}>
        <span>아이디가 이미 있다면? 로그인</span>
      </Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {error2 && <p style={{ color: "red" }}>{error2}</p>}
    </div>
  );
};
export default RegisterForm;
