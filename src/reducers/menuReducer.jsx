let initialState = [
	{
		img: "uploads/catMenu.jpg",
		title: "Кошки",
		text: "Текст описания категории кошек",
		categoryNames: {
			myLinks: ["/animals/cat/buy", "/animals/cat/find", "/animals/cat/missing", "/animals/cat/gift"],
			names: ["Купить", "Находка", "Пропажа", "Даром"],
			icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
			key: ["e12e3", "2f3f2", "f434", "4r434"]
		}
	}
];

let menuReducer;
export default menuReducer = (state = initialState, action) => {
	switch(action.type) {
		case "SWITCH_MENU":
			return action.payload;
			break;
		default:
			return state;
	}
};