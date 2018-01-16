export const types = {
	VALIDATE_PASSWORD: 'SEND_DATA/VALIDATE_PASSWORD',
	VALIDATE_PNUMBER: 'SEND_DATA/VALIDATE_PNUMBER',
	VALIDATE_REG_NAME: 'SEND_DATA/VALIDATE_REG_NAME',
	VALIDATE_REG_SURNAME: 'SEND_DATA/VALIDATE_REG_SURNAME',
	VALIDATE_REG_PHONENUMBER: 'SEND_DATA/VALIDATE_REG_PHONENUMBER',
	VALIDATE_REG_PASSWORD: 'SEND_DATA/VALIDATE_REG_PASSWORD',
	VALIDATE_REG_CITY: 'SEND_DATA/VALIDATE_REG_CITY',
	VALIDATE_REG_EMAIL: 'SEND_DATA/VALIDATE_REG_EMAIL'
}

export const actions = {
	onValidatePassword: e => ({ type: types.VALIDATE_PASSWORD, payload: e }),
	onValidatePhoneNumber: e => ({ type: types.VALIDATE_PNUMBER, payload: e }),
	onValidateRegName: e => ({ type: types.VALIDATE_REG_NAME, payload: e }),
	onValidateRegSurname: e => ({ type: types.VALIDATE_REG_SURNAME, payload: e }),
	onvalidateRegPhone: e => ({ type: types.VALIDATE_REG_PHONENUMBER, payload: e }),
	onRegValidatePassword: e => ({ type: types.VALIDATE_REG_PASSWORD, payload: e }),
	onValidateRegCity: e => ({ type: types.VALIDATE_REG_CITY, payload: e }),
	onValidateRegEmail: e => ({ type: types.VALIDATE_REG_EMAIL, payload: e })
}

export const initialState = {
	login: {
		password: ' ',
		phoneNumber: ' '
	},
	registration: {
		name: ' ',
		surname: ' ',
		phoneNumber: ' ',
		password: ' ',
		city: ' ',
		email: ' ',
		info: ' '
	}
}

export default (state = initialState, action) => {

	switch (action.type) {

	case types.VALIDATE_PASSWORD: return {
		...state,
		login: {
			...state.login,
			password: action.payload
		}
	}

	case types.VALIDATE_PNUMBER: return {
		...state,
		login: {
			...state.login,
			phoneNumber: action.payload
		}
	}

	case types.VALIDATE_REG_NAME: return {
		...state,
		registration: {
			...state.registration,
			name: action.payload
		}
	}

	case types.VALIDATE_REG_SURNAME: return {
		...state,
		registration: {
			...state.registration,
			surname: action.payload
		}
	}

	case types.VALIDATE_REG_PHONENUMBER: return {
		...state,
		registration: {
			...state.registration,
			phoneNumber: action.payload
		}
	}

	case types.VALIDATE_REG_PASSWORD: return {
		...state,
		registration: {
			...state.registration,
			password: action.payload
		}
	}

	case types.VALIDATE_REG_CITY: return {
		...state,
		registration: {
			...state.registration,
			city: action.payload
		}
	}

	case types.VALIDATE_REG_EMAIL: return {
		...state,
		registration: {
			...state.registration,
			email: action.payload
		}
	}

	default: return state
	}
}