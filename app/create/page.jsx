"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { isLoggedIn } from "../lib/auth";
import styles from "../styles/create.module.css";
const CreateForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn()) router.push("/login");
  }, []);
  return (
    <div className={styles.page__container}>
      <div>
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
              id="imgUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">게시</button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
