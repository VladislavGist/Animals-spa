import 'whatwg-fetch';

export const loadCardsComplAndRej = (url) => {
	console.log(url);
	return dispatch => {
		fetch(url)
			.then(
				response => {
					response.json()
						.then(data => {
							dispatch({type: "GET_DATA_SERVER_COMPL_AND_REJ", payload: data});
						})
						.catch(err => {
							console.log("loadCards json catch");
						});
				}
			)
			.catch(err => {
				console.log("loadCards fetch catch");
			});
	};
};