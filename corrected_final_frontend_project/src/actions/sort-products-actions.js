export const SORT_PRODUCTS_BY_PRICE = "SORT_PRODUCTS_BY_PRICE";

export const sortProductsByPrice = (order) => ({
    type: SORT_PRODUCTS_BY_PRICE,
    payload: order,
});
