export function setCart(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function resetCart() {
  localStorage.removeItem("cartItems");
}

export function getCart() {
  const cart = JSON.parse(localStorage.getItem("cartItems"));
  if (!cart) return [];
  return cart;
}
