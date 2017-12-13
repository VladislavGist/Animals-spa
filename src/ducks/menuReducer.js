export const types = {
	SWITCH_MENU: 'MENU_REDUCER/SWITCH_MENU',
	SWITCH_MENU_CLEAR: 'MENU_REDUCER/SWITCH_MENU_CLEAR'
}

export const actions = {

	onHandleCat: () => {
		const data = [
			{
				img: 'uploads/catMenu.jpg',
				title: 'Кошки',
				text: '',
				categoryNames: {
					myLinks: ['/animals/cat/buy', '/animals/cat/find', '/animals/cat/missing', '/animals/cat/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e123r2e3', '2f3f32', 'f4f34', '4r4f34']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleDog: () => {
		const data = [
			{
				img: 'uploads/dogMenu.jpg',
				title: 'Собаки',
				text: '',
				categoryNames: {
					myLinks: ['/animals/dog/buy', '/animals/dog/find', '/animals/dog/missing', '/animals/dog/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e123e3', '2f3ewf2', 'f434f', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleParrot: () => {
		const data = [
			{
				img: 'uploads/parrot.jpg',
				title: 'Попугаи',
				text: '',
				categoryNames: {
					myLinks: ['/animals/parrot/buy', '/animals/parrot/find', '/animals/parrot/missing', '/animals/parrot/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleHamster: () => {
		const data = [
			{
				img: 'uploads/hamster.jpg',
				title: 'Хомяки',
				text: '',
				categoryNames: {
					myLinks: ['/animals/hamster/buy', '/animals/hamster/gift'],
					names: ['Купить', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-globe'],
					key: ['e1f322e3', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleMouse: () => {
		const data = [
			{
				img: 'uploads/mouse.jpg',
				title: 'Мыши / крысы',
				text: '',
				categoryNames: {
					myLinks: ['/animals/mouse/buy', '/animals/mouse/gift'],
					names: ['Купить', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleHare: () => {
		const data = [
			{
				img: 'uploads/hare.jpg',
				title: 'Зайцы / кролики',
				text: '',
				categoryNames: {
					myLinks: ['/animals/hare/buy', '/animals/hare/gift'],
					names: ['Купить', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onGuineapig: () => {
		const data = [
			{
				img: 'uploads/guineapig.jpg',
				title: 'Морские свинки',
				text: '',
				categoryNames: {
					myLinks: ['/animals/guineapig/buy', '/animals/guineapig/find', '/animals/guineapig/missing', '/animals/guineapig/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleChamp: () => {
		const data = [
			{
				img: 'uploads/champ.jpg',
				title: 'Хорьки',
				text: '',
				categoryNames: {
					myLinks: ['/animals/champ/buy', '/animals/champ/find', '/animals/champ/missing', '/animals/champ/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleSnak: () => {
		const data = [
			{
				img: 'uploads/snak.jpg',
				title: 'Змеи',
				text: '',
				categoryNames: {
					myLinks: ['/animals/snak/buy', '/animals/snak/find', '/animals/snak/missing', '/animals/snak/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleIguana: () => {
		const data = [
			{
				img: 'uploads/iguana.jpg',
				title: 'Игуаны',
				text: '',
				categoryNames: {
					myLinks: ['/animals/iguana/buy', '/animals/iguana/find', '/animals/iguana/missing', '/animals/iguana/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleTurtle: () => {
		const data = [
			{
				img: 'uploads/turtle.jpg',
				title: 'Черепахи',
				text: '',
				categoryNames: {
					myLinks: ['/animals/turtle/buy', '/animals/turtle/find', '/animals/turtle/missing', '/animals/turtle/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleSnail: () => {
		const data = [
			{
				img: 'uploads/snail.jpg',
				title: 'Улитки',
				text: '',
				categoryNames: {
					myLinks: ['/animals/snail/buy', '/animals/snail/gift'],
					names: ['Купить', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleFish: () => {
		const data = [
			{
				img: 'uploads/fish.jpg',
				title: 'Рыбки',
				text: '',
				categoryNames: {
					myLinks: ['/animals/fish/buy', '/animals/fish/gift'],
					names: ['Купить', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleInsects: () => {
		const data = [
			{
				img: 'uploads/insects.jpg',
				title: 'Насекомые',
				text: '',
				categoryNames: {
					myLinks: ['/animals/insects/buy', '/animals/insects/gift'],
					names: ['Купить', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleHorse: () => {
		const data = [
			{
				img: 'uploads/horse.jpg',
				title: 'Лошади',
				text: '',
				categoryNames: {
					myLinks: ['/animals/horse/buy', '/animals/horse/find', '/animals/horse/missing', '/animals/horse/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleCow: () => {
		const data = [
			{
				img: 'uploads/cow.jpg',
				title: 'Коровы / быки',
				text: '',
				categoryNames: {
					myLinks: ['/animals/cow/buy', '/animals/cow/find', '/animals/cow/missing', '/animals/cow/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandlePig: () => {
		const data = [
			{
				img: 'uploads/pig.jpg',
				title: 'Свиньи',
				text: '',
				categoryNames: {
					myLinks: ['/animals/pig/buy', '/animals/pig/gift'],
					names: ['Купить', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleGoat: () => {
		const data = [
			{
				img: 'uploads/goat.jpg',
				title: 'Козы',
				text: '',
				categoryNames: {
					myLinks: ['/animals/goat/buy', '/animals/goat/find', '/animals/goat/missing', '/animals/goat/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleSheep: () => {
		const data = [
			{
				img: 'uploads/sheep.jpg',
				title: 'Овцы',
				text: '',
				categoryNames: {
					myLinks: ['/animals/sheep/buy', '/animals/sheep/find', '/animals/sheep/missing', '/animals/sheep/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	},

	onHandleDomesticbird: () => {
		const data = [
			{
				img: 'uploads/domesticbird.jpg',
				title: 'Домашняя птица',
				text: '',
				categoryNames: {
					myLinks: ['/animals/domesticbird/buy', '/animals/domesticbird/gift'],
					names: ['Купить', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-globe'],
					key: ['e1f322e3', '2ff33f2']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	}
}

const initialState = [
	{
		img: 'uploads/catMenu.jpg',
		title: 'Кошки',
		text: '',
		categoryNames: {
			myLinks: ['/animals/cat/buy', '/animals/cat/find', '/animals/cat/missing', '/animals/cat/gift'],
			names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
			icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
			key: ['e12e3', '2f3f2', 'f434', '4r434']
		}
	}
]

export default (state = initialState, action) => {

	switch (action.type) {

	case types.SWITCH_MENU: return action.payload

	case types.SWITCH_MENU_CLEAR: return []

	default: return state
	}
}