let allParamsUrl;
export default allParamsUrl = (state = {}, action) => {
	switch(action.type) {
		case "CHANGE_URL":
			return action.payload;
			break;
		default:
			return state;
	}
};