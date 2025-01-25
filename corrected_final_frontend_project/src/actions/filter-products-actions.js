export const FILTER_PRODUCTS_BY_NAME = "FILTER_PRODUCTS_BY_NAME";

export const filterProductsByName = (name) => {
    return {
        type: FILTER_PRODUCTS_BY_NAME,
        payload: name, 
    };
};
