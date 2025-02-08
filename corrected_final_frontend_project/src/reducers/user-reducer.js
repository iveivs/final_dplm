import { AUTH_SUCCESS, AUTH_ERROR } from "../actions/authThunks";
import { LOGOUT } from "../actions/logout";

const initialState = {
    login: null,
    password: null,
    email: null,
    phone: null,
    wasLogout: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                wasLogout: false,
            };
        }
        case AUTH_ERROR: {
            return {
                ...state,
                login: null,
                email: null,
                phone: null,
                wasLogout: true,
            };
        }
        case LOGOUT: {
            return initialState;
        }
        default:
            return state;
    }
};

export default userReducer;
