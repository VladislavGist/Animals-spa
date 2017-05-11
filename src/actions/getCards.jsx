import 'whatwg-fetch';
let urlutils = require("url");

export const getCards = url => {
	return dispatch => {
		fetch(url)
			.then(response => {
				if(response.status !== 200) {
					console.log("Ошибка" + response.status);
				} else {
					dispatch({type: "UPDATE_LOADING", payload: 80});
					response.json()
						.then(data => {
							//работа с данными
							dispatch({type: "CLEAR_STATE", payload: []});
							dispatch({type: "GET_DATA_SERVER", payload: data});

							//скрыть показать кнопку подгрузки объявлений при загрузке категории
							let allCount = 0;
							let zaprosCount = 0;
							zaprosCount = urlutils.parse(url).pathname.split("/")[9];

							//запрос к серверу и осуществление функционала
							fetch(url + "/allcount")
								.then(response => {
									if(response.status !== 200) {
										console.log("all cards error");
									} else {
										response.json()
											.then(data => {
												allCount = data[0]["COUNT(card_id)"];

												if(allCount > zaprosCount) {
													dispatch({type: "COUNT_CARDS_TRUE", payload: true});
												} else {
													dispatch({type: "COUNT_CARDS_FALSE", payload: false});
												}
											})
									}
								})
								.catch(() => {
									console.log("add cards catch");
								});
							
						})
						.then(() => {
							dispatch({type: "UPDATE_LOADING", payload: 100});
						});

					console.log("Запрос прошёл");
				}
			})
			.catch(() => {
				console.log("Ошибка. catch");
				console.log("url" + url);
				dispatch({type: "UPDATE_LOADING", payload: 10});
			});
	};
};