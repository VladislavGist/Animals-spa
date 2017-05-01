import 'whatwg-fetch';

export const loginAction = url => {
	return dispatch => {
		fetch(url)
			.then(response => {
				if(response.status !== 200) {
					response.json()
						.then(data => {
							dispatch({type: "LOGIN_FALSE", payload: data});
						});
				} else {
					response.json()
						.then(data => {
							dispatch({type: "LOGIN_TRUE", payload: data});
						});
				}
			})
			.catch((err) => {
				console.log(err);
			})
	};
};