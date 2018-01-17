import axios from 'axios'

export const types = {
	TOOLTIP: 'CONT_FORM_STATUS/TOOLTIP',
	TOOLTIP_CLEAR: 'CONT_FORM_STATUS/TOOLTIP_CLEAR'
}

export const actions = {

	connectMess: url => dispatch => {

		fetch(url)
			.then(
				response => {
					response.json()
						.then(data => dispatch({ type: types.TOOLTIP, payload: data }))
						.catch(err => dispatch({ type: types.TOOLTIP, payload: err }))
				},
				err => console.log('Не отправлено', err)
			)
			.catch(() => dispatch({ type: 'TOOLTIP', payload: { message: 'Ошибка отправки сообщения' } }))
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