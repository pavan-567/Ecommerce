import { getToken } from "../utils/auth";

const BASE_URL = `http://127.0.0.1:8000/api/reviews`;

export async function createReview(review) {
  const res = await fetch(`${BASE_URL}/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
    body: JSON.stringify(review),
  });
}
