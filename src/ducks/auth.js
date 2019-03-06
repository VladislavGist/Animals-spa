import { Record } from 'immutable'
import { push } from 'react-router-redux'

import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

import config from '../../config'

const appName = 'paypets'
export const moduleName = 'auth'

const ReducerSchema = Record({
	user: null,
	userError: false,
	userLoading: false
})

export const types = {
	AUTH_REQUEST: `${ appName }/${ moduleName }/AUTH_REQUEST`,
	AUTH_SUCCESS: `${ appName }/${ moduleName }/AUTH_SUCCESS`,
	AUTH_ERROR: `${ appName }/${ moduleName }/AUTH_ERROR`,

	REGISTRATION_REQUEST: `${ appName }/${ moduleName }/REGISTRATION_REQUEST`,
	REGISTRATION_SUCCESS: `${ appName }/${ moduleName }/REGISTRATION_SUCCESS`,
	REGISTRATION_ERROR: `${ appName }/${ moduleName }/REGISTRATION_ERROR`,

	LOGOUT_REQUEST: `${ appName }/${ moduleName }/LOGOUT_REQUEST`,
	LOGOUT_SUCCESS: `${ appName }/${ moduleName }/LOGOUT_SUCCESS`,
	LOGOUT_ERROR: `${ appName }/${ moduleName }/LOGOUT_ERROR`
}

export const actions = {
	loginFalse: () => dispatch => {
		dispatch({ type: types.SIGN_OUT_REQUEST })

	},

	getUserData: storageToken => dispatch => {
		fetch(`${ config.payPetsApiUrl }/api/auth/getUserData`, {
			headers: {
				'Authorization': `Bearer ${ storageToken }`
			}
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(user => {
				dispatch({ type: types.AUTH_SUCCESS, user })
			})
	},

	loginAction: ({ email, password }) => dispatch => {
		dispatch({ type: types.AUTH_REQUEST })

		fetch(`${ config.payPetsApiUrl }/api/auth/login`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ email, password })
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(user => {
				const { token } = user

				localStorage.setItem('token', token)
				dispatch({ type: types.AUTH_SUCCESS, user })
			})
			.catch(err => {
				err.then(res => {
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: types.AUTH_ERROR })
				})
			})
	},

	signUp: ({ email, password, name, surName, city, phoneNumber }) => dispatch => {
		dispatch({ type: types.SIGN_UP_REQUEST })

	},

	updateDatasTrue: url => dispatch => {

	}

}

export default (state = new ReducerSchema(), action) => {
	const { type, payload, userDatas, error } = action

	switch (type) {
	case types.AUTH_REQUEST: return {
		userLoading: true,
		userError: false
	}
	case types.AUTH_SUCCESS: return {
		userLoading: false,
		userError: false,
		user: action.user
	}
	case types.AUTH_ERROR: return {
		userError: true,
		userLoading: false
	}

	case types.REGISTRATION_REQUEST: return state.set('userLoading', true).set('userError', false).set('user', null)
	case types.REGISTRATION_SUCCESS: return state.set('userLoading', false).set('userError', false).set('user', payload)
	case types.REGISTRATION_ERROR: return state.set('userError', error).set('userLoading', false)

	case types.LOGOUT_REQUEST: return state.set('userLoading', true)
	case types.LOGOUT_SUCCESS: return state.set('user', null).set('userError', null).set('userLoading', false).set('userDatas', null)
	case types.LOGOUT_ERROR: return state.set('userError', error).set('userLoading', false)

	default: return state
	}
}