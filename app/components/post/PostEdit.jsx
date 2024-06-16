"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiDotsHorizontal } from "react-icons/hi";
import { fetchRemovePost } from "@/app/lib/auth";
import styles from "./PostEditBtn.module.css";

const PostEditBtn = ({ id }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const router = useRouter();
  const deleteOnclick = async () => {
    const response = await fetchRemovePost(id, token);
    if (response.ok) {
      window.location.reload(); // 페이지 새로고침
    }
  };
  return (
    <div className={styles.container}>
      <HiDotsHorizontal className={styles.icon} />
      <ul className={styles.options}>
        <li>
          <Link href={`/post/${id}/edit`}>수정하기</Link>
        </li>
        <li>
          <a href="#" onClick={deleteOnclick}>
            삭제하기
          </a>
        </li>
      </ul>
    </div>
  );
};
export default PostEditBtn;
