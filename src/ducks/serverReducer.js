import 'whatwg-fetch'
const urlutils = require('url')

import { types as preloaderTypes } from './preloader'
import { types as toggleTypes } from './toggleAddMoreBtn'

export const types = {
	GET_DATA_SERVER: 'SERVER_REDUCER/GET_DATA_SERVER',
	CLEAR_STATE_DATA_SERVER: 'SERVER_REDUCER/CLEAR_STATE_DATA_SERVER'
}

export const actions = {

	getCards: url => dispatch => {
		fetch(url)
			.then(response => {
				if (response.status !== 200) {
					console.log('Ошибка' + response.status)
				} else {
					dispatch({ type: preloaderTypes.PRELOADER_UPDATE_LOADING, payload: 80 })
					response.json()

						.then(data => {
							// работа с данными
							dispatch({ type: types.CLEAR_STATE_DATA_SERVER, payload: [] })
							dispatch({ type: types.GET_DATA_SERVER, payload: data })

							// скрыть показать кнопку подгрузки объявлений при загрузке категории
							let allCount = 0
							let zaprosCount = 0
							zaprosCount = urlutils.parse(url).pathname.split('/')[9]

							// запрос к серверу и осуществление функционала
							fetch(url + '/allcount')
								.then(response => {
									if (response.status !== 200) {
										console.log('all cards error')
									} else {
										response.json()
											.then(data => {
												allCount = data[0]['COUNT(card_id)']

												if (allCount > zaprosCount) {
													dispatch({ type: toggleTypes.COUNT_CARDS_TRUE, payload: true })
												} else {
													dispatch({ type: toggleTypes.COUNT_CARDS_FALSE, payload: false })
												}
											})
									}
								})
								.catch(() => { console.log('add cards catch') })
						})
						.then(() => dispatch({ type: preloaderTypes.PRELOADER_UPDATE_LOADING, payload: 100 }))
				}
			})
			.catch(() => {
				console.log('Ошибка. catch')
				dispatch({ type: preloaderTypes.PRELOADER_UPDATE_LOADING, payload: 10 })
			})
	}
}

export default (state = { advertisementList: [] }, action) => {

	switch (action.type) {

	case types.GET_DATA_SERVER: return {
		advertisementList: [
			...action.payload
		]
	}

	case types.CLEAR_STATE_DATA_SERVER: return {
		advertisementList: [
			...action.payload
		]
	}

	default: return state
	}
}