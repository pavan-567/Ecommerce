export function getOrders() {
  return localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [];
}
