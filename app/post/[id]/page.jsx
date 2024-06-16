"use client";
import { useContext } from "react";
import UserContext from "@/app/components/UserContext";
import Post from "@/app/components/post/post";
import { fetchPostData, fetchUserProfile } from "@/app/lib/auth";
import { useState, useEffect } from "react";
export default function PostPage({ params }) {
  const { id } = params;
  const { user } = useContext(UserContext);
  const [post, setPostData] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchPostData(id);
      setPostData(post);
    };
    fetchPost();
  }, []);
  return (
    <>
      <ul style={{ display: "flex", justifyContent: "center" }}>
        {post && <Post post={post} key={post.pk} user={user} />}
      </ul>
    </>
  );
}
