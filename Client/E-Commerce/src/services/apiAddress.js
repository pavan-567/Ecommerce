import { getToken } from "../utils/auth";

const BASE_URL = "http://localhost:8000/api/shipments";

export async function createAddress(address) {
  const res = await fetch(`${BASE_URL}/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken().access}`,
    },
    body: JSON.stringify(address),
  });
  const data = await res.json();
  console.log(data);
  if (res.ok) return data;
  throw new Error(data);
}

export async function editAddress(editedAddress) {
  const { id } = editedAddress;
  const res = await fetch(`${BASE_URL}/update/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken().access}`,
    },
    body: JSON.stringify(editedAddress),
  });
  const data = await res.json();
  if (res.ok) return data;
  throw new Error(data);
}

export async function deleteAddress(id) {
  const res = await fetch(`${BASE_URL}/delete/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
  });
  const data = await res.json();
  if (res.ok) return data;
  throw new Error(data);
}

export async function makeAddressDefault(id) {
  const res = await fetch(`${BASE_URL}/defaultAddr/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken().access}`,
    },
  });

  const data = await res.json();
  return data;
}

export async function fetchAddressWithId(id) {
  const res = await fetch(`${BASE_URL}/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
  });
  const data = await res.json();
  if (res.ok) return data;
  console.log(data);
  throw new Error(data);
}

export async function fetchAddress() {
  const res = await fetch(`${BASE_URL}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
  });

  const data = await res.json();
  if (res.ok) return data;

  if (res.status === 401) {
    throw new Error("Please Login To Access The Page!");
  }
  throw new Error(data);
}

export async function fetchAllUserAddresses(name) {
  const res = await fetch(`${BASE_URL}/admin/${name}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
  });
  const data = await res.json();

  if (res.ok) return data;
  throw new Error(data);
}
