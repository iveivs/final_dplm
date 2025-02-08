import { API_HOST } from "../config";
import { authSuccess } from "./authThunks"; 

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = () => ({ type: LOGIN_SUCCESS });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const loginUser = (username, password) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            const response = await fetch(`${API_HOST}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Invalid credentials");
            }

            const data = await response.json();
            localStorage.setItem("authToken", data.token);

            dispatch(authSuccess({ 
                username: data.username,
                email: data.email,
                phone: data.phone || null,
            }));

            dispatch(loginSuccess());
        } catch (error) {
            dispatch(loginFailure(error.message || "Invalid login or password."));
        }
    };
};

