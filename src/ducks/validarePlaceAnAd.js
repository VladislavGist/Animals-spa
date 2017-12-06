export const types = {
	VALIDATE_PLACE_CITY: 'VAL_PLACE/VALIDATE_PLACE_CITY',
	VALIDATE_PLACE_TITLENAME: 'VAL_PLACE/VALIDATE_PLACE_TITLENAME',
	VALIDATE_PLACE_PHONENUMBER: 'VAL_PLACE/VALIDATE_PLACE_PHONENUMBER',
	VALIDATE_PLACE_TEXT: 'VAL_PLACE/VALIDATE_PLACE_TEXT',
	VALIDATE_PLCAE_PRICE: 'VAL_PLACE/VALIDATE_PLCAE_PRICE',
	VALIDATE_PLCAE_IMAGE: 'VAL_PLACE/VALIDATE_PLCAE_IMAGE',
	PLACE_SUCCES_FALSE: 'VAL_PLACE/PLACE_SUCCES_FALSE',
	RESET_PLACE: 'VAL_PLACE/RESET_PLACE'
}

const initialState = {
	city: ' ',
	titleName: ' ',
	phoneNumber: ' ',
	textContent: ' ',
	placePrice: ' ',
	placeImage: false,
	messagePlace: false
}

export default (state = initialState, action) => {

	switch (action.type) {

	case 'VALIDATE_PLACE_CITY': return {
		...state,
		city: action.payload
	}

	case 'VALIDATE_PLACE_TITLENAME': return {
		...state,
		titleName: action.payload
	}

	case 'VALIDATE_PLACE_PHONENUMBER': return {
		...state,
		phoneNumber: action.payload
	}

	case 'VALIDATE_PLACE_TEXT': return {
		...state,
		textContent: action.payload
	}

	case 'VALIDATE_PLCAE_PRICE': return {
		...state,
		placePrice: action.payload
	}

	case 'VALIDATE_PLCAE_IMAGE': return {
		...state,
		placeImage: action.payload
	}

	case 'PLACE_SUCCES_FALSE': return {
		...state,
		messagePlace: action.payload
	}

	case 'RESET_PLACE': return initialState

	default: return state
	}
}