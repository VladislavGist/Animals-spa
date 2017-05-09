import 'whatwg-fetch';

let connectMess;
export default connectMess = url => {
	return dispatch => {
		fetch(url)
			.then(
				response => {
					response.json()
						.then(data => {
							dispatch({type: "TOOLTIP", payload: data});
						})
						.catch(err => {
							dispatch({type: "TOOLTIP", payload: data});
						});
				},
				response => {
					console.log("Не отправлено");
					console.log(response);
				}
			)
			.catch(err => {
				if(err) {
					dispatch({type: "TOOLTIP", payload: {message: "Ошибка отправки сообщения"}});
				}
			});
	}
};