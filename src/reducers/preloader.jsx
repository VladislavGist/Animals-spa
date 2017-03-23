let preloader;
export default preloader = (state = {loading: 0}, action) => {
	switch(action.type) {
		case "UPDATE_LOADING":
			return {
				...state,
				loading: action.payload
			};
			break;
		case "RESET_LOADING":
			return {
				...state,
				loading: 0
			};
			break;
		default:
			return state;
	}
};