"use client";
import { useContext } from "react";
import UserContext from "@/app/components/UserContext";
import Navigation from "@/app/components/navigation";

const ProfileLayout = ({ children, modal }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navigation user={user} />
      {children}
      {modal}
    </div>
  );
};
export default ProfileLayout;
