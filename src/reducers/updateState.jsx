let updateState;
export default updateState = (state = [], action) => {
	switch(action.type) {
		case "UPDATE_STATE":
			return action.payload;
			break;
		default:
			return state;
	}
};