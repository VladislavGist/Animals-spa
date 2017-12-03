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
						dispatch({type: "DATASENT_TRUE", payload: true});
					}
				}
			)
			.catch(
				err => {
					dispatch({type: "DATASENT_ERROR", payload: "Ошибка"});
				}
			);
	};
};