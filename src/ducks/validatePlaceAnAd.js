export const types = {
	VALIDATE_PLACE_TITLENAME: 'VAL_PLACE/VALIDATE_PLACE_TITLENAME',
	VALIDATE_PLACE_PHONENUMBER: 'VAL_PLACE/VALIDATE_PLACE_PHONENUMBER',
	VALIDATE_PLACE_TEXT: 'VAL_PLACE/VALIDATE_PLACE_TEXT',
	VALIDATE_PLCAE_PRICE: 'VAL_PLACE/VALIDATE_PLCAE_PRICE',
	PLACE_SUCCES_FALSE: 'VAL_PLACE/PLACE_SUCCES_FALSE',
	RESET_PLACE: 'VAL_PLACE/RESET_PLACE'
}

export const actions = {

	onValidateTitleName: e => dispatch => {
		dispatch({ type: types.VALIDATE_PLACE_TITLENAME, payload: e })
		dispatch({ type: types.PLACE_SUCCES_FALSE, payload: false })
	},

	onValidatePhoneNumber: e => dispatch => {
		dispatch({ type: types.VALIDATE_PLACE_PHONENUMBER, payload: e })
		dispatch({ type: types.PLACE_SUCCES_FALSE, payload: false })
	},

	onValidatePlaceText: e => dispatch => {
		dispatch({ type: types.VALIDATE_PLACE_TEXT, payload: e })
		dispatch({ type: types.PLACE_SUCCES_FALSE, payload: false })
	},

	onValidatePlacePrice: e => dispatch => {
		dispatch({ type: types.VALIDATE_PLCAE_PRICE, payload: e })
		dispatch({ type: types.PLACE_SUCCES_FALSE, payload: false })
	},

	onResetMessage: () => ({ type: types.PLACE_SUCCES_FALSE, payload: false }),

	onResetPlace: () => ({ type: types.RESET_PLACE })
}

const initialState = {
	city: ' ',
	titleName: ' ',
	phoneNumber: ' ',
	textContent: ' ',
	placePrice: ' ',
	isFetch: false,
	messagePlace: false
}

export default (state = initialState, action) => {

	switch (action.type) {

	case types.VALIDATE_PLACE_TITLENAME: return {
		...state,
		titleName: action.payload
	}

	case types.VALIDATE_PLACE_PHONENUMBER: return {
		...state,
		phoneNumber: action.payload
	}

	case types.VALIDATE_PLACE_TEXT: return {
		...state,
		textContent: action.payload
	}

	case types.VALIDATE_PLCAE_PRICE: return {
		...state,
		placePrice: action.payload
	}

	case types.PLACE_SUCCES_FALSE: return {
		...state,
		messagePlace: action.payload
	}

	case types.RESET_PLACE: return {
		...initialState,
		messagePlace: true
	}

	default: return state
	}
}