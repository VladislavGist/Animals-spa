import { appName } from '../config'
import firebase from 'firebase'
import { Record } from 'immutable'
import moment from 'moment'
import { reset } from 'redux-form'
import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'
import { actions as actionsPreloader } from '../ducks/preloader'

import { generateId, normalizeFirebaseDatas, getRandomInt } from '../ducks/utils'

export const moduleName = 'articles'

export const types = {
	ADD_ARTICLE_REQUEST: `${ appName }/${ moduleName }/ADD_ARTICLE_REQUEST`,
	ADD_ARTICLE_SUCCESS: `${ appName }/${ moduleName }/ADD_ARTICLE_SUCCESS`,
	ADD_ARTICLE_ERROR: `${ appName }/${ moduleName }/ADD_ARTICLE_ERROR`,

	FETCH_ARTICLES_REQUEST: `${ appName }/${ moduleName }/FETCH_ARTICLES_REQUEST`,
	FETCH_ARTICLES_SUCCESS: `${ appName }/${ moduleName }/FETCH_ARTICLES_SUCCESS`,
	FETCH_ARTICLES_ERROR: `${ appName }/${ moduleName }/FETCH_ARTICLES_ERROR`
}

const initialState = Record({
	errorAdd: false,
	loadingAdd: false,

	errorFetch: false,
	loadingFetch: false,
	articlesList: null
})

export const actions = {
	onReplaceAllUrl: e => ({ type: types.CHANGE_URL, payload: e ? e : {} }),

	completedCard: url => dispatch => {
		// axios.get(url)
		// 	.then(
		// 		() => dispatch(actionsSnackbarReducer.handleSnackbar('Успешно остановлено')),
		// 		() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка. Не остановлено')))
		// 	.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка запроса на завершение')))
	},

	// updateCardView: cardId => () => axios(`${ process.env.URL_PATH }/updatecardviews/${ cardId }`),

	replaceStatusCard: url => dispatch => {
		// axios.get(url)
		// 	.then(
		// 		() => {},
		// 		() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка изменения статуса')))
		// 	.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка cервера изменения статуса')))
	},

	loadArticles: () => dispatch => {
		// dispatch({ type: types.FETCH_ARTICLES_REQUEST })

		// firebase.database().ref('users').on('value',
		// 	datas => {
		// 		let articlesList = []

		// 		normalizeFirebaseDatas(datas.val()).forEach(item => {
		// 			normalizeFirebaseDatas(item.articles).forEach(card => card.moderate && articlesList.push(card))
		// 		})
				
		// 		dispatch({ type: types.FETCH_ARTICLES_SUCCESS, payload: articlesList })
		// 	},
		// 	() => dispatch({ type: types.ADD_ARTICLE_ERROR })
		// )
	},

	addArticle: (handleResetPlace, { uid, userName, title, textArea, animals, category, city, price = null, phoneNumber, images }) => dispatch => {
		moment.locale('ru')
		let now = moment(),
			addDate = moment().format("DD-MM-YYYY"),
			deleteDate = now.add(1, 'month').format('DD-MM-YYYY'),
			adArticle = getRandomInt()

		dispatch({ type: types.ADD_ARTICLE_REQUEST })

		for(let i = 0; i < images.length; i++) {
			let imageName = generateId()

			let uploadTask = firebase.storage().ref(`images/${ generateId() }`).put(images[i])
			
			uploadTask.on('state_changed',
				snapshot => {
					let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					dispatch(actionsPreloader.handleUpdateStateLoading(progress))
				},
				error => dispatch(actionsSnackbarReducer.handleSnackbar('Не правильный формат или файл больше 5 мб')),
				() => {
					const downloadURL = uploadTask.snapshot.downloadURL

					firebase.database().ref(`users/${ uid }/articles/${ adArticle }/images`)
						.push(downloadURL, error => {
							if (error) {
								dispatch({ type: types.ADD_ARTICLE_ERROR })
								dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сети'))
							}

							if (i === images.length - 1) {
								firebase.database().ref(`users/${ uid }/articles/${ adArticle }`)
									.update({
										userId: uid,
										userName,
										addDate,
										deleteDate,
										title,
										textArea,
										animals,
										category,
										city,
										phoneNumber,
										price,
										moderate: false,
										compleate: false
									}, error => {
										if (error) {
											dispatch({ type: types.ADD_ARTICLE_ERROR })
											dispatch(actionsSnackbarReducer.handleSnackbar(`Ошибка при добавлении объявления ${ error }`))
										}

										dispatch({ type: types.ADD_ARTICLE_SUCCESS })
										dispatch(actionsSnackbarReducer.handleSnackbar('Успешно добавлено'))
										handleResetPlace()
										dispatch(reset('addCardForm'))
									})
							}
						})
				}
			)
		}

		
	}
}

export default (state = new initialState(), action) => {
	const { type, payload } = action

	switch (type) {
	case types.ADD_ARTICLE_REQUEST: return state.set('errorAdd', false).set('loadingAdd', true)
	case types.ADD_ARTICLE_SUCCESS: return state.set('errorAdd', false).set('loadingAdd', false)
	case types.ADD_ARTICLE_ERROR: return state.set('errorAdd', true).set('loadingAdd', false)
	case types.FETCH_ARTICLES_REQUEST: return state.set('errorFetch', false).set('loadingFetch', true).set('articlesList', null)
	case types.FETCH_ARTICLES_SUCCESS: return state.set('errorFetch', false).set('loadingFetch', false).set('articlesList', payload)
	case types.FETCH_ARTICLES_ERROR: return state.set('errorFetch', true).set('loadingFetch', false).set('articlesList', null)
	default: return state	
	}
}