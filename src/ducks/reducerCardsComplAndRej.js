export const types = {
	GET_DATA_SERVER_COMPL_AND_REJ: 'CARD_COMPL/GET_DATA_SERVER_COMPL_AND_REJ',
	CLEAR_STATE_GET_DATA_SERVER_COMPL_AND_REJ: 'CARD_COMPL/CLEAR_STATE_GET_DATA_SERVER_COMPL_AND_REJ',
}

export const actions = {

	loadCardsComplAndRej: url => dispatch => {
		fetch(url)
			.then(
				response => {
					response.json()
						.then(data => {
							dispatch({ type: types.GET_DATA_SERVER_COMPL_AND_REJ, payload: data })
						})
						.catch(() => console.log('loadCards json catch'))
				})
			.catch(() => console.log('loadCards fetch catch'))
	},
	
	clearReducerCardsComplAndRej: () => ({ type: types.CLEAR_STATE_GET_DATA_SERVER_COMPL_AND_REJ })
}

export default (state = [], action) => {

	switch (action.type) {

	case types.GET_DATA_SERVER_COMPL_AND_REJ: return action.payload

	case types.CLEAR_STATE_GET_DATA_SERVER_COMPL_AND_REJ: return []

	default: return state
	}
}