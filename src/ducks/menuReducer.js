import config from '../../config'

import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

const appName = 'paypets'
const moduleName = 'menu'

export const types = {
	GET_CATEGORIES_REQUEST: `${ appName }/${ moduleName }/GET_CATEGORIES_REQUEST`,
	GET_CATEGORIES_SUCCESS: `${ appName }/${ moduleName }/GET_CATEGORIES_SUCCESS`,
	GET_CATEGORIES_ERROR: `${ appName }/${ moduleName }/GET_CATEGORIES_ERROR`,

	SWITCH_MENU: 'MENU_REDUCER/SWITCH_MENU',
	SWITCH_MENU_CLEAR: 'MENU_REDUCER/SWITCH_MENU_CLEAR'
}

export const actions = {
	getCategories: city => dispatch => {
		dispatch({ type: types.GET_CATEGORIES_REQUEST })

		const cityQuerySearch = city && city !== 'Все регионы' ? `city=${ city }` : ''

		fetch(`${ config.payPetsApiUrl }/api/menu/getAnimalCategories?${ cityQuerySearch }`)
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject(response.json())
			})
			.then(payload => {
				dispatch({ type: types.GET_CATEGORIES_SUCCESS, payload })
			})
			.catch(err => {
				err.then(res => {
					dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
					dispatch({ type: types.GET_CATEGORIES_ERROR })
				})
			})
	},

	onHandleCat: () => {
		const data = [
			{
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2FcatMenu.jpg?alt=media&token=283aae65-4450-4ae4-b41d-46da0e35a24b',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2FdogMenu.jpg?alt=media&token=61db6dd0-933d-4050-be3f-631038d95c0e',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fparrot.jpg?alt=media&token=a9042563-7b2e-4744-9741-79204e25af64',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fhamster.jpg?alt=media&token=2bb626a5-41a1-4998-93a9-9875481fb40f',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fmouse.jpg?alt=media&token=15e5b1c7-7ba5-4044-aa62-d9d120a2a079',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fhare.jpg?alt=media&token=f8f5156b-a298-4e7b-afc7-b13b14265132',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fguineapig.jpg?alt=media&token=9a932a7a-20d2-47ba-b22f-30f25b412c19',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fchamp.jpg?alt=media&token=c8890970-fd64-4c27-9bd2-8a830c0e81e3',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fsnak.jpg?alt=media&token=384d3814-2c4d-4f46-b1d7-0a6cfa39b15d',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Figuana.jpg?alt=media&token=37124f1d-10eb-48ac-815b-d3464403af50',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fturtle.jpg?alt=media&token=9aff78ad-9093-4d31-ac25-40f959688521',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fsnail.jpg?alt=media&token=4f010780-da2b-4ce0-92f7-3147e5086c46',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Ffish.jpg?alt=media&token=7f70e25d-0b99-49fd-8221-949d77ac1147',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Finsects.jpg?alt=media&token=08555cd0-d6ec-4877-85f0-ae9ed47602d9',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fhorse.jpg?alt=media&token=639589a1-86e1-48c4-8e0e-c9b37af5b18a',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fcow.jpg?alt=media&token=713eca65-2a74-4d73-8b26-4a0628111245',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fpig.jpg?alt=media&token=8aa8d17a-d9f9-4fb4-8baf-a20682406757',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fgoat.jpg?alt=media&token=032e4074-0e53-416e-930a-a53d89cbac7e',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fsheep.jpg?alt=media&token=2c2af997-46b4-4919-b15c-2bf7d6e462f5',
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
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fdomesticbird.jpg?alt=media&token=94cbd183-326c-4b38-a251-8d159c011631',
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
	},

	onHandleAnother: () => {
		const data = [
			{
				img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fother.png?alt=media&token=1d8fe29a-2fa3-418f-8e8d-1cc1a1a1901d',
				title: 'Другие',
				text: '',
				categoryNames: {
					myLinks: ['/animals/other/buy', '/animals/other/find', '/animals/other/missing', '/animals/other/gift'],
					names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
					icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
					key: ['e1gref322e3', '2ff3re3f2', 'f4354334', '4rf32gt434', '4r434gtr42']
				}
			}
		]
		return { type: types.SWITCH_MENU, payload: data }
	}
}

const initialState = [
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2FcatMenu.jpg?alt=media&token=283aae65-4450-4ae4-b41d-46da0e35a24b',
		title: 'Кошки',
		text: '',
		categoryNames: {
			myLinks: ['/animals/cat/buy', '/animals/cat/find', '/animals/cat/missing', '/animals/cat/gift'],
			names: ['Купить', 'Находка', 'Пропажа', 'Даром'],
			icons: ['fa fa-heart', 'fa fa-bell-o', 'fa fa-exclamation-circle', 'fa fa-globe'],
			key: ['e12e3', '2f3f2', 'f434', '4r434']
		},
		fetchingCategories: false,
		errorFetchCategories: false,
		categories: []
	}
]

export default (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {

	case types.GET_CATEGORIES_REQUEST: return {
		...state,
		fetchingCategories: true,
		errorFetchCategories: false,
		categories: []
	}
	case types.GET_CATEGORIES_SUCCESS: return {
		...state,
		fetchingCategories: true,
		errorFetchCategories: false,
		categories: payload
	}
	case types.GET_CATEGORIES_REQUEST: return {
		...state,
		fetchingCategories: true,
		errorFetchCategories: false,
		categories: []
	}

	case types.SWITCH_MENU: return payload
	case types.SWITCH_MENU_CLEAR: return []

	default: return state
	}
}