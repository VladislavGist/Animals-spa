import axios from 'axios'
import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

export const types = {
	TOOLTIP: 'CONT_FORM_STATUS/TOOLTIP',
	TOOLTIP_CLEAR: 'CONT_FORM_STATUS/TOOLTIP_CLEAR'
}

export const actions = {

	connectMess: url => dispatch => {

		axios.get(url)
			.then(
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Отправлено')),
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Не отправлено'))
			)
			.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера')))
	},

	onHandleConnectClear: () => ({ type: types.TOOLTIP_CLEAR })
}

export default (state = false, action) => {
	switch (action.type) {
	case types.TOOLTIP: return action.payload
	case types.TOOLTIP_CLEAR: return false
	default: return state
	}
}