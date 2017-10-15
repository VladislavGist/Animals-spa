let regReducer;
export default regReducer = (state = "", action) => {
	switch(action.type) {
		case "REG_STATUS":
			return action.payload
			break;
		case "REG_STATUS_CLEAR":
			return ""
			break;
		default:
			return state;
	}
};