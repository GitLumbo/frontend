"use client";
import Image from "next/image";
import styles from "../../styles/create.module.css";
import { fetchCreatePost } from "@/app/lib/auth.js";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
const { default: Modal } = require("@/app/components/modal");

const CreateModal = () => {
  const router = useRouter();
  const [context, setContext] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => setShowModal(pathname.toString() === "/create"), [pathname]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("context", context);
    if (image) formData.append("image", image);
    const res = await fetchCreatePost(formData, token);
    const data = await res.json();
    if (res.ok) {
      setContext("");
      setImage(null);
      setImagePreview(null);
      router.push(`/post/${data.pk}`);
    }
  };
  return (
    <>
      {showModal && (
        <Modal height="auto">
          <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
              name="write"
              id="userWrite"
              className={styles.write__box}
              placeholder="할 말을 작성해보세요... (최대 1000자)"
              maxLength="1000"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            ></textarea>
            <div className={styles.img__upload}>
              {imagePreview ? (
                <label htmlFor="imgUpload">
                  <img src={imagePreview} alt="preview" />
                </label>
              ) : (
                <label htmlFor="imgUpload">이미지 업로드</label>
              )}
              <input
                type="file"
                accept="image/
              jpeg, image/png"
                id="imgUpload"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit">게시</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CreateModal;
