import { NextResponse } from "next/server";

export async function GET(req) {
  const authorization = req.headers.get("Authorization");
  if (!authorization) {
    return NextResponse.json({ message: "인증 실패" }, { status: 401 });
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const userIdRes = await fetch(backendUrl + "/users/data/", {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });

  if (userIdRes.ok) {
    const userData = await userIdRes.json();
    const userProfileRes = await fetch(
      backendUrl + `/users/profile/${userData.id}/`,
      {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      }
    );
    const data = await userProfileRes.json();
    return NextResponse.json({ ...userData, ...data });
  } else {
    return NextResponse.json({ message: "인증 실패" }, { status: 401 });
  }
}
