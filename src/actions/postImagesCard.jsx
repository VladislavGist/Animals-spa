import 'whatwg-fetch';

export const postImagesCard = (url, thisFormData, anAdUrl, anAdParapms) => {
	return dispatch => {
		fetch(url
				, {body: thisFormData, method: "post"})
				.then(
					() => {
						console.log("Img переданно успешно");

						fetch(anAdUrl, {
							method: "post",
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							body: anAdParapms
						})
						.then(response => {
							console.log("Объявление отправлено на сервер");
						})
						.catch(() => {
							console.log("Ошибка. catch");
						});
					},
					() => {
						console.log("Img переданно не успешно");
					}
					
				)
				.catch(() => {
					console.log("Img catch");
				});
	};
};