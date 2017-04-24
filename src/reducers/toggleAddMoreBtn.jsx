let toggleAddMoreBtn;
export default toggleAddMoreBtn = (state = false, action)=> {
	switch(action.type) {
		case "COUNT_CARDS_TRUE":
			return action.payload;
		case "COUNT_CARDS_FALSE":
			return action.payload;
		default:
			return state;
	}
};