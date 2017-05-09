let contactFormStatus;
export default contactFormStatus = (state = false, action) => {
	switch(action.type) {
		case "TOOLTIP":
			return action.payload;
			break;
		case "TOOLTIP_CLEAR":
			return false;
			break;
		default:
			return state;
	}
};