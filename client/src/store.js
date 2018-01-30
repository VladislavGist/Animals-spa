import thunk from 'redux-thunk'
import { reducer } from 'redux-form'
import { combineReducers } from 'redux'
import { hashHistory } from 'react-router'
import { routerReducer } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

import loginUser from './ducks/loginUser'
import preloader from './ducks/preloader'
import filterCity from './ducks/filterCity'
import regReducer from './ducks/regReducer'
import menuReducer from './ducks/menuReducer'
import accountType from './ducks/accountType'
import allParamsUrl from './ducks/allParamsUrl'
import serverReducer from './ducks/serverReducer'
import photosReducer from './ducks/photosReducer'
import snackbarReducer from './ducks/snackbarReducer'
import toggleAddMoreBtn from './ducks/toggleAddMoreBtn'
import contactFormStatus from './ducks/contactFormStatus'
import reducerCardsComplAndRej from './ducks/reducerCardsComplAndRej'

const reducers = combineReducers({
	routing: routerReducer,
	form: reducer,
	loginUser,
	preloader,
	regReducer,
	filterCity,
	menuReducer,
	accountType,
	allParamsUrl,
	serverReducer,
	photosReducer,
	snackbarReducer,
	contactFormStatus,
	toggleAddMoreBtn,
	reducerCardsComplAndRej
})

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(routerMiddleware(hashHistory), thunk)))
export const history = syncHistoryWithStore(hashHistory, store)