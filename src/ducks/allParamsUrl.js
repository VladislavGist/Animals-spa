import 'whatwg-fetch'
import axios from 'axios'
import moment from 'moment'
import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

export const types = {
	CHANGE_URL: 'ALL_PARAMS/CHANGE_URL'
}

export const actions = {

	onReplaceAllUrl: e => ({ type: types.CHANGE_URL, payload: e ? e : {} }),

	completedCard: url => dispatch => {
		axios.get(url)
			.then(
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Успешно остановлено')),
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка. Не остановлено')))
			.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка запроса на завершение')))
	},

	updateCardView: cardId => () => axios(`${ process.env.URL }/updatecardviews/${ cardId }`),

	replaceStatusCard: url => dispatch => {
		axios.get(url)
			.then(
				() => {},
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка изменения статуса')))
			.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка cервера изменения статуса')))
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