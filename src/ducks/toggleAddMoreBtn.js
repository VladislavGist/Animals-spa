import 'whatwg-fetch'
const urlutils = require('url')

export const types = {
	COUNT_CARDS_TRUE: 'TOGGLE_ADD_MORE_BTN/COUNT_CARDS_TRUE',
	COUNT_CARDS_FALSE: 'TOGGLE_ADD_MORE_BTN/COUNT_CARDS_FALSE'
}

export const actions = {
	allCards: url => dispatch => {
		fetch(url)
			.then(response => {
				if (response.status !== 200) {
					console.log('all cards error')
				} else {
					response.json()
						.then(data => {
							let zaprosCount = 0
							zaprosCount = urlutils.parse(url).pathname.split('/')[9]

							if (data[0]['COUNT(card_id)'] > zaprosCount) {
								dispatch({ type: 'COUNT_CARDS_TRUE', payload: true })
							} else {
								dispatch({ type: 'COUNT_CARDS_FALSE', payload: false })
							}
						})
				}
			})
			.catch(() => console.log('add cards catch'))
	}
}

export default (state = false, action) => {

	switch (action.type) {

	case types.COUNT_CARDS_TRUE: return action.payload

	case types.COUNT_CARDS_FALSE: return action.payload

	default: return state
	}
}