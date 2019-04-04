import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { routerReducer } from 'react-router-redux'
import { reducer, change, actionTypes } from 'redux-form'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'react-router-redux'

import auth from './ducks/auth'
import preloader from './ducks/preloader'
import filterCity from './ducks/filterCity'
import menuReducer from './ducks/menuReducer'
import accountType from './ducks/accountType'
import allParamsUrl from './ducks/allParamsUrl'
import articles from './ducks/articles'
import photosReducer from './ducks/photosReducer'
import snackbarReducer from './ducks/snackbarReducer'
import toggleAddMoreBtn from './ducks/toggleAddMoreBtn'
import contactFormStatus from './ducks/contactFormStatus'

const reducers = combineReducers({
	routing: routerReducer,
	form: reducer,
	auth,
	preloader,
	filterCity,
	menuReducer,
	accountType,
	allParamsUrl,
	articles,
	photosReducer,
	snackbarReducer,
	contactFormStatus,
	toggleAddMoreBtn
})

const deleteInregisteredFields = ({ dispatch }) => next => action => {
	if (action.type === actionTypes.UNREGISTER_FIELD) {
		dispatch(change(action.meta.form, action.payload.name, null))
	}
	next(action)
}

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(routerMiddleware(hashHistory), deleteInregisteredFields, thunk))(createStore)

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(reducers, initialState)
	return store
}
