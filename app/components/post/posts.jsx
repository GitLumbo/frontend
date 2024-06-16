"use client";
import Post from "./post";
import styles from "./posts.module.css";
const Posts = ({ posts, user }) => {
  return (
    <ul className={styles.posts}>
      {posts.map((post) => (
        <Post post={post} key={post.pk} user={user} />
      ))}
    </ul>
  );
};
export default Posts;
