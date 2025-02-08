import { API_HOST } from "../config";

export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";

export const authLoading = () => ({ type: AUTH_LOADING });
export const authSuccess = (userData) => ({
    type: AUTH_SUCCESS,
    payload: {
        login: userData.username,
        password: null,
        email: userData.email,
        wasLogout: false,
        phone: userData.phone || null,
    },
});
export const authError = (error) => ({ type: AUTH_ERROR, payload: error });

export const authenticateUser = () => async (dispatch) => {
    const token = localStorage.getItem("authToken");

    if (!token) return;

    dispatch(authLoading());

    try {
        const response = await fetch(`${API_HOST}/auth/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Не удалось аутентифицировать токен");
        }

        const data = await response.json();

        dispatch(authSuccess({
            username: data.username,
            email: data.email,
            phone: data.phone,
        }));
    } catch (error) {
        console.error("Ошибка при восстановлении сессии пользователя:", error);
        localStorage.removeItem("authToken");
        dispatch(authError(error.message));
    }
};
