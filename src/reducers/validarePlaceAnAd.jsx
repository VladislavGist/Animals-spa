let validarePlaceAnAd,
	initialState = {
		city: " ",
		titleName: " ",
		phoneNumber: " ",
		textContent: " ",
		placePrice: " ",
		placeImage: false,
		messagePlace: false
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
		case "VALIDATE_PLCAE_IMAGE":
			return {
				...state,
				placeImage: action.payload
			};
			break;
		case "RESET_PLACE":
			return {
				city: " ",
				titleName: " ",
				phoneNumber: " ",
				textContent: " ",
				placePrice: " ",
				placeImage: false,
				messagePlace: true
			};
			break;
		case "PLACE_SUCCES_FALSE":
			return {
				...state,
				messagePlace: action.payload
			};
			break;
		default:
			return state;
	}
};