let accountType,
	initialState = {
		type: "PRIVATE_SELLER",
		price: 0,
		tableData: {
			"Выше в ротации": "Нет",
			"Лимит объявлений в месяц": "Нет",
			"Рейтинг": "Нет"
		}
	};
export default accountType = (state = initialState, action) => {
	switch(action.type) {
		case "PRIVATE_SELLER":
			return {
				type: "PRIVATE_SELLER",
				price: 0,
				tableData: {
					"Выше в ротации": "Нет",
					"Лимит объявлений в месяц": "Нет",
					"Рейтинг": "Нет"
				}
			};
			;
		case "PERMANENT_SELLER":
			return {
				type: "PERMANENT_SELLER",
				price: 300,
				tableData: {
					"Выше в ротации": "Да",
					"Лимит объявлений в месяц": "Безлимит",
					"Рейтинг": "Да"
				}
			};
			;
		case "SHELTER":
			return {
				type: "SHELTER",
				price: 200,
				tableData: {
					"Выше в ротации": "Нет",
					"Лимит объявлений в месяц": "Безлимит",
					"Рейтинг": "Да"
				}
			};
			;
		default:
			return state;
	}
};