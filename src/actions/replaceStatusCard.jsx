import 'whatwg-fetch';

export const replaceStatusCard = (url) => {
	return dispatch => {
		fetch(url)
			.then(
				response => {
					response.json()
						.then(
							data => {
								console.log("replaceStatusCard json succes");
								console.log(data);
							}
						)
						.catch(
							err => {
								console.log("replaceStatusCard json error");
								console.log(err);
							}
						)
				}
			)
			.catch(
				err => {
					console.log("replaceStatusCard catch");
				}
			);
	};
};