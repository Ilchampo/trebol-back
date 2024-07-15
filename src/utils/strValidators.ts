export const isString = (value: unknown): boolean =>
    typeof value === 'string' && value.trim().length > 0;
