"use client";
import { useState, useEffect, useContext } from "react";
import UserContext from "@/app/components/UserContext";
import Image from "next/image";
import Posts from "@/app/components/post/posts";
import styles from "./profilePage.module.css";
import EditBtn from "./EditBtn";
import {
  fetchProfileData,
  fetchPostsData,
  fetchLikedPostsData,
} from "@/app/lib/auth";
export default function ProfilePage({ params }) {
  const { id } = params;
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [likedPostsData, setLikedPostsData] = useState(null);
  const [userListType, setUserListType] = useState(true);
  useEffect(() => {
    const setting = async () => {
      setProfileData(await fetchProfileData(id));
    };
    setting();
  }, []);
  useEffect(() => {
    const setting = async () => {
      setPostsData(await fetchPostsData(id));
      setLikedPostsData(await fetchLikedPostsData(id));
    };
    setting();
  }, [userListType]);
  return (
    <>
      <div className={styles.user__profile}>
        <div>
          <div className={styles.user__profile__box}>
            <div>
              <span className={styles.user__username}>{profileData?.name}</span>
              <div className={styles.posts__count}>
                {postsData ? postsData.length : 0}개의 글
              </div>
            </div>
            <div className={styles.user__img}>
              {profileData?.image && (
                <Image
                  src={profileData?.image}
                  alt={profileData?.name}
                  width={70}
                  height={70}
                />
              )}
            </div>
          </div>
          <EditBtn id={id} />
        </div>
        <div>
          <div className={styles.user__posts}>
            <div
              className={userListType && styles.selected}
              onClick={() => setUserListType(true)}
            >
              {profileData?.name}의 글
            </div>
            <div
              className={!userListType && styles.selected}
              onClick={() => setUserListType(false)}
            >
              좋아요한 글
            </div>
          </div>
          {(userListType ? postsData : likedPostsData) && (
            <Posts
              posts={userListType ? postsData : likedPostsData}
              user={user}
            ></Posts>
          )}
        </div>
      </div>
    </>
  );
}
