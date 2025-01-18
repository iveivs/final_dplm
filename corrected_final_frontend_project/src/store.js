import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import userReducer from './reducers/user-reducer';
import orderReducer from './reducers/order-reducer';
import modalReducer from './reducers/modal-reducer';

const reducer = combineReducers({
    currentUser: userReducer,
    orderReducer: orderReducer,
    modal: modalReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store =  createStore(reducer, composeEnhancers(applyMiddleware(thunk)))


