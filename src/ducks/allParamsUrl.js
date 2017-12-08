export const types = {
	CHANGE_URL: 'ALL_PARAMS/CHANGE_URL'
}

export const actions = {
	onReplaceAllUrl: e => ({ type: types.CHANGE_URL, payload: e ? e : {} })
}

export default (state = {}, action) => {

	switch (action.type) {

	case types.CHANGE_URL: return action.payload

	default: return state
	}
}