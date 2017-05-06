import 'whatwg-fetch';

export const placeAnAdCard = (url, paramsUrl) => {
	return dispatch => {
		fetch(url, {
			method: "post",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: paramsUrl
		})
		.then(response => {
			console.log("Объявление отправлено на сервер");
			return "yes";
		})
		.catch(() => {
			console.log("Ошибка. catch");
			return "error";
		});
	};
};