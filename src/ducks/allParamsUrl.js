import 'whatwg-fetch'
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

		const { validatePlaceAnAd: { titleName, phoneNumber, textContent, placePrice }, photosReducer: { addPhoto } } = globalState

		const toggleValidatePrice = () => {
			if (localState.category.value === 'gift' || localState.category.value === 'find') {
				return true
			} else {
				return placePrice === true
			}
		}

		// если все поля объявлени заполнены, то отправить данные
		if (titleName && phoneNumber && textContent && addPhoto && toggleValidatePrice() && localState.state.checked) {

			moment.locale('ru')
			let now = moment()
			// deleteDate = now.add(1, 'month').format('ll')
			// let paramsUrl =
			// 	'userName=' + this.props.state.loginUser.results[0].name + '&' +
			// 	'animalType=' + this.state.animal.value + '&' +
			// 	'advertisementType=' + this.state.category.value + '&' +
			// 	'city=' + this.state.city.value + '&' +
			// 	'title=' + $('input[name="title"]')[0].value + '&' +
			// 	'phoneNumber=' + $('input[name="phoneNumber"]')[0].value + '&' +
			// 	'briefDescription=' + $('.briefDescription')[0].childNodes[2].childNodes[1].value + '&' +
			// 	`${this.state.category.value === 'gift' || this.state.category.value === 'find' ? 'price=' + '0' : 'price=' + $('input[name="price"]')[0].value}` + '&' +
			// 	`userId=${ this.props.state.loginUser.results[0].user_id }` + '&' +
			// 	`status=${ this.props.state.loginUser.results[0].accountType }` + '&' +
			// 	`dataDelete=${deleteDate}`

			this.postImagesCard(process.env.URL + '/add-advertisement/img/animalType/' + this.state.animal.value + '/advertisementType/' + this.state.category.value, this.thisFormData, process.env.URL + '/add-advertisement', paramsUrl)

			// очистка данных формы
			handleResetPlace()
			// $('input[name="title"]')[0].value = ''
			// $('input[name="phoneNumber"]')[0].value = ''
			// $('.briefDescription')[0].childNodes[2].childNodes[1].nextSibling.value = ''
			// this.state.category.value === 'gift' || this.state.category.value === 'find' ? '' : $('input[name="price"]')[0].value = ''
			// document.querySelectorAll('.loadingPhoto input')[0].value = ''
			// document.querySelectorAll('.loadingPhoto input')[1].value = ''
			// document.querySelectorAll('.loadingPhoto input')[2].value = ''
			// document.querySelectorAll('.loadingPhoto input')[3].value = ''
			// document.querySelectorAll('.loadingPhoto input')[4].value = ''

			// this.thisFormData.delete('photo')

		} else {
			this.props.handleSnackbar('Заполните все поля и/или дайте согласие на обработку Ваших данных')
		}
	}
}

export default (state = {}, action) => {

	switch (action.type) {

	case types.CHANGE_URL: return action.payload

	default: return state
	}
}