import axios from 'axios'
import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

export const types = {
	GET_DATA_SERVER_COMPL_AND_REJ: 'CARD_COMPL/GET_DATA_SERVER_COMPL_AND_REJ',
	CLEAR_STATE_GET_DATA_SERVER_COMPL_AND_REJ: 'CARD_COMPL/CLEAR_STATE_GET_DATA_SERVER_COMPL_AND_REJ',
}

export const actions = {

	loadCardsComplAndRej: url => dispatch => {
		axios.get(url)
			.then(
				response => dispatch({ type: types.GET_DATA_SERVER_COMPL_AND_REJ, payload: response.data }),
				() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка ComplAndRej')))
			.catch(() => dispatch(actionsSnackbarReducer.handleSnackbar('Ошибка сервера ComplAndRej')))
	},
	
	clearReducerCardsComplAndRej: () => ({ type: types.CLEAR_STATE_GET_DATA_SERVER_COMPL_AND_REJ })
}

export default (state = [], action) => {
	switch (action.type) {
	case types.GET_DATA_SERVER_COMPL_AND_REJ: return action.payload
	case types.CLEAR_STATE_GET_DATA_SERVER_COMPL_AND_REJ: return state
	default: return state
	}
}