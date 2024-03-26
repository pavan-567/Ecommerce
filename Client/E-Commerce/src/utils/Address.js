export function getAddresses() {
  const addresses = JSON.parse(localStorage.getItem("address"));
  return addresses ? addresses : [];
}

export function getSelectedAddr() {
  const selectedAddress = JSON.parse(localStorage.getItem("selectedAddr"));
  return selectedAddress ? selectedAddress.id : null;
}
