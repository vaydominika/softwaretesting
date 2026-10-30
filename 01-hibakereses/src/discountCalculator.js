import { requireBoolean, requireNumber } from './validation.js';

export function calculateDiscountedPrice(orderValue, isVip = false) {
  requireNumber(orderValue, 'Order value', 0);
  requireBoolean(isVip, 'VIP flag');

  let discount = 0;
  if (orderValue >= 50000) {
    discount = 0.15;
  } else if (orderValue >= 25000) {
    discount = 0.10;
  } else if (orderValue >= 10000) {
    discount = 0.05;
  }
  if (isVip) discount += 0.05;

  return orderValue * (1 - Math.min(discount, 0.20));
}
