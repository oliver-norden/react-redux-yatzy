import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {};

const middleWare = [thunk];

export default createStore(rootReducer, initialState, applyMiddleware(...middleWare))