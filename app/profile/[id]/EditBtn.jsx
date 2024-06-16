"use client";
import Link from "next/link";
import styles from "./profilePage.module.css";
import { useContext } from "react";
import UserContext from "@/app/components/UserContext";
const EditBtn = ({ id }) => {
  const { user } = useContext(UserContext);
  return (
    <>
      {user?.id == id && (
        <Link
          href={`/profile/${id}/edit`}
          className={styles.profile__edit}
          scroll={false}
        >
          프로필 편집
        </Link>
      )}
    </>
  );
};
export default EditBtn;
