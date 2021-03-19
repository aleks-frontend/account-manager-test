// Helper function for validating UUID inputs
export const isValidUUID = (str) => {
    const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return uuidRegExp.test(str);
};
