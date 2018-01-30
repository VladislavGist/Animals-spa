import 'whatwg-fetch'
import axios from 'axios'

import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

export const types = {
	LOGIN_FALSE: 'LOGIN_USER/LOGIN_FALSE',
	LOGIN_TRUE: 'LOGIN_USER/LOGIN_TRUE'
}

export const actions = {

	loginFalse: () => ({ type: types.LOGIN_FALSE, payload: false }),

	loginAction: url => dispatch => {
		axios.get(url)
			.then(
				response => dispatch({ type: types.LOGIN_TRUE, payload: response.data }),
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка в данных или пользователя не существует')))
			.catch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера loginAction'))
	},

	updateDatasTrue: url => dispatch => {
		axios.get(url)
			.then(
				response => dispatch({ type: types.LOGIN_TRUE, payload: response.data }),
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера при обновлении данных')))
			.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера updateDatasTruee')))
	}

}

export default (state = false, action) => {
	switch (action.type) {
	case types.LOGIN_FALSE: return action.payload
	case types.LOGIN_TRUE: return action.payload
	default: return state
	}
}