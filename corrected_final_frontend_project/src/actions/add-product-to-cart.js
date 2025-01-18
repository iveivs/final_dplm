
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

export const addProductToCart = (productInfo) => ({
    type: ADD_PRODUCT_TO_CART,
    payload: productInfo,
})