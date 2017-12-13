import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import { hashHistory } from 'react-router'
import { routerReducer } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

import menuReducer from './ducks/menuReducer'
import serverReducer from './ducks/serverReducer'
import updateState from './ducks/updateState'
import loginUser from './ducks/loginUser'
import sendData from './ducks/sendData'
import allParamsUrl from './ducks/allParamsUrl'
import photosReducer from './ducks/photosReducer'
import validarePlaceAnAd from './ducks/validarePlaceAnAd'
import accountType from './ducks/accountType'
import userPersonalDatas from './ducks/userPersonalDatas'
import preloader from './ducks/preloader'
import filterCity from './ducks/filterCity'
import toggleAddMoreBtn from './ducks/toggleAddMoreBtn'
import regReducer from './ducks/regReducer'
import reducerCardsComplAndRej from './ducks/reducerCardsComplAndRej'
import contactFormStatus from './ducks/contactFormStatus'
import snackbarReducer from './ducks/snackbarReducer'

const reducers = combineReducers({
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
	contactFormStatus,
	snackbarReducer
})

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(routerMiddleware(hashHistory), thunk)))
export const history = syncHistoryWithStore(hashHistory, store)