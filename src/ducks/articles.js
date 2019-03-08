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
}

const initialState = {
	errorFetch: false,
	loadingFetch: false,
	articlesList: []
}

export default (state = initialState, action) => {
	const { type, articles } = action

	switch (type) {
	case types.FETCH_ARTICLES_START: return {
		errorFetch: false,
		loadingFetch: true,
		articlesList: []
	}
	case types.FETCH_ARTICLES_SUCCESS: return {
		errorFetch: false,
		loadingFetch: false,
		articlesList: articles
	}
	case types.FETCH_ARTICLES_ERROR: return {
		errorFetch: true,
		loadingFetch: false,
		articlesList: []
	}
	case types.FETCH_ARTICLES_CLEAR: return {
		errorFetch: false,
		loadingFetch: false,
		articlesList: []
	}
	default: return state
	}
}

export const actions = {
	getCards: ({ city, animalType, postType, page, active }) => dispatch => {
		dispatch({ type: types.FETCH_ARTICLES_START })
		dispatch(actionsTypes.handleUpdateStateLoading(80))

		const cityQuerySearch = city && city !== 'Все регионы' ? `city=${ city }&` : ''
		const animalTypeQuerySearch = animalType ? `animalType=${ animalType }&` : ''
		const postTypeTypeQuerySearch = postType ? `postType=${ postType }&` : ''
		const pageQuerySearch = page ? `page=${ page }&` : `page=1&`
		const activeQuerySearch = active || active === false ? `active=${ active }&` : 'active=true&'

		const resultSearchQuery = `${ cityQuerySearch }${ animalTypeQuerySearch }${ postTypeTypeQuerySearch }${ pageQuerySearch }${ activeQuerySearch }`

		fetch(`${ config.payPetsApiUrl }/api/feedRead/posts?${resultSearchQuery}`)
			.then(result => result.json())
			.then(articles => dispatch({ type: types.FETCH_ARTICLES_SUCCESS, articles: articles.posts }))
			.catch(err => {
				dispatch({ type: types.FETCH_ARTICLES_ERROR })
				dispatch(actionsSnackbarReducer.handleSnackbar(`Ошибка ${ err }`))
			})
	},

	onHandleClearState: () => ({ type: types.FETCH_ARTICLES_CLEAR })
}