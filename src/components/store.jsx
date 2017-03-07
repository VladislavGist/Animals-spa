import {hashHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import combineReducers from "../reducers/index.jsx";
import {composeWithDevTools} from "redux-devtools-extension";

export let store = createStore(combineReducers ,composeWithDevTools(applyMiddleware(thunk)));
export let history = syncHistoryWithStore(hashHistory, store);