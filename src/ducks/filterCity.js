export const types = {
	REPLACE_CITY: 'FILTER_CITY/REPLACE_CITY'
}

export const actions = {
	dispatchCityTopHeader: e => ({ type: 'REPLACE_CITY', payload: e })
}

const initialState = {
	cityTopHeader: 'Все регионы'
}

export default (state = initialState, action) => {

	switch (action.type) {

	case types.REPLACE_CITY: return {
		...state,
		cityTopHeader: action.payload
	}

	default: return state
	}
}