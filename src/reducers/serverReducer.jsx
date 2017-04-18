let serverReducer;
export default serverReducer = (state = {advertisementList: []}, action) => {
	switch(action.type) {
		case "GET_DATA_SERVER":
			return {
				advertisementList: [
					...action.payload
				]
			}
			break;
		case "CLEAR_STATE":
			return {
				advertisementList: [
					...action.payload
				]
			}
			break;
		default:
			return state;
	}
};