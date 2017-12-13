export const types = {
	UPDATE_STATE: 'UPDATE_STATE/UPDATE_STATE'
}

export const actions = {
	getUpdateState: () => ({ type: types.UPDATE_STATE, payload: '' })
}

export default (state = [], action) => {

	switch (action.type) {

	case types.UPDATE_STATE: return action.payload

	default: return state
	}
}