let jsonDatas,
	initialState = {
		"animal-type": "cats",
		"advertisment-type": "sale",
		"advertisementList": [
			{
				"id": "4t34gg43",
				"title": "Сеамская кошка",
				"briefDescription": "Описание объявления будет находиться здесь",
				"city": "Москва",
				"userName": "Leonardo",
				"userStatus": "default",
				"phoneNumber": "+7 999 787 13 90",
				"rating": 0,
				"price": "5000",
				"imgPath": "",
				"advType": "buy"
			},
			{
				"id": "4t3443tgg43",
				"title": "Сеамская кошка 2",
				"briefDescription": "Описание объявления будет находиться здесь",
				"city": "Москва",
				"userName": "Leonardo",
				"userStatus": "default",
				"phoneNumber": "+7 999 787 13 90",
				"rating": 0,
				"price": "5000",
				"imgPath": "",
				"advType": "buy"
			}
		]
	}

jsonDatas = (state = initialState, action) => {
	switch(action.type) {
		case "UPDATE_JSONDATAS":
			return {
				...state
			}
			break;
		default:
			return state;
	}
};

export default jsonDatas;