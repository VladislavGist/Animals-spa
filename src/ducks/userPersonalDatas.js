import axios from 'axios'
import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

export const types = {
	VALIDATE_NAME_USERDATA: 'USER_PERSONAL_DATAS/VALIDATE_NAME_USERDATA',
	VALIDATE_PHONENUMBER_USERDATA: 'USER_PERSONAL_DATAS/VALIDATE_PHONENUMBER_USERDATA',
	VALIDATE_CITY_USERDATA: 'USER_PERSONAL_DATAS/VALIDATE_CITY_USERDATA',
	VALIDATE_PASSWORD_USERDATA: 'USER_PERSONAL_DATAS/VALIDATE_PASSWORD_USERDATA',
	DATASENT_TRUE: 'USER_PERSONAL_DATAS/DATASENT_TRUE',
	DATASENT_FALSE: 'USER_PERSONAL_DATAS/DATASENT_FALSE',
	DATASENT_ERROR: 'USER_PERSONAL_DATAS/DATASENT_ERROR'
}

export const actions = {

	validateNameDispatch: e => ({ type: types.VALIDATE_NAME_USERDATA, payload: e }),

	validatePhoneDispatch: e => ({ type: types.VALIDATE_PHONENUMBER_USERDATA, payload: e }),

	validateCityDispatch: e => ({ type: types.VALIDATE_CITY_USERDATA, payload: e }),

	validatePasswordDispatch: e => ({ type: types.VALIDATE_PASSWORD_USERDATA, payload: e }),

	handleDataSentFalse: () => ({ type: types.DATASENT_FALSE, payload: false }),

	updateUserDatas: url => dispatch => {
		axios.get(url)
			.then(
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Изменено')),
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера. Не изменено')))
			.catch(dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера')))
	}
}

const initialState = {
	password: '********',
	validateRoles: {
		name: ' ',
		phoneNumber: ' ',
		city: ' ',
		password: ' '
	},
	dataSent: false
}

// при загрузке приложения будут приходить данные с сервера и изменять этот state
export default (state = initialState, action) => {

	switch (action.type) {

	case types.VALIDATE_NAME_USERDATA: return {
		...state,
		validateRoles: {
			...state.validateRoles,
			name: action.payload
		}
	}

	case types.VALIDATE_PHONENUMBER_USERDATA: return {
		...state,
		validateRoles: {
			...state.validateRoles,
			phoneNumber: action.payload
		}
	}

	case types.VALIDATE_CITY_USERDATA: return {
		...state,
		validateRoles: {
			...state.validateRoles,
			city: action.payload
		}
	}

	case types.VALIDATE_PASSWORD_USERDATA: return {
		...state,
		validateRoles: {
			...state.validateRoles,
			password: action.payload
		}
	}

	case types.DATASENT_TRUE: return {
		...state,
		dataSent: action.payload
	}

	case types.DATASENT_FALSE: return {
		...state,
		dataSent: action.payload
	}

	case types.DATASENT_ERROR: return {
		...state,
		dataSent: action.payload
	}

	default: return state
	}
}