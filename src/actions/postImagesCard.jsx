import 'whatwg-fetch';

export const postImagesCard = (url, thisFormData) => {
	return dispatch => {
		fetch(url
				, {body: thisFormData, method: "post"})
				.then(
					() => {
						console.log("Img переданно успешно");
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