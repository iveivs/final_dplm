export const LOGOUT = 'LOGOUT';

export const logout = () => {
    localStorage.removeItem("authToken"); // Удаляем токен из localStorage
    return {
        type: LOGOUT,
    };
};
