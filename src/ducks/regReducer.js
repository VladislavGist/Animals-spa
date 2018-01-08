import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

export const types = {
	REG_STATUS: 'REG_REDUCER/REG_STATUS',
	REG_STATUS_CLEAR: 'REG_REDUCER/REG_STATUS_CLEAR'
}

export const actions = {

	regAction: (url, param) => dispatch => {
		fetch(url, {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded'
			},
			body: `name=${param.inpName}&surname=${param.inpSurname}&phone=${param.inpNumberReg}&password=${param.inpPasswordReg}&city=${param.inpCityReg}&email=${param.inpEmailReg}`
		})
			.then(response => {
				response.json()
					.then(data => dispatch({ type: types.REG_STATUS, payload: data }))
					.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка запроса')))
			})
			.catch(err => dispatch(actionsSnackbarReducer.handleSnackbar(`Ошибка ${ err }`)))
	},

	onHandleRegStatusClear: () => ({ type: types.REG_STATUS_CLEAR })

}

export default (state = '', action) => {

	switch (action.type) {

	case types.REG_STATUS: return action.payload

	case types.REG_STATUS_CLEAR: return ''

	default: return state
	}
}