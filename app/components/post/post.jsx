import Image from "next/image";
import Link from "next/link";
import styles from "./post.module.css";
import PostEditBtn from "./PostEdit";
import PostLike from "./PostLike";

const Post = ({ post, user }) => {
  const isAuth = post.creator == user?.id;
  const dateConverter = (posted_date) => {
    const saved = new Date(posted_date);
    const now = new Date();
    if (saved.getFullYear() !== now.getFullYear())
      return `${now.getFullYear() - saved.getFullYear()}년전`;
    else if (saved.getMonth() !== now.getMonth())
      return `${now.getMonth() - saved.getMonth()}달전`;
    else if (saved.getDate() !== now.getDate())
      return `${now.getDate() - saved.getDate()}일전`;
    else if (saved.getHours() !== now.getHours())
      return `${now.getHours() - saved.getHours()}시간전`;
    else if (saved.getMinutes() !== now.getMinutes())
      return `${now.getMinutes() - saved.getMinutes()}분전`;
    else return `${now.getSeconds() - saved.getSeconds()}초전`;
  };
  return (
    <li className={styles.post__container}>
      <div className={styles.profile__img__box}>
        <Image
          src={post.creator_profile.image}
          alt={post.creator_profile.name || "Undefined User"}
          width={50}
          height={50}
        />
      </div>
      <div className={styles.content__box}>
        <div className={styles.post__header}>
          <div>
            <span className={styles.profile__username}>
              <Link href={`/profile/${post.creator}`}>
                {post.creator_profile.name || "Undefined User"}
              </Link>
            </span>
            <span className={styles.created__time}>
              {dateConverter(post.created)}
            </span>
          </div>
          {isAuth && <PostEditBtn id={post.pk} />}
        </div>
        <Link href={`/post/${post.pk}`}>
          <p>{post.context}</p>
        </Link>
        {post.image && (
          <div className={styles.post__image}>
            <Image
              src={post.image}
              alt={post.creator_profile.name || "Undefined User"}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        )}
        <PostLike likes={post.likes} id={post.pk} user={user} />
      </div>
    </li>
  );
};
export default Post;
