let userPersonalDatas,
	initialState = {
		name: "Имя не получено",
		phoneNumber: "7 (***) *** ** **",
		city: "Город не получен",
		password: "********",
		validateRoles: {
			name: " ",
			phoneNumber: " ",
			city: " ",
			password: " "
		},
		dataSent: false,
		cards: {
			active: [
				{
					id: "323f4343f4",
					title: "Сеамская кошка",
					briefDescription: "Описание объявление будет выводиться здесь",
					city: "Москва",
					userName: "Андрей",
					userStatus: "default",
					phoneNumber: "+7 999 787 13 90",
					rating: "",
					price: "5400",
					imgPath: "uploads/cats/cat-sale-01.jpg",
					advType: "buy"
				},
				{
					id: "543323f4343f4",
					title: "Взрослый питбуль",
					briefDescription: "Описание объявление будет выводиться здесь",
					city: "Москва",
					userName: "Андрей",
					userStatus: "default",
					phoneNumber: "+7 950 584 13 54",
					rating: "",
					price: "5400",
					imgPath: "uploads/cats/cat-sale-02.jpg",
					advType: "gift"
				},
				{
					id: "323f5434343f4",
					title: "Тарантул",
					briefDescription: "Описание объявление будет выводиться здесь будет выводиться здесь будет выводиться здесь будет выводиться здесь",
					city: "Москва",
					userName: "Андрей",
					userStatus: "default",
					phoneNumber: "+7 989 775 43 90",
					rating: "",
					price: "5400",
					imgPath: "uploads/cats/cat-sale-01.jpg",
					advType: "find"
				}
			],
			completed: [
				
			]
		}
	};

//при загрузке приложения будут приходить данные с с ервера
//и изменять этот state

userPersonalDatas = (state = initialState, action) => {
	switch(action.type) {
		case "VALIDATE_NAME_USERDATA":
			return {
				...state,
				validateRoles: {
					...state.validateRoles,
					name: action.payload
				}
			}
			break;
		case "VALIDATE_PHONENUMBER_USERDATA":
			return {
				...state,
				validateRoles: {
					...state.validateRoles,
					phoneNumber: action.payload
				}
			}
			break;
		case "VALIDATE_CITY_USERDATA":
			return {
				...state,
				validateRoles: {
					...state.validateRoles,
					city: action.payload
				}
			}
			break;
		case "VALIDATE_PASSWORD_USERDATA":
			return {
				...state,
				validateRoles: {
					...state.validateRoles,
					password: action.payload
				}
			}
			break;
		case "DATASENT_TRUE":
			return {
				...state,
				dataSent: action.payload
			}
			break;
		case "DATASENT_FALSE":
			return {
				...state,
				dataSent: action.payload
			}
			break;
		default:
			return state;
	}
};

export default userPersonalDatas;