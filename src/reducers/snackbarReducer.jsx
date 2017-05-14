let snackbarReducer;
export default snackbarReducer = (state = "", action) => {
	switch(action.type) {
		case "SNACKBAR":
			return action.payload;
			break;
		default:
			return state;
	}
};