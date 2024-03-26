import { getToken } from "../utils/auth";

const BASE_URL = `http://127.0.0.1:8000/api`;

export async function login(user) {
  const res = await fetch(`${BASE_URL}/token/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error("Invalid Credentials!");
  }
  return data;
}

export async function getProfileDetails() {
  const res = await fetch(`${BASE_URL}/profile/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
  });
  const data = await res.json();
  if (res.ok) return data;
  throw new Error(data);
}

export async function changeProfileImage(formData) {
  const res = await fetch(`${BASE_URL}/changeProfilePic/`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${getToken()?.access}`,
    },
  });
  const data = await res.json();
  return data;
}

export async function editProfile(formData) {
  const res = await fetch(`${BASE_URL}/edit/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()?.access}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (res.ok) return data;
  throw new Error(data);
}

export async function signUp(credentials) {
  const res = await fetch(`${BASE_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (res.status === 201) {
    return data;
  }
  console.log(data);
  const keys = Object.keys(data);

  let message = "";

  for (let key in keys) {
    message += Number(key) + 1 + ". " + data[keys[key]][0] + "\n";
  }

  throw new Error(message);
}

export async function changePassword(passwords) {
  const res = await fetch(`${BASE_URL}/password/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()?.access}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwords),
  });
  const data = await res.json();
  if (res.ok) return data.message;
  throw new Error(data.message);
}

export async function getNewToken() {
  const res = await fetch(`${BASE_URL}/token/refresh/`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: getToken()?.refresh }),
  });

  const token = await res.json();
  return token;
}
