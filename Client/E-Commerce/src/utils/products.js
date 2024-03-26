export function getDiscountedPriceForSingleItem(price, discountPercentage) {
  const discountedPrice = Math.round(price * (1 - discountPercentage / 100));
  return discountedPrice;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getCacheProducts() {
  const products = JSON.parse(localStorage.getItem("products"));
  return products ? products : [];
}
