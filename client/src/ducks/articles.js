import { actions as actionsTypes } from './preloader'
import { appName } from '../config'
import firebase from 'firebase'
import { Record } from 'immutable'

import { generateId, normalizeFirebaseDatas } from '../ducks/utils'

export const moduleName = 'articles'

import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

export const types = {
	FETCH_ARTICLES_REQUEST: `${ appName }/${ moduleName }/FETCH_ARTICLES_REQUEST`,
	FETCH_ARTICLES_SUCCESS: `${ appName }/${ moduleName }/FETCH_ARTICLES_SUCCESS`,
	FETCH_ARTICLES_ERROR: `${ appName }/${ moduleName }/FETCH_ARTICLES_ERROR`,
	FETCH_ARTICLES_CLEAR: `${ appName }/${ moduleName }/FETCH_ARTICLES_CLEAR`,
}

const initialState = Record({
	errorFetch: false,
	loadingFetch: false,
	articlesList: []
})

export default (state = new initialState(), action) => {
	const { type, payload } = action

	switch (type) {
	case types.FETCH_ARTICLES_REQUEST: return state.set('errorFetch', false).set('loadingFetch', true).set('articlesList', [])
	case types.FETCH_ARTICLES_SUCCESS: return state.set('errorFetch', false).set('loadingFetch', false).set('articlesList', payload)
	case types.FETCH_ARTICLES_ERROR: return state.set('errorFetch', true).set('loadingFetch', false).set('articlesList', [])
	case types.FETCH_ARTICLES_CLEAR: return state.set('errorFetch', false).set('loadingFetch', false).set('articlesList', [])
	default: return state	
	}
}

export const actions = {
	getCards: ({ type_cards, advertisment_cards, filterCity }) => dispatch => {
		dispatch({ type: types.FETCH_ARTICLES_REQUEST })
		dispatch(actionsTypes.handleUpdateStateLoading(80))

		firebase.database().ref('users').on('value',
			datas => {
				let articlesList = []

				normalizeFirebaseDatas(datas.val()).forEach(item => {
					normalizeFirebaseDatas(item.articles).forEach(card => {
						
						let dunamicParamCity = false,
							dynamicType = false,
							dunamicAdvert = false

						if (filterCity === 'Все регионы') {
							dunamicParamCity = true
						} else if (card.city === filterCity) {
							dunamicParamCity = true
						} else {
							dunamicParamCity = false
						}

						if (!type_cards) {
							dynamicType = true
						} else if (card.animals === type_cards) {
							dynamicType = true
						} else {
							dynamicType = false
						}

						if (!advertisment_cards) {
							dunamicAdvert = true
						} else if (card.category === advertisment_cards) {
							dunamicAdvert = true
						} else {
							dunamicAdvert = false
						}

						
						if (card.moderate && dunamicParamCity && dynamicType && dunamicAdvert) {
							articlesList.push(card)
						}
					})
				})
				
				dispatch({ type: types.FETCH_ARTICLES_SUCCESS, payload: articlesList })
				dispatch(actionsTypes.handleUpdateStateLoading(0))
			},
			() => {
				dispatch({ type: types.ADD_ARTICLE_ERROR })
				dispatch(actionsTypes.handleUpdateStateLoading(0))
			}
		)
	},

	onHandleClearState: () => ({ type: types.FETCH_ARTICLES_CLEAR })
}