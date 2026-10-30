import { requireBoolean, requireNumber } from './validation.js';

export function calculateParkingFee(minutes, isWeekend = false, isVip = false) {
  requireNumber(minutes, 'Parking duration', 0);
  requireBoolean(isWeekend, 'Weekend flag');
  requireBoolean(isVip, 'VIP flag');
  if (minutes <= 15) return 0;

  // A day is a consecutive 24-hour block. The free period applies once per stay.
  const fullDays = Math.floor(minutes / 1440);
  const remainingMinutes = minutes % 1440;
  const normalFee = fullDays * 5000 + Math.min(Math.ceil(remainingMinutes / 60) * 600, 5000);
  return normalFee * (isWeekend ? 0.5 : 1) * (isVip ? 0.8 : 1);
}
