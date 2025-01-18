export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';

export const removeProductFromCart = (id) => ({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: id,
});
