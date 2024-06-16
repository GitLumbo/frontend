"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Refresh = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  useEffect(() => {
    router.push(`/profile/${id}/`);
  }, []);
  return <></>;
};
export default Refresh;
