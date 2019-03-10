import { actions as actionsTypes } from './preloader'
import config from '../../config'

const appName = 'paypets'
export const moduleName = 'articles'

import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

export const types = {
	FETCH_ARTICLES_START: `${ appName }/${ moduleName }/FETCH_ARTICLES_START`,
	FETCH_ARTICLES_SUCCESS: `${ appName }/${ moduleName }/FETCH_ARTICLES_SUCCESS`,
	FETCH_ARTICLES_ERROR: `${ appName }/${ moduleName }/FETCH_ARTICLES_ERROR`,
	FETCH_ARTICLES_CLEAR: `${ appName }/${ moduleName }/FETCH_ARTICLES_CLEAR`,

	CHANGE_CURRENT_PAGE_PAGINATION: `${ appName }/${ moduleName }/CHANGE_CURRENT_PAGE_PAGINATION`,
}

const initialState = {
	errorFetch: false,
	loadingFetch: false,
	currentPagePagination: 1,
	articlesList: []
}

export default (state = initialState, action) => {
	const { type, articles, currentPagePagination } = action

	switch (type) {
	case types.FETCH_ARTICLES_START: return {
		...state,
		errorFetch: false,
		loadingFetch: true,
		articlesList: []
	}
	case types.FETCH_ARTICLES_SUCCESS: return {
		...state,
		errorFetch: false,
		loadingFetch: false,
		articlesList: articles
	}
	case types.FETCH_ARTICLES_ERROR: return {
		...state,
		errorFetch: true,
		loadingFetch: false,
		articlesList: []
	}
	case types.FETCH_ARTICLES_CLEAR: return {
		...state,
		errorFetch: false,
		loadingFetch: false,
		articlesList: []
	}

	case types.CHANGE_CURRENT_PAGE_PAGINATION: return {
		...state,
		currentPagePagination: currentPagePagination
	}

	default: return state
	}
}

export const actions = {
	getCards: ({ city, animalType, postType, page, active, moderate }) => dispatch => {
		dispatch({ type: types.FETCH_ARTICLES_START })
		dispatch(actionsTypes.handleUpdateStateLoading(80))

		const cityQuerySearch = city && city !== 'Все регионы' ? `city=${ city }&` : ''
		const animalTypeQuerySearch = animalType ? `animalType=${ animalType }&` : ''
		const postTypeTypeQuerySearch = postType ? `postType=${ postType }&` : ''
		const pageQuerySearch = page ? `page=${ page }&` : `page=1&`
		const activeQuerySearch = active || active === false ? `active=${ active }&` : 'active=true&'
		const moderateQuerySearch = moderate ? `moderate=${ moderate }&` : 'moderate=resolve&'

		const resultSearchQuery = `
			${ cityQuerySearch }
			${ animalTypeQuerySearch }
			${ postTypeTypeQuerySearch }
			${ pageQuerySearch }
			${ activeQuerySearch }
			${ moderateQuerySearch }
		`

		fetch(`${ config.payPetsApiUrl }/api/feedRead/posts?${resultSearchQuery}`)
			.then(result => result.json())
			.then(articles => {
				dispatch(actionsTypes.handleUpdateStateLoading(100))
				dispatch({ type: types.FETCH_ARTICLES_SUCCESS, articles: articles.posts })
			})
			.catch(err => {
				dispatch(actionsTypes.handleUpdateStateLoading(100))
				dispatch({ type: types.FETCH_ARTICLES_ERROR })
				dispatch(actionsSnackbarReducer.handleSnackbar(`Ошибка ${ err.message }`))
			})
	},

	moderateCard: (url, cardId, status) => dispatch => {
		const token = localStorage.getItem('token')

		fetch(url, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${ token }`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ postId: cardId, status })
		})
			.then(response => {
				if (response.ok) return response.json()
				return Promise.reject('Не удалось изменить статус объявления')
			})
			.then(result => {
				dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
				dispatch(actions.getCards({ moderate: 'pending' }))
			})
			.catch(err => dispatch(actionsSnackbarReducer.handleSnackbar(err.message)))
	},

	changePage: currentPagePagination => dispatch => {
		dispatch({ type: types.CHANGE_CURRENT_PAGE_PAGINATION, currentPagePagination })
	},

	onHandleClearState: () => ({ type: types.FETCH_ARTICLES_CLEAR })
}