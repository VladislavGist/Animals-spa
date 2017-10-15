import 'whatwg-fetch';

export const regAction = (url, param) => {
	return dispatch => {
		fetch(url, {
			method: "post",
			headers: {
				 "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: `name=${param.inpName}&surname=${param.inpSurname}&phone=${param.inpNumberReg}&password=${param.inpPasswordReg}&city=${param.inpCityReg}&email=${param.inpEmailReg}`
		})
			.then(
				response => {
					response.json()
						.then(
							data => {
								dispatch({type: "REG_STATUS", payload: data})
							}
						)
						.catch(
							err => {
								dispatch({type: "REG_STATUS", payload: "Ошибка запроса"});
							}
						);
				})
			.catch(
					err => {
						dispatch({type: "REG_STATUS", payload: "Ошибка запроса"});
					}
				);
	};
};