import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleWare)))