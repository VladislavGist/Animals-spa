import 'whatwg-fetch';

export const loadCards = url => {
	return dispatch => {
		fetch(url)
			.then(
				response => {
					response.json()
						.then(data => {
							dispatch({type: "GET_DATA_SERVER", payload: data});
						})
						.catch(err => {
							console.log(err);
						});
				}
			)
			.catch(err => {
				console.log("loadCards fetch catch");
			});
	};
};