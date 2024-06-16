"use client";
import { useContext } from "react";
import UserContext from "./components/UserContext";
import PostsPage from "./postPage";
import Navigation from "./components/navigation";
export const metadata = {
  title: "새 글",
};
const Home = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <Navigation user={user} />
      <PostsPage user={user} />
    </>
  );
};
export default Home;
