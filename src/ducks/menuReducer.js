import config from '../../config'

import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

const appName = 'paypets'
const moduleName = 'menu'

export const types = {
	GET_CATEGORIES_REQUEST: `${ appName }/${ moduleName }/GET_CATEGORIES_REQUEST`,
	GET_CATEGORIES_SUCCESS: `${ appName }/${ moduleName }/GET_CATEGORIES_SUCCESS`,
	GET_CATEGORIES_ERROR: `${ appName }/${ moduleName }/GET_CATEGORIES_ERROR`,

	GET_MENU_REQUEST: `${ appName }/${ moduleName }/GET_MENU_REQUEST`,
	GET_MENU_SUCCESS: `${ appName }/${ moduleName }/GET_MENU_SUCCESS`,
	GET_MENU_ERROR: `${ appName }/${ moduleName }/GET_MENU_ERROR`,

	SWITCH_MENU: 'MENU_REDUCER/SWITCH_MENU',
	SWITCH_MENU_CLEAR: 'MENU_REDUCER/SWITCH_MENU_CLEAR'
}

export const actions = {
	getCategories: city => dispatch => {
		dispatch({ type: types.GET_CATEGORIES_REQUEST })

		const cityQuerySearch = city && city !== 'Все регионы' ? `city=${ city }` : ''

		fetch(`${ config.payPetsApiUrl }/api/menu/getAnimalCategories?${ cityQuerySearch }`)
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(payload => {
				dispatch({ type: types.GET_CATEGORIES_SUCCESS, payload })
			})
			.catch(err => {
				err.then(res => {
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: types.GET_CATEGORIES_ERROR })
				})
			})
	},
	getMenu: (city = '', animalType = '') => dispatch => {
		dispatch({ type: types.GET_MENU_REQUEST })

		const cityQuerySearch = city && city !== 'Все регионы' ? `city=${ city }&` : ''

		fetch(`${ config.payPetsApiUrl }/api/menu/getMenu?${ cityQuerySearch }animalType=${ animalType }`)
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(payload => {
				dispatch({ type: types.GET_MENU_SUCCESS, payload })
			})
			.catch(err => {
				err.then(res => {
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: types.GET_MENU_ERROR })
				})
			})
	}
}

const initialState = [
	{
		fetchingMenu: false,
		errorRetchingMenu: false,
		menu: {},

		fetchingCategories: false,
		errorFetchCategories: false,
		categories: []
	}
]

export default (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {

	case types.GET_CATEGORIES_REQUEST: return {
		...state,
		fetchingCategories: true,
		errorFetchCategories: false,
		categories: []
	}
	case types.GET_CATEGORIES_SUCCESS: return {
		...state,
		fetchingCategories: false,
		errorFetchCategories: false,
		categories: payload
	}
	case types.GET_CATEGORIES_ERROR: return {
		...state,
		fetchingCategories: false,
		errorFetchCategories: true,
		categories: []
	}

	case types.GET_MENU_REQUEST: return {
		...state,
		fetchingMenu: true,
		errorRetchingMenu: false,
		menu: {}
	}
	case types.GET_MENU_SUCCESS: return {
		...state,
		fetchingMenu: false,
		errorRetchingMenu: false,
		menu: payload
	}
	case types.GET_MENU_ERROR: return {
		...state,
		fetchingMenu: false,
		errorRetchingMenu: true,
		menu: {}
	}

	case types.SWITCH_MENU: return payload
	case types.SWITCH_MENU_CLEAR: return []

	default: return state
	}
}