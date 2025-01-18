export const ADD_USER = 'ADD_USER'

export const addUser = (login, password, email, wasLogout) => {
    console.log(object);
    return {
        type: ADD_USER,
        payload: {login, password, email, wasLogout}
    }
}