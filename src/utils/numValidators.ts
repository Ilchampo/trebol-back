export const numberInRange = (
    min: number,
    max: number,
    value?: number,
): boolean => value !== undefined && value >= min && value <= max;

export const isValueNumber = (value?: string): boolean => !isNaN(Number(value));

export const isPositiveInteger = (value: number): boolean =>
    Number.isInteger(value) && value > 0;
