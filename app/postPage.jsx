"use client";
import { useEffect, useState } from "react";
import { fetchAllPosts } from "./lib/auth";
import Posts from "./components/post/posts";

const PostsPage = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetchAllPosts();
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        const data = await res.json();
        setError(data.message);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      {error ? (
        <h2 style={{ color: "orange", textAlign: "center" }}>{error}</h2>
      ) : (
        <Posts posts={posts} user={user} />
      )}
    </div>
  );
};

export default PostsPage;
