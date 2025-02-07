import { ADD_PRODUCT_TO_CART } from "../actions/add-product-to-cart";
import { CLEAN_CART } from "../actions/clean-cart";
import { REMOVE_PRODUCT_FROM_CART } from "../actions/remove-product-from-cart";
import {
    INCREASE_PRODUCT_AMOUNT,
    DECREASE_PRODUCT_AMOUNT,
} from "../actions/cart-actions";

const initialState = {
    productOrder: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                productOrder: [...state.productOrder, action.payload],
            };
        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                productOrder: state.productOrder.filter(
                    (order) => order.id !== action.payload
                ),
            };
        case CLEAN_CART:
            return initialState;
        case INCREASE_PRODUCT_AMOUNT:
        case DECREASE_PRODUCT_AMOUNT:
            return {
                ...state,
                productOrder: action.payload,
            };
        default:
            return state;
    }
};

export default orderReducer;
