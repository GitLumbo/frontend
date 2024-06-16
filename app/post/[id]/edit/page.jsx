"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchPostData, fetchUpdatePost } from "@/app/lib/auth";
import styles from "@/app/styles/create.module.css";
const UpdateForm = ({ params }) => {
  const { id } = params;
  const [context, setContext] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [token, setToken] = useState("");
  const router = useRouter();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  useEffect(() => {
    async function loadPost() {
      const data = await fetchPostData(id);
      setContext(data.context);

      if (data.image) {
        const response = await fetch(data.image);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(blob);
      }
    }
    loadPost();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("context", context);
    if (image) {
      formData.append("image", image);
    }
    const res = await fetchUpdatePost(formData, id, token);

    if (res.ok) {
      router.push(`/post/${id}`);
      router.refresh();
    }
  };

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
              type="file"
              accept="image/
              jpeg, image/png"
              id="imgUpload"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">게시</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
