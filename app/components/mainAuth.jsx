"use client";
import { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { fetchProfileByToken } from "@/app/lib/auth";

export default function AuthLayout({ children, modal }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await fetchProfileByToken(token);
        if (data !== null) {
          setUser(data);
        }
      }
    };
    checkAuth();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
      {modal}
    </UserContext.Provider>
  );
}
