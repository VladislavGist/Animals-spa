import firebase from 'firebase'
import { Record } from 'immutable'
import { push } from 'react-router-redux'

import { appName } from '../config'
import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

import { normalizeFirebaseDatas } from '../ducks/utils'

export const moduleName = 'auth'

const ReducerSchema = Record({
	user: null,
	userDatas: null,
	userError: null,
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

		firebase.auth().signOut()
			.then(() => dispatch({ type: types.SIGN_OUT_SUCCESS }))
			.then(() => dispatch(push('/')))
			.catch(err => {
				console.log(err)
				dispatch({ type: types.SIGN_OUT_ERROR, payload: err })
			})
	},

	loginAction: ({ email, password }) => dispatch => {
		dispatch({ type: types.SIGN_IN_REQUEST })

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => {
				dispatch({ type: types.SIGN_IN_SUCCESS, payload: { user } })
			})
			.then(() => dispatch(push('/')))
			.catch(error => dispatch({ type: types.SIGN_IN_ERROR, error }))
	},

	signUp: ({ email, password, name, surName, city, phoneNumber }) => dispatch => {
		dispatch({ type: types.SIGN_UP_REQUEST })

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => {
				firebase.database().ref(`users/${ user.uid }`).set({
					articles: '',
					name,
					surName,
					email,
					city,
					role: 'user',
					accountType: 'PRIVATE_SELLER'
				})
				
				dispatch({ type: types.SIGN_UP_SUCCESS, payload: { ...user } })
				dispatch(actionsSnackbarReducer.handleSnackbar('Успешная регистрация'))
			})
			.then(() => dispatch(push('/')))
			.catch(error => {
				dispatch({ type: types.SIGN_UP_ERROR, error })
				dispatch(actionsSnackbarReducer.handleSnackbar(`Ошибка сервиса при регистрации: ${ error }`))
			})
	},

	updateDatasTrue: url => dispatch => {
		// axios.get(url)
		// 	.then(
		// 		response => dispatch({ type: types.LOGIN_TRUE, payload: response.data }),
		// 		() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера при обновлении данных')))
		// 	.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера updateDatasTruee')))
	}

}

export default (state = new ReducerSchema(), action) => {
	const { type, payload, userDatas, error } = action

	switch (type) {
	case types.SIGN_UP_REQUEST: return state.set('userLoading', true).set('userError', false).set('user', null)
	case types.SIGN_UP_SUCCESS: return state.set('userLoading', false).set('userError', false).set('user', payload)
	case types.SIGN_UP_ERROR: return state.set('userError', error)

	case types.SIGN_IN_REQUEST: return state.set('userLoading', true).set('userError', false)
	case types.SIGN_IN_SUCCESS: return state.set('userLoading', false).set('userError', false).set('user', payload).set('userDatas', userDatas)
	case types.SIGN_IN_ERROR: return state.set('userError', error)

	case types.SIGN_OUT_REQUEST: return state.set('userLoading', true)
	case types.SIGN_OUT_SUCCESS: return state.set('user', null).set('userError', null).set('userLoading', false).set('userDatas', null)
	case types.SIGN_OUT_ERROR: return state.set('userError', error)	

	default: return state
	}
}

firebase.auth().onAuthStateChanged(user => {
	const { store } = require('../routing')

	if (user) {
		firebase.database().ref(`users/${ user.uid }`).on('value', snapshot => {
			let value = snapshot.val()
			let articles = snapshot.val().articles

			store.dispatch({ type: types.SIGN_IN_SUCCESS, payload: user, userDatas: { ...value, articles: normalizeFirebaseDatas(articles) } })
		})
	}
})