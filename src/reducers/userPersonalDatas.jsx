let userPersonalDatas,
	initialState = {
		password: "********",
		validateRoles: {
			name: " ",
			phoneNumber: " ",
			city: " ",
			password: " "
		},
		dataSent: false
	};

//при загрузке приложения будут приходить данные с с ервера
//и изменять этот state

userPersonalDatas = (state = initialState, action) => {
	switch(action.type) {
		case "VALIDATE_NAME_USERDATA":
			return {
				...state,
				validateRoles: {
					...state.validateRoles,
					name: action.payload
				}
			}
			break;
		case "VALIDATE_PHONENUMBER_USERDATA":
			return {
				...state,
				validateRoles: {
					...state.validateRoles,
					phoneNumber: action.payload
				}
			}
			break;
		case "VALIDATE_CITY_USERDATA":
			return {
				...state,
				validateRoles: {
					...state.validateRoles,
					city: action.payload
				}
			}
			break;
		case "VALIDATE_PASSWORD_USERDATA":
			return {
				...state,
				validateRoles: {
					...state.validateRoles,
					password: action.payload
				}
			}
			break;
		case "DATASENT_TRUE":
			return {
				...state,
				dataSent: action.payload
			}
			break;
		case "DATASENT_FALSE":
			return {
				...state,
				dataSent: action.payload
			}
			break;
		case "DATASENT_ERROR":
			return {
				...state,
				dataSent: action.payload
			}
			break;
		default:
			return state;
	}
};

export default userPersonalDatas;