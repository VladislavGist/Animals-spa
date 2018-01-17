import 'whatwg-fetch'
import axios from 'axios'
// const urlutils = require('url')

import { types as preloaderTypes } from './preloader'
// import { types as toggleTypes } from './toggleAddMoreBtn'

export const types = {
	GET_DATA_SERVER: 'SERVER_REDUCER/GET_DATA_SERVER',
	CLEAR_STATE_DATA_SERVER: 'SERVER_REDUCER/CLEAR_STATE_DATA_SERVER'
}

export const actions = {

	getCards: url => dispatch => {

		dispatch({ type: preloaderTypes.PRELOADER_UPDATE_LOADING, payload: 80 })

		axios.get(url)
			.then(response => {
				dispatch({ type: types.CLEAR_STATE_DATA_SERVER })
				dispatch({ type: types.GET_DATA_SERVER, payload: response.data })
			})
			.then(() => {
				dispatch({ type: preloaderTypes.PRELOADER_UPDATE_LOADING, payload: 100 })
			})
			.catch()
	},

	onHandleClearState: () => ({ type: types.CLEAR_STATE_DATA_SERVER })
}


export default (state = { advertisementList: [] }, action) => {
	switch (action.type) {
	case types.GET_DATA_SERVER: return {
		advertisementList: [...action.payload ]
	}
	case types.CLEAR_STATE_DATA_SERVER: return state
	default: return state
	}
}