let validarePlaceAnAd,
	initialState = {
		city: " ",
		titleName: " ",
		phoneNumber: " ",
		textContent: " ",
		placePrice: " "
	}

export default validarePlaceAnAd = (state = initialState, action) => {
	switch(action.type) {
		case "VALIDATE_PLACE_CITY":
			return {
				...state,
				city: action.payload
				
			};
			break;
		case "VALIDATE_PLACE_TITLENAME":
			return {
				...state,
				titleName: action.payload
			};
			break;
		case "VALIDATE_PLACE_PHONENUMBER":
			return {
				...state,
				phoneNumber: action.payload
			};
			break;
		case "VALIDATE_PLACE_TEXT":
			return {
				...state,
				textContent: action.payload
			};
			break;
		case "VALIDATE_PLCAE_PRICE":
			return {
				...state,
				placePrice: action.payload
			};
			break;
		default:
			return state;
	}
};