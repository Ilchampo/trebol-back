export const numberInRange = (
    min: number,
    max: number,
    value?: number,
): boolean => {
    if (!value) {
        return false;
    }

    return value >= min && value <= max;
};

export const isValueNumber = (value?: string): boolean => {
    if (!value) {
        return false;
    }

    const parsedInt = parseInt(value);

    return typeof parsedInt === 'number';
};
