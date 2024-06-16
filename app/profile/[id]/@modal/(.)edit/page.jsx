"use client";
import { useEffect, useState } from "react";
import { fetchProfileData, fetchUpdateProfile } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
const { default: Modal } = require("@/app/components/modal");
import styles from "./editPage.module.css";
import { useContext } from "react";
import UserContext from "@/app/components/UserContext";

const EditProfile = ({ params }) => {
  const { user, setUser } = useContext(UserContext);
  const { id } = params;

  const [token, setToken] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", username);
    if (image) {
      formData.append("image", image);
    }
    const res = await fetchUpdateProfile(formData, id, token);
    if (res.ok) {
      if (image)
        setUser({
          ...user,
          name: username,
          image: image,
        });
      else
        setUser({
          ...user,
          name: username,
        });
      router.push(`/refresh/${id}`);
    }
  };
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(user.name);
  }, []);
  return (
    <Modal height="auto">
      <div>
        <form action="PUT" onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="userName">닉네임</label>
          <input
            id="userName"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="profileImg">프로필 이미지</label>
          <input
            id="profileImg"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">수정</button>
        </form>
      </div>
    </Modal>
  );
};
export default EditProfile;
