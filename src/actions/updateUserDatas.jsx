import 'whatwg-fetch';

export const updateUserDatas = url => {
	console.log(url);
	return dispatch => {
		fetch(url)
			.then(
				response => {
					if(response.status !== 200) {
						dispatch({type: "DATASENT_ERROR", payload: "Ошибка"});
					} else {
						console.log("Изменение успешно отправлено");
						dispatch({type: "DATASENT_TRUE", payload: true});
					}
				}
			)
			.catch(
				err => {
					console.log("Catch fetch user data");
					dispatch({type: "DATASENT_ERROR", payload: "Ошибка"});
				}
			);
	};
};