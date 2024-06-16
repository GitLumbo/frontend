const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export function isLoggedIn() {
  const token = localStorage.getItem("token");
  return token !== null;
}
export async function fetchAllPosts() {
  const res = await fetch(backendUrl + "/posts");
  return res;
}
export async function fetchUserProfile(token) {
  const res = await fetch(backendUrl + "/users/data/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.json();
}
export async function fetchProfileByToken(token) {
  const userIdRes = await fetch(backendUrl + "/users/data/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (userIdRes.ok) {
    const userData = await userIdRes.json();
    const userProfileRes = await fetch(
      backendUrl + `/users/profile/${userData.id}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await userProfileRes.json();
    return { ...userData, ...data, token: token };
  }
  return null;
}
export async function fetchUpdateProfile(formData, userId, token) {
  const res = await fetch(backendUrl + `/users/profile/${userId}/`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  });
  return res;
}
export async function fetchCreatePost(formData, token) {
  const res = await fetch(backendUrl + `/posts/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  });
  return res;
}
export async function fetchProfileData(id) {
  const res = await fetch(backendUrl + `/users/profile/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }

  return res.json();
}
export async function fetchPostsData(id) {
  const res = await fetch(backendUrl + `/users/posts/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts data");
  }
  return res.json();
}
export async function fetchLikedPostsData(id) {
  const res = await fetch(backendUrl + `/users/liked/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch liked posts data");
  }
  return res.json();
}

export async function fetchPostData(id) {
  const res = await fetch(backendUrl + `/posts/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch post data");
  }
  return res.json();
}

export async function fetchUpdatePost(formData, id, token) {
  const res = await fetch(backendUrl + `/posts/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts data");
  }
  return res;
}

export async function fetchRemovePost(id, token) {
  const res = await fetch(backendUrl + `/posts/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts data");
  }
  return res;
}

export async function fetchToggleLike(id, token) {
  console.log(token);
  const res = await fetch(backendUrl + `/posts/${id}/like`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res;
}
