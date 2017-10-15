let snackbar;
export default snackbar = data => {
	return dispatch => {
		dispatch({type: "SNACKBAR", payload: data});
	}
};