import 'whatwg-fetch'
import axios from 'axios'
import moment from 'moment'

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
	},

	postMethodAddCard: (globalState, localState, handleResetPlace) => {

		moment.locale('ru')
		let now = moment(), deleteDate = now.add(1, 'month').format('ll')
		let paramsUrl = `userName=${ globalState.loginUser.results[0].name }&animalType=${ localState.animals }&advertisementType=${ localState.category }&city=${ localState.city }&title=${ localState.title }&phoneNumber=${ localState.phoneNumber }&briefDescription=${ localState.textArea }&${ localState.category === 'gift' || localState.category === 'find' ? 'price=' + '0' : 'price=' + localState.price }&userId=${ globalState.loginUser.results[0].user_id }&status=${ globalState.loginUser.results[0].accountType }&dataDelete=${ deleteDate }`

		this.postImagesCard(
			`${ process.env.URL }'/add-advertisement/img/animalType/'${ localState.animals }'/advertisementType/'${ localState.category }`,
			'images',
			`${ process.env.URL }'/add-advertisement'`,
			`${ paramsUrl }`
		)

		handleResetPlace()
		// this.thisFormData.delete('photo')

	}
}

export default (state = {}, action) => {
	switch (action.type) {
	case types.CHANGE_URL: return action.payload
	default: return state
	}
}