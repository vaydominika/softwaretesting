import { requireBoolean, requireNumber } from './validation.js';

export function calculateTicketPrice(age, isStudent = false, is3D = false) {
  requireNumber(age, 'Age', 0, 120);
  requireBoolean(isStudent, 'Student flag');
  requireBoolean(is3D, '3D flag');

  let ageDiscount = 0;
  if (age < 6) ageDiscount = 1;
  else if (age < 18) ageDiscount = 0.30;
  else if (age >= 65) ageDiscount = 0.40;

  const discount = Math.max(ageDiscount, isStudent ? 0.20 : 0);
  return 3000 * (1 - discount) + (is3D ? 800 : 0);
}
