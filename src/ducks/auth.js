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

	LOGOUT_REQUEST: `${ appName }/${ moduleName }/LOGOUT_REQUEST`
}

export const actions = {
	loginFalse: () => dispatch => {
		dispatch({ type: types.LOGOUT_REQUEST })
		localStorage.removeItem('token')
		dispatch(push('/'))
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
		dispatch({ type: types.REGISTRATION_REQUEST })

		fetch(`${ config.payPetsApiUrl }/api/auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password,
				name,
				lastName: surName,
				city,
				phoneNumber
			})
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(result => {
				dispatch({ type: types.REGISTRATION_SUCCESS })
				dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
			})
			.catch(err => {
				err.then(res => {
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: types.REGISTRATION_ERROR })
				})
			})
	},

	updateDatasTrue: url => dispatch => {

	}

}

export default (state = new ReducerSchema(), action) => {
	const { type, user } = action

	switch (type) {
	case types.AUTH_REQUEST: return {
		userLoading: true,
		userError: false
	}
	case types.AUTH_SUCCESS: return {
		userLoading: false,
		userError: false,
		user
	}
	case types.AUTH_ERROR: return {
		userError: true,
		userLoading: false
	}

	case types.REGISTRATION_REQUEST: return {
		userLoading: true,
		userError: false
	}
	case types.REGISTRATION_SUCCESS: return {
		userLoading: false,
		userError: false
	}
	case types.REGISTRATION_ERROR: return {
		userError: true,
		userLoading: false
	}

	case types.LOGOUT_REQUEST: return {
		user: null,
		userLoading: false,
		userError: false
	}

	default: return state
	}
}