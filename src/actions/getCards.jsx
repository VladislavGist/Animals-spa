import 'whatwg-fetch';

export const getCards = url => {
	return dispatch => {
		fetch(url)
			.then(response => {
				if(response.status !== 200) {
					console.log("Ошибка" + response.status);
					dispatch({type: "UPDATE_LOADING", payload: 20});
				} else {
					dispatch({type: "UPDATE_LOADING", payload: 80});
					response.json()
						.then(data => {
							dispatch({type: "CLEAR_STATE", payload: []});
							dispatch({type: "GET_DATA_SERVER", payload: data});
						})
						.then(() => {
							dispatch({type: "UPDATE_LOADING", payload: 100});
						});

					console.log("Запрос прошёл");
				}
			})
			.catch(() => {
				console.log("Ошибка. catch");
				console.log("url" + url);
				dispatch({type: "UPDATE_LOADING", payload: 10});
			});
	};
};