import 'whatwg-fetch'

export const types = {
	LOGIN_FALSE: 'LOGIN_USER/LOGIN_FALSE',
	LOGIN_TRUE: 'LOGIN_USER/LOGIN_TRUE'
}

export const actions = {

	loginFalse: () => ({ type: types.LOGIN_FALSE, payload: false }),

	loginAction: url => dispatch => {
		fetch(url)
			.then(response => {
				if (response.status !== 200) {
					response.json().then(data => dispatch({ type: types.LOGIN_FALSE, payload: data }))
				} else {
					response.json().then(data => dispatch({ type: types.LOGIN_TRUE, payload: data }))
				}
			})
			.catch(err => console.log(err))
	},

	updateDatasTrue: url => dispatch => {

		fetch(url)
			.then(response => {
				if (response.status !== 200) {
					console.log('Ошибка при обновлении данных пользователя')
				} else {
					response.json()
						.then(results => dispatch({ type: types.LOGIN_TRUE, payload: { results } }))
				}
			})
			.catch(err => console.log(err))
	}

}

export default (state = false, action) => {

	switch (action.type) {

	case types.LOGIN_FALSE: return action.payload

	case types.LOGIN_TRUE: return action.payload

	default: return state
	}
}