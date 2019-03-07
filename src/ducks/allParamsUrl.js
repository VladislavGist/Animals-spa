import { reset } from 'redux-form'

import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'
import { actions as actionsPreloader } from '../ducks/preloader'

import { normalizeImgs } from '../ducks/utils'
import config from '../../config'

const appName = 'paypets'
export const moduleName = 'articles'

export const types = {
	ADD_ARTICLE_REQUEST: `${ appName }/${ moduleName }/ADD_ARTICLE_REQUEST`,
	ADD_ARTICLE_SUCCESS: `${ appName }/${ moduleName }/ADD_ARTICLE_SUCCESS`,
	ADD_ARTICLE_ERROR: `${ appName }/${ moduleName }/ADD_ARTICLE_ERROR`,
}

export const actions = {
	addArticle: (handleResetPlace, {
		title,
		textArea,
		animals,
		category,
		city,
		price,
		phoneNumber,
		file
	}) => dispatch => {
		dispatch({ type: types.ADD_ARTICLE_REQUEST })

		const token = localStorage.getItem('token')

		function sendData(url, data) {
			const formData  = new FormData()
			
			for(let name in data) {
				if (typeof data[name] === 'object') {
					data[name].forEach(file => {
						formData.append('file', file)
					})
					
				} else {
					formData.append(name, data[name])
				}
				
			}

			fetch(url, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${ token }`
				},
				body: formData
			})
				.then(response => {
					if (response.ok) return response.json()
					return Promise.reject(response.json())
				})
				.then(result => {
					dispatch(actionsSnackbarReducer.handleSnackbar(result.message))
					dispatch({ type: types.ADD_ARTICLE_SUCCESS })
				})
				.catch(err => {
					err.then(res => {
						dispatch(actionsSnackbarReducer.handleSnackbar(res.message))
						dispatch({ type: types.ADD_ARTICLE_ERROR })
					})
				})
		}

		sendData(`${ config.payPetsApiUrl }/api/feed/post`,
			{ title,
				content: textArea,
				animalType: animals,
				postType: category,
				city,
				price: Number(price) ? Number(price) : 0,
				phoneNumber,
				file })
	},

	updateCardView: (userId, cardId, cardView) => dispatch => {
		
	},

	removeCardsInDb: () => dispatch => {

	}
}

const initialState = {
	fetchingAddingArticle: false,
	errorAddingArticle: false
}

export default (state = initialState, action) => {
	const { type } = action

	switch (type) {
	case types.ADD_ARTICLE_REQUEST: return {
		fetchingAddingArticle: true,
		errorAddingArticle: false
	}
	case types.ADD_ARTICLE_SUCCESS: return {
		fetchingAddingArticle: false,
		errorAddingArticle: false
	}
	case types.ADD_ARTICLE_ERROR: return {
		fetchingAddingArticle: false,
		errorAddingArticle: true
	}

	default: return state
	}
}