// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import { thunk } from "redux-thunk";
// import userReducer from './reducers/user-reducer';
// import orderReducer from './reducers/order-reducer';
// import modalReducer from './reducers/modal-reducer';

// const reducer = combineReducers({
//     currentUser: userReducer,
//     orderReducer: orderReducer,
//     modal: modalReducer,
// });

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store =  createStore(reducer, composeEnhancers(applyMiddleware(thunk)))


// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import { thunk } from "redux-thunk";
// import userReducer from './reducers/user-reducer';
// import orderReducer from './reducers/order-reducer';
// import modalReducer from './reducers/modal-reducer';
// import { productsReducer } from './reducers/productsReducer';
// import authReducer from './reducers/authReducer';

// const reducer = combineReducers({
//     currentUser: userReducer,
//     orderReducer: orderReducer,
//     modal: modalReducer,
//     products: productsReducer,
//     auth: authReducer,
// });

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import orderReducer from './reducers/order-reducer';
import modalReducer from './reducers/modal-reducer';
import { productsReducer } from './reducers/productsReducer';
import userReducer from './reducers/user-reducer'; // Будет обновлять данные авторизации и пользователя

const reducer = combineReducers({
    currentUser: userReducer, 
    orderReducer: orderReducer,
    modal: modalReducer,
    products: productsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

