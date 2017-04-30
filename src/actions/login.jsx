import 'whatwg-fetch';

export const loginAction = url => {
	console.log(url);
	return dispatch => {
		fetch(url)
			.then(response => {
				if(response.status !== 200) {
					response.json()
						.then(data => {
							console.log("LOGIN_FALSE");
							dispatch({type: "LOGIN_FALSE", payload: data});
						});
				} else {
					response.json()
						.then(data => {
							console.log("LOGIN_TRUE");
							dispatch({type: "LOGIN_TRUE", payload: data});
						});
				}
			})
			.catch((err) => {
				console.log(err);
			})
	};
};