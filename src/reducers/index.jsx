import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";

//reducers
import menuReducer from "./menuReducer.jsx";
import serverReducer from "./serverReducer.jsx";
import updateState from "./updateState.jsx";
import loginUser from "./loginReducer.jsx";
import sendData from "./sendData.jsx";
import allParamsUrl from "./allParamsUrl.jsx";

export default combineReducers({
	routing: routerReducer,
	menuReducer,
	serverReducer,
	updateState,
	loginUser,
	sendData,
	allParamsUrl
});