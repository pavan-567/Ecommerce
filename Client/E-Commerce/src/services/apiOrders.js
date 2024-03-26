import { getToken } from "../utils/auth";

const BASE_URL = "http://localhost:8000/api/orders";

export async function placeOrder(orderData) {
  const res = await fetch(`${BASE_URL}/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken().access}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();
  if (res.ok) return data;
  throw new Error(data);
}

export async function getOrders() {
  const res = await fetch(`${BASE_URL}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
  });
  const data = await res.json();
  if (res.ok) return data;
  throw new Error(data);
}

export async function getAllOrders() {
  const res = await fetch(`${BASE_URL}/all/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) return data;
  throw new Error(data);
}

export async function getSingleOrder(id) {
  const res = await fetch(`${BASE_URL}/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
  });
  const data = await res.json();
  if (res.ok) return data;
  throw new Error(data);
}

export async function editOrder(orderData) {
  const { id, order } = orderData;
  const res = await fetch(`${BASE_URL}/edit/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
    body: JSON.stringify(order),
  });

  const data = await res.json();
  if (res.status === 202) return data;
  throw new Error(data);
}
