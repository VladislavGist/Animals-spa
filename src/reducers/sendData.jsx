let initialState = {
	login: {
		password: " ", 
		phoneNumber: " "
	},
	registration: {
		name: " ",
		phoneNumber: " ",
		password: " ",
		dublePassword: " ",
		city: " ",
		codeElement: false,
		code: " ",
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
		case "VALIDATE_REG_DUBL_PASSWORD":
			return {
				...state,
				registration: {
					...state.registration,
					dublePassword: action.payload
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
		case "CODE_VISIBLE":
			return {
				...state,
				registration: {
					...state.registration,
					codeElement: action.payload
				}
			};
			break;
		case "VALIDATE_CODE":
			return {
				...state,
				registration: {
					...state.registration,
					code: action.payload
				}
			};
			break;
		case "CODE_SENT":
			return {
				...state,
				registration: {
					...state.registration,
					info: action.payload
				}
			};
			break;
		case "CODE_TRUE":
			return {
				...state,
				registration: {
					...state.registration,
					info: action.payload
				}
			};
			break;
		case "CODE_FALSE":
			return {
				...state,
				registration: {
					...state.registration,
					info: action.payload
				}
			};
			break;
		default:
			return state;
	}
};