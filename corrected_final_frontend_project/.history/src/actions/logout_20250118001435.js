export const LOGOUT = 'LOGOUT';

export const logout = () => {
    localStorage.removeItem("authToken");
    return {
        type: LOGOUT,
    };
};
