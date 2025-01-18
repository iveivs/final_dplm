import { addUser } from "../actions/add-user";

export const AuthInitializer = (dispatch) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        fetch("http://localhost:3000/auth/user", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to authenticate token");
                }
                return response.json();
            })
            .then((data) => {
                
                dispatch(addUser(data.username, "", data.email, false));
            })
            .catch((error) => {
                console.error("Error restoring user session:", error);
                localStorage.removeItem("authToken");
            });
    }
};
