export const types = {
	TOOLTIP: 'CONT_FORM_STATUS/TOOLTIP',
	TOOLTIP_CLEAR: 'CONT_FORM_STATUS/TOOLTIP_CLEAR'
}

export const actions = {
	onHandleConnectClear: () => ({ type: types.TOOLTIP_CLEAR })
}

export default (state = false, action) => {

	switch (action.type) {

	case types.TOOLTIP: return action.payload

	case types.TOOLTIP_CLEAR: return false

	default: return state
	}
}