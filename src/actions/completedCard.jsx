import 'whatwg-fetch';

export const completedCard = (url, param) => {
	return dispatch => {
		fetch(url)
		.then(
			response => {
				console.log("Успешно остановлено");
			}
		)
		.catch(
			err => {
				console.log("Ошибка запроса на завершение");
			}
		);
	};
};