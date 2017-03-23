let filterCity,
	initialState = {
		cityTopHeader: "Все регионы" 
	};

filterCity = (state = initialState, action) => {
	switch(action.type) {
		case "REPLACE_CITY":
			return {
				...state,
				cityTopHeader: action.payload
			}
			break;
		default:
			return state;
	}
};

export default filterCity;