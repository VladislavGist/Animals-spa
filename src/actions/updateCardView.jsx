import 'whatwg-fetch';

export const updateCardView = cardId => {
	return dispatch => {
		//обращемся к серверу
		fetch(process.env.URL + "/updatecardviews/" + cardId)  
			//если соединились
			.then(
				response => {
					if(response.status !== 200) {
						console.log("Ошибка" + response.status);
					} else {
						dispatch({type: "UPDATE_CARD_VIEW_SUCCESS"});
					}
				}
			)
			.catch(() => {
				dispatch({type: "UPDATE_CARD_VIEW_ERROR"});
			});
	}
};