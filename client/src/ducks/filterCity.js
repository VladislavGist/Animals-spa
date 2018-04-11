export const types = {
	REPLACE_CITY: 'FILTER_CITY/REPLACE_CITY'
}

export const actions = {
	dispatchCityTopHeader: e => ({ type: types.REPLACE_CITY, payload: e })
}

const initialState = {
	cityTopHeader: 'Все регионы',
	citys: [
		'Москва',
		'Санкт-Петербург',
		'Волгоград',
		'Екатеринбург',
		'Казань',
		'Краснодар',
		'Нижний Новгород',
		'Пермь',
		'Ростов-на-Дону',
		'Самара',
		'Уфа',
		'Челябинск',
		'Адыгея',
		'Архангельская обл.',
		'Астраханская обл.',
		'Башкортостан',
		'Белгородская обл.',
		'Брянская обл.',
		'Владимирская обл.',
		'Волгоградская обл.',
		'Вологодская обл.',
		'Воронежская обл.',
		'Дагестан',
		'Ивановская обл.',
		'Ингушетия',
		'Кабардино-Балкария',
		'Калининградская обл.',
		'Калмыкия',
		'Калужская обл.',
		'Карачаево-Черкесия',
		'Карелия',
		'Кировская обл.',
		'Коми',
		'Костромская обл.',
		'Краснодарский край',
		'Крым',
		'Курганская обл.',
		'Курская обл.',
		'Ленинградская обл.',
		'Липецкая обл.',
		'Марий Эл',
		'Мордовия',
		'Московская обл.',
		'Мурманская обл.',
		'Ненецкий АО',
		'Нижегородская обл.',
		'Новгородская обл.',
		'Оренбургская обл.',
		'Орловская обл.',
		'Пензенская обл.',
		'Пермский край',
		'Псковская обл.',
		'Ростовская обл.',
		'Рязанская обл.',
		'Самарская обл.',
		'Саратовская обл.',
		'Свердловская обл.',
		'Северная Осетия',
		'Смоленская обл.',
		'Ставропольский край',
		'Тамбовская обл.',
		'Татарстан',
		'Тверская обл.',
		'Тульская обл.',
		'Удмуртия',
		'Ульяновская обл.',
		'Челябинская обл.',
		'Чеченская республика',
		'Чувашия',
		'Ярославская обл.'
	]
}

export default (state = initialState, action) => {
	switch (action.type) {
	case types.REPLACE_CITY: return {
		...state,
		cityTopHeader: action.payload
	}
	default: return state
	}
}