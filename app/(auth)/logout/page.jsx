"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/app/components/UserContext";
const LogoutPage = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  }, []);
  return null;
};
export default LogoutPage;
