"use client";
import { useContext, useState } from "react";
import Navigation from "@/app/components/navigation";
import UserContext from "@/app/components/UserContext";

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
