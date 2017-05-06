import 'whatwg-fetch';

export const postImagesCard = (url, thisFormData) => {
	return dispatch => {
		fetch(url
				, {body: thisFormData, method: "post"})
				.then(
					() => {
						console.log("Img переданно успешно");
						return "yes";
					},
					() => {
						console.log("Img переданно не успешно");
						return "no";
					}
				)
				.catch(() => {
					console.log("Img catch");
					return "error";
				});
	};
};