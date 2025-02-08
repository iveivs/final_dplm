import { AUTH_LOADING, AUTH_SUCCESS, AUTH_ERROR } from "../actions/authThunks";

const initialState = {
    loading: false,
    error: null,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOADING:
            return { ...state, loading: true, error: null };
        case AUTH_SUCCESS:
            return { ...state, loading: false, user: action.payload, error: null };
        case AUTH_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default authReducer; 

