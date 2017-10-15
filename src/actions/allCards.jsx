import 'whatwg-fetch';
let urlutils = require("url");

export const allCards = url => {
	return dispatch => {
		fetch(url)
			.then(response => {
				if(response.status !== 200) {
					console.log("all cards error");
				} else {
					response.json()
						.then(data => {
							let zaprosCount = 0;
							zaprosCount = urlutils.parse(url).pathname.split("/")[9];
							
							if(data[0]["COUNT(card_id)"] > zaprosCount) {
								dispatch({type: "COUNT_CARDS_TRUE", payload: true});
							} else {
								dispatch({type: "COUNT_CARDS_FALSE", payload: false});
							}
						});

				}
			})
			.catch(() => {
				console.log("add cards catch");
			});
	}
};
/*

*/