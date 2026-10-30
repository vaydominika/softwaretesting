import { requireNumber } from './validation.js';

export function calculateGrade(theory, practice) {
  requireNumber(theory, 'Theory score', 0, 60);
  requireNumber(practice, 'Practice score', 0, 40);
  if (theory < 30 || practice < 20) return 1;

  const total = theory + practice;
  if (total < 60) return 2;
  if (total < 70) return 3;
  if (total < 85) return 4;
  return 5;
}
