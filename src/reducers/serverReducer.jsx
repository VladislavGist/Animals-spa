let serverReducer;
export default serverReducer = (state = {advertisementList: []}, action) => {
	switch(action.type) {
		case "GET_DATA_SERVER":
			return action.payload;
			break;
		case "CLEAR_STATE":
			return action.payload;
			break;
		default:
			return state;
	}
};