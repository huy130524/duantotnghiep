export const getPrice = (data) => {
  const salePrice = parseFloat(data?.sale_price);
  const originalPrice = parseFloat(data?.price);

  if (salePrice > 0) {
    return salePrice;
  }

  return originalPrice;
};
