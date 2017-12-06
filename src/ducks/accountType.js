export const types = {
	PRIVATE_SELLER: 'ACC_TYPE/PRIVATE_SELLER',
	PERMANENT_SELLER: 'ACC_TYPE/PERMANENT_SELLER',
	SHELTER: 'ACC_TYPE/SHELTER'
}

export const actions = {
	handleShelter: () => ({ type: 'SHELTER' }),
	handlePermanentSeller: () => ({ type: 'PERMANENT_SELLER' }),
	handlePrivateSeller: () => ({ type: 'PRIVATE_SELLER' }),
	loginFalse: () => ({ type: 'LOGIN_FALSE', payload: false })
}

const initialState = {
	type: types.PRIVATE_SELLER,
	price: 0,
	tableData: {
		'Выше в ротации': 'Нет',
		'Лимит объявлений в месяц': 'Нет',
		'Рейтинг': 'Нет'
	}
}

export default (state = initialState, action) => {

	switch (action.type) {

	case types.PRIVATE_SELLER: return {
		type: types.PRIVATE_SELLER,
		price: 0,
		tableData: {
			'Выше в ротации': 'Нет',
			'Лимит объявлений в месяц': 'Нет',
			'Рейтинг': 'Нет'
		}
	}

	case types.PERMANENT_SELLER: return {
		type: types.PERMANENT_SELLER,
		price: 300,
		tableData: {
			'Выше в ротации': 'Да',
			'Лимит объявлений в месяц': 'Безлимит',
			'Рейтинг': 'Да'
		}
	}

	case types.SHELTER: return {
		type: types.SHELTER,
		price: 200,
		tableData: {
			'Выше в ротации': 'Нет',
			'Лимит объявлений в месяц': 'Безлимит',
			'Рейтинг': 'Да'
		}
	}

	default: return state
	}
}