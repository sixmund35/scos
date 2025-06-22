import { WeightUnit } from '@/enums/weightUnit';

export const convert = (
  from: WeightUnit,
  to: WeightUnit,
  weight: number,
): number => {
  if (from === to) {
    return weight;
  }

  switch (from) {
    case WeightUnit.GRAM:
      return fromGrams(to, weight);
    case WeightUnit.KILOGRAM:
      return fromKilograms(to, weight);
    default:
      throw new Error(
        `Unsupported weight unit conversion from ${from} to ${to}`,
      );
  }
};

const fromGrams = (to: WeightUnit, weight: number): number => {
  switch (to) {
    case WeightUnit.GRAM:
      return weight;
    case WeightUnit.KILOGRAM:
      return weight / 1000;
    default:
      throw new Error(`Unsupported weight unit conversion to ${to}`);
  }
};
const fromKilograms = (to: WeightUnit, weight: number): number => {
  switch (to) {
    case WeightUnit.GRAM:
      return weight * 1000;
    case WeightUnit.KILOGRAM:
      return weight;
    default:
      throw new Error(`Unsupported weight unit conversion to ${to}`);
  }
};
