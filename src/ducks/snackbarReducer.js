export const types = {
	SNACKBAR: 'SNACKBAR_REDUCER/SNACKBAR'
}

export const actions = {
	snackbar: data => dispatch => {
		dispatch({ type: types.SNACKBAR, payload: data })
	}
}

export default (state = '', action) => {

	switch (action.type) {

	case types.SNACKBAR: return action.payload

	default: return state
	}
}