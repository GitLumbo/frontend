"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from "./PostLike.module.css";
import { fetchToggleLike } from "@/app/lib/auth";
const PostLike = ({ likes, id, user }) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [token, setToken] = useState(null);
  useEffect(() => {
    setLikeCount(likes.length);
    if (user) {
      setLiked(likes.includes(user.id));
    }
  }, []);
  const toggleLike = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    const res = await fetchToggleLike(id, user.token);
    if (res.ok) {
      if (liked) setLikeCount(likeCount - 1);
      else setLikeCount(likeCount + 1);
      setLiked(!liked);
    }
  };
  return (
    <div className={styles.post__likes + (liked ? ` ${styles.likes}` : "")}>
      <div onClick={toggleLike}>{liked ? <FaHeart /> : <FaRegHeart />}</div>
      {likeCount}
    </div>
  );
};
export default PostLike;
