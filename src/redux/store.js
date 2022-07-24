import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import weatherReducer from "./reducer";

export const rootReducer = combineReducers({
    weather: weatherReducer
});

export const store = createStore(rootReducer,
    compose(applyMiddleware(thunk)));   