import 'whatwg-fetch'
import axios from 'axios'
import moment from 'moment'
import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

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

	postMethodAddCard: (globalState, localState, handleResetPlace, images) => dispatch => {
		moment.locale('ru')
		let now = moment(), deleteDate = now.add(1, 'month').format('ll')
		let paramsUrl = `userName=${ globalState.loginUser.name }&animalType=${ localState.animals }&advertisementType=${ localState.category }&city=${ localState.city }&title=${ localState.title }&phoneNumber=${ localState.phoneNumber }&briefDescription=${ localState.textArea }&${ localState.category === 'gift' || localState.category === 'find' ? 'price=' + '0' : 'price=' + localState.price }&userId=${ globalState.loginUser.user_id }&status=${ globalState.loginUser.accountType }&dataDelete=${ deleteDate }`

		axios({
			method: 'post',
			url: `${ process.env.URL }/add-advertisement/img/animalType/${ localState.animals }/advertisementType/${ localState.category }`,
			data: images
		})
			.then(
				() => {
					axios({ url: `${ process.env.URL }/add-advertisement`, method: 'post', data: paramsUrl })
					dispatch(actionsSnackbarReducer.handleSnackbar('Отправлено'))
				},
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Не отправлено'))
			)
			.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера')))

		handleResetPlace()
		this.thisFormData.delete('photo')
	}
}

export default (state = {}, action) => {
	switch (action.type) {
	case types.CHANGE_URL: return action.payload
	default: return state
	}
}