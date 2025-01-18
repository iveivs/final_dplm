// import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "../actions/cart-actions";
import { ADD_PRODUCT_TO_CART } from "../actions/add-product-to-cart";
import { REMOVE_PRODUCT_FROM_CART } from "../actions/remove-product-from-cart";
import { CLEAN_CART } from "../actions/clean-cart";

const initialState = {
    productOrder: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                productOrder: [...state.productOrder, action.payload]
            };
        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                productOrder: state.productOrder.filter(order => order.id !== action.payload)
            };
        case CLEAN_CART:
            return initialState
        default:
            return state;
    }
};

export default orderReducer;
