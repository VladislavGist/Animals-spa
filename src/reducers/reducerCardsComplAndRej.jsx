let reducerCardsComplAndRej;

export default reducerCardsComplAndRej = (state = [], action) => {
	switch(action.type) {
		case "GET_DATA_SERVER_COMPL_AND_REJ":
			return action.payload;
			break;
		case "CLEAR_STATE_GET_DATA_SERVER_COMPL_AND_REJ":
			return [];
			break;
		default:
			return state;
	}
};