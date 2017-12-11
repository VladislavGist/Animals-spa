import 'whatwg-fetch'

export const types = {
	CHANGE_URL: 'ALL_PARAMS/CHANGE_URL'
}

export const actions = {

	onReplaceAllUrl: e => ({ type: types.CHANGE_URL, payload: e ? e : {} }),

	completedCard: url => () =>
		fetch(url)
			.then(() => console.log('Успешно остановлено'))
			.catch(() => console.log('Ошибка запроса на завершение')),

	updateCardView: cardId => () => {
		fetch(process.env.URL + '/updatecardviews/' + cardId)
			.then(response => {
				if (response.status !== 200) {
					console.log('Ошибка' + response.status)
				}
			})
			.catch(() => console.log('Ошибка updatecardviews'))
	},

	replaceStatusCard: url => () => {
		fetch(url)
			.then(response => {
				response.json()
					.then(() => console.log('replaceStatusCard json succes'))
					.catch(() => console.log('replaceStatusCard json error'))
			})
			.catch(() => console.log('replaceStatusCard catch'))
	},

	postImagesCard: (url, thisFormData, anAdUrl, anAdParapms) => () => {

		fetch(url, { body: thisFormData, method: 'post' })
			.then(() => {
				fetch(anAdUrl, {
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: anAdParapms
				})
					.then(() => console.log('Объявление отправлено на сервер'))
					.catch(() => console.log('Ошибка. catch'))
			},
			() => console.log('Img переданно не успешно'))
			.catch(() => console.log('Img catch'))
	}
}

export default (state = {}, action) => {

	switch (action.type) {

	case types.CHANGE_URL: return action.payload

	default: return state
	}
}