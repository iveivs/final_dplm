import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
} from "../actions/productsActions";
import { FILTER_PRODUCTS_BY_NAME } from "../actions/filter-products-actions";
import { SORT_PRODUCTS_BY_PRICE } from "../actions/sort-products-actions";

const initialState = {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                filteredProducts: action.payload,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FILTER_PRODUCTS_BY_NAME: {
            const filtered = state.products.filter((product) =>
                product.name.toLowerCase().includes(action.payload.toLowerCase())
            );
            return {
                ...state,
                filteredProducts: filtered,
            };
        }
        case SORT_PRODUCTS_BY_PRICE: {
            const sortedProducts = [...state.filteredProducts];
            if (action.payload === "asc") {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else if (action.payload === "desc") {
                sortedProducts.sort((a, b) => b.price - a.price);
            }
            return {
                ...state,
                filteredProducts: sortedProducts,
            };
        }
        default:
            return state;
    }
};
