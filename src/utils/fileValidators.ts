export const isFileTypeValid = (fileType: string): boolean => {
    const validFileTypes = ['PDF', 'PNG'];
    return validFileTypes.includes(fileType.toUpperCase());
};
