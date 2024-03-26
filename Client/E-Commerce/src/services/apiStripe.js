const URL = `http://localhost:8000/api/orders/create-checkout-session/`;
import { getToken } from "../utils/auth";

export async function callStripeSession(formData) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.access}`,
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return data;
}
