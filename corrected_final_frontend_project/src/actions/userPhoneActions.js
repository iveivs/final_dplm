import { API_HOST } from "../config";
import { addUser } from "./add-user";

export const ADD_PHONE_REQUEST = "ADD_PHONE_REQUEST";
export const ADD_PHONE_SUCCESS = "ADD_PHONE_SUCCESS";
export const ADD_PHONE_FAILURE = "ADD_PHONE_FAILURE";

export const DELETE_PHONE_REQUEST = "DELETE_PHONE_REQUEST";
export const DELETE_PHONE_SUCCESS = "DELETE_PHONE_SUCCESS";
export const DELETE_PHONE_FAILURE = "DELETE_PHONE_FAILURE";


export const addPhone = (phone) => async (dispatch, getState) => {
    dispatch({ type: ADD_PHONE_REQUEST });
    try {
        const response = await fetch(`${API_HOST}/user/phone`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ phone }),
        });

        if (!response.ok) {
            throw new Error("Failed to add phone");
        }

        const data = await response.json(); 
        console.log("Response data from server (add phone):", data);

        const { currentUser } = getState();
        console.log("Current user in Redux:", currentUser);

        dispatch(
            addUser(
                currentUser.login,
                currentUser.password,
                currentUser.email,
                currentUser.wasLogout,
                data.phone 
            )
        );

        dispatch({ type: ADD_PHONE_SUCCESS, payload: data.phone });
    } catch (error) {
        console.error("Error adding phone:", error);
        dispatch({ type: ADD_PHONE_FAILURE, payload: error.message });
    }
};

export const deletePhone = () => async (dispatch, getState) => {
    dispatch({ type: DELETE_PHONE_REQUEST });
    try {
        const response = await fetch(`${API_HOST}/user/phone`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete phone");
        }

        const { currentUser } = getState();
        console.log("Current user before deleting phone:", currentUser);

        dispatch(
            addUser(
                currentUser.login,
                currentUser.password,
                currentUser.email,
                currentUser.wasLogout,
                null
            )
        );

        dispatch({ type: DELETE_PHONE_SUCCESS });
    } catch (error) {
        console.error("Error deleting phone:", error);
        dispatch({ type: DELETE_PHONE_FAILURE, payload: error.message });
    }
};
