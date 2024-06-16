"use client";
import { useEffect, useState } from "react";
import Navigation from "../components/navigation";
import { isLoggedIn } from "../lib/auth";

const CreateLayout = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);
  return (
    <div>
      <Navigation isLoggedIn={loggedIn} />
      {children}
    </div>
  );
};
export default CreateLayout;
