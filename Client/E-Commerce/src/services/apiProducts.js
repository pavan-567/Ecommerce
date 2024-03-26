import { getToken } from "../utils/auth";

export async function fetchProducts() {
  let link = `http://localhost:8000/api/products/all/`;
  const res = await fetch(link);
  const data = await res.json();
  if (res.ok) return data;
  throw new Error(data.details);
}

export async function fetchProductsViaQuery(options) {
  let link =
    `http://localhost:8000/api/products/?` + new URLSearchParams(options);

  const res = await fetch(link);
  const data = await res.json();
  if (res.ok) return data;
  throw new Error(data.details);
}

export async function getProduct(id) {
  // const res = await fetch(`https://dummyjson.com/products/${id}`);
  const res = await fetch(`http://localhost:8000/api/products/${id}/`);
  const data = await res.json();
  if (res.ok) return data;
  console.log(data);

  throw new Error(data.details);
}

// ADMIN AREA !
export async function createProduct(productDetails) {
  const res = await fetch(`http://localhost:8000/api/products/create/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()?.access}`,
    },
    body: productDetails,
  });
  const data = await res.json();
  if (res.status === 201) return data;
  throw new Error(data);
}

export async function editProduct(productDetails) {
  console.log(productDetails);
  const { id: productId, formData } = productDetails;
  const res = await fetch(
    `http://localhost:8000/api/products/edit/${productId}/`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()?.access}`,
      },
      body: formData,
    }
  );
  const data = await res.json();
  return data;
}

export async function deleteProductImage(productImageId) {
  const res = await fetch(
    `http://localhost:8000/api/products/img/${productImageId}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()?.access}`,
      },
    }
  );

  const data = await res.json();
  return data;
}
