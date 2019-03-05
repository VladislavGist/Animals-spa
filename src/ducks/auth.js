import { Record } from 'immutable'
import { push } from 'react-router-redux'

import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

const appName = 'paypets'
export const moduleName = 'auth'

const ReducerSchema = Record({
	user: null,
	userDatas: null,
	userError: false,
	userLoading: false
})

export const types = {
	SIGN_UP_REQUEST: `${ appName }/${ moduleName }/SIGN_UP_REQUEST`,
	SIGN_UP_SUCCESS: `${ appName }/${ moduleName }/SIGN_UP_SUCCESS`,
	SIGN_UP_ERROR: `${ appName }/${ moduleName }/SIGN_UP_ERROR`,

	SIGN_IN_REQUEST: `${ appName }/${ moduleName }/SIGN_IN_REQUEST`,
	SIGN_IN_SUCCESS: `${ appName }/${ moduleName }/SIGN_IN_SUCCESS`,
	SIGN_IN_ERROR: `${ appName }/${ moduleName }/SIGN_IN_ERROR`,

	SIGN_OUT_REQUEST: `${ appName }/${ moduleName }/SIGN_OUT_REQUEST`,
	SIGN_OUT_SUCCESS: `${ appName }/${ moduleName }/SIGN_OUT_SUCCESS`,
	SIGN_OUT_ERROR: `${ appName }/${ moduleName }/SIGN_OUT_ERROR`
}

export const actions = {
	loginFalse: () => dispatch => {
		dispatch({ type: types.SIGN_OUT_REQUEST })


	},

	loginAction: ({ email, password }) => dispatch => {
		dispatch({ type: types.SIGN_IN_REQUEST })

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
	case types.SIGN_UP_REQUEST: return state.set('userLoading', true).set('userError', false).set('user', null)
	case types.SIGN_UP_SUCCESS: return state.set('userLoading', false).set('userError', false).set('user', payload)
	case types.SIGN_UP_ERROR: return state.set('userError', error).set('userLoading', false)

	case types.SIGN_IN_REQUEST: return state.set('userLoading', true).set('userError', false)
	case types.SIGN_IN_SUCCESS: return state.set('userLoading', false).set('userError', false).set('user', payload).set('userDatas', userDatas)
	case types.SIGN_IN_ERROR: return state.set('userError', error).set('userLoading', false)

	case types.SIGN_OUT_REQUEST: return state.set('userLoading', true)
	case types.SIGN_OUT_SUCCESS: return state.set('user', null).set('userError', null).set('userLoading', false).set('userDatas', null)
	case types.SIGN_OUT_ERROR: return state.set('userError', error).set('userLoading', false)

	default: return state
	}
}