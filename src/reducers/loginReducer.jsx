const initialState = false;
let loginUser;

export default loginUser = (state = initialState, action) => {
	switch(action.type) {
		case "LOGIN_FALSE":
			return action.payload;
			break;
		case "LOGIN_TRUE":
			return action.payload;
			break;
		default:
			return state;
	}
}