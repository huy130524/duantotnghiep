import { formatPrice } from "./formatPrice";

export const getDiscount = (price, discount) => {
  if (!price || !discount) return null;

  let text = "";
  let value = 0;

  if (discount.discount_type === "fixed") {
    const discountValue = parseFloat(discount.discount);

    text = `-${formatPrice(discountValue)}`;
    value = discountValue;
  } else {
    const discountPercent = parseFloat(discount.discount);
    const discountValue = (price * discountPercent) / 100;
    const finalPrice = Math.min(
      discountValue,
      parseFloat(discount.maximum_amount)
    );
    const formattedDiscountValue = formatPrice(finalPrice);

    text = `-${formattedDiscountValue} (${discountPercent}%)`;
    value = finalPrice;
  }

  return {
    text: text,
    value: value,
  };
};
