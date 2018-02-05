import 'whatwg-fetch'
import axios from 'axios'

import { actions as actionsTypes } from './preloader'
import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

export const types = {
	GET_DATA_SERVER: 'SERVER_REDUCER/GET_DATA_SERVER',
	CLEAR_STATE_DATA_SERVER: 'SERVER_REDUCER/CLEAR_STATE_DATA_SERVER'
}

export const actions = {

	getCards: url => dispatch => {

		dispatch(actionsTypes.handleUpdateStateLoading(80))

		// axios.get(`${ process.env.URL_PATH }/api/list-hot-adv`)
		// 	.then(
		// 		response => {
		// 			console.log({ response })
		// 		}
		// 		,
		// 		rejected => {
		// 			console.log({ rejected })
		// 		}
		// 	)
		// 	.catch(err => console.log({ err }))

		axios.get(url = `${ process.env.URL_PATH }/api/list-hot-adv`)
			.then(
				response => {

					console.log('yes')
					console.log('url: ', url)
					console.log('response: ', response)

					dispatch({ type: types.CLEAR_STATE_DATA_SERVER })
					dispatch({ type: types.GET_DATA_SERVER, payload: response.data })
				},
				err => {
					console.log('no')
					console.log('url: ', url)
					console.log('err: ', err)

					dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка запроса'))
				}
			)
			.then(() => {
				dispatch(actionsTypes.handleUpdateStateLoading(100))
			})
			.catch(err => {
				dispatch(actionsTypes.handleUpdateStateLoading(100))
				// console.log({ err })
				dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера'))
			})
	},

	onHandleClearState: () => ({ type: types.CLEAR_STATE_DATA_SERVER })
}


export default (state = { advertisementList: [] }, action) => {
	switch (action.type) {
	case types.GET_DATA_SERVER: return { advertisementList: [...action.payload ] }
	case types.CLEAR_STATE_DATA_SERVER: return state
	default: return state
	}
}