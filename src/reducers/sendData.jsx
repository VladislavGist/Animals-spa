let initialState = {
	login: {
		password: " ", 
		phoneNumber: " "
	},
	registration: {
		name: " ",
		surname: " ",
		phoneNumber: " ",
		password: " ",
		city: " ",
		email: " ",
		info: " "
	}
},
sendData;
export default sendData = (state = initialState, action) => {
	switch(action.type) {
		case "VALIDATE_PASSWORD":
			return {
				...state,
				login: {
					...state.login,
					password: action.payload
				}
			};
			break;
		case "VALIDATE_PNUMBER":
			return {
				...state,
				login: {
					...state.login,
					phoneNumber: action.payload
				}
			};
			break;
		case "VALIDATE_REG_NAME":
			return {
				...state,
				registration: {
					...state.registration,
					name: action.payload
				}
			};
			break;
		case "VALIDATE_REG_SURNAME":
			return {
				...state,
				registration: {
					...state.registration,
					surname: action.payload
				}
			};
			break;
		case "VALIDATE_REG_PHONENUMBER":
			return {
				...state,
				registration: {
					...state.registration,
					phoneNumber: action.payload
				}
			};
			break;
		case "VALIDATE_REG_PASSWORD":
			return {
				...state,
				registration: {
					...state.registration,
					password: action.payload
				}
			};
			break;
		case "VALIDATE_REG_CITY":
			return {
				...state,
				registration: {
					...state.registration,
					city: action.payload
				}
			};
			break;
		case "VALIDATE_REG_EMAIL":
			return {
				...state,
				registration: {
					...state.registration,
					email: action.payload
				}
			};
			break;
		default:
			return state;
	}
};