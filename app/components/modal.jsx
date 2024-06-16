"use client";
import styles from "./modal.module.css";
import { useRouter } from "next/navigation";
const Modal = ({ children, height, width }) => {
  const router = useRouter();
  const closeModal = (e) => {
    router.back();
  };
  return (
    <div className={styles.container} onClick={closeModal}>
      <div
        className={styles.content}
        style={{ height: height, width: width }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
