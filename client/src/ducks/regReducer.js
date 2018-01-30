import axios from 'axios'
import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

export const types = {
	REG_STATUS: 'REG_REDUCER/REG_STATUS'
}

export const actions = {

	regAction: (url, param) => dispatch => {
		axios({
			method: 'post',
			url,
			data: `name=${ param.inpName }&surname=${ param.inpSurname }&phone=${ param.inpNumberReg }&password=${ param.inpPasswordReg }&city=${ param.inpCityReg }&email=${ param.inpEmailReg }`
		})
			.then(
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Вы успешно зарегистрированы')),
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка запроса регистрации')))
			.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar(`Ошибка сервера регистрации`)))
	}
}

export default (state = '', action) => {
	switch (action.type) {
	case types.REG_STATUS: return action.payload
	default: return state
	}
}