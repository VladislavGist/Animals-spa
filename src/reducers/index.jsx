import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";

//reducers
import menuReducer from "./menuReducer.jsx";
import serverReducer from "./serverReducer.jsx";
import updateState from "./updateState.jsx";
import loginUser from "./loginReducer.jsx";
import sendData from "./sendData.jsx";
import allParamsUrl from "./allParamsUrl.jsx";
import photosReducer from "./photosReducer.jsx";
import validarePlaceAnAd from "./validarePlaceAnAd.jsx";
import accountType from "./accountType.jsx";
import userPersonalDatas from "./userPersonalDatas.jsx";
import preloader from "./preloader.jsx";
import filterCity from "./filterCity.jsx";
import toggleAddMoreBtn from "./toggleAddMoreBtn.jsx";
import regReducer from "./regReducer.jsx";
import reducerCardsComplAndRej from "./reducerCardsComplAndRej.jsx";
import contactFormStatus from "./contactFormStatus.jsx";

export default combineReducers({
	routing: routerReducer,
	menuReducer,
	serverReducer,
	updateState,
	loginUser,
	sendData,
	allParamsUrl,
	photosReducer,
	validarePlaceAnAd,
	accountType,
	userPersonalDatas,
	preloader,
	filterCity,
	toggleAddMoreBtn,
	regReducer,
	reducerCardsComplAndRej,
	contactFormStatus
});