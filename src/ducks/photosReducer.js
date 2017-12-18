import { types as typesValidatePlace } from './validarePlaceAnAd'

export const types = {
	ADD_PHOTO_0: 'PHOTOS_REDUCER/ADD_PHOTO_0',
	ADD_PHOTO_1: 'PHOTOS_REDUCER/ADD_PHOTO_1',
	ADD_PHOTO_2: 'PHOTOS_REDUCER/ADD_PHOTO_2',
	ADD_PHOTO_3: 'PHOTOS_REDUCER/ADD_PHOTO_3',
	ADD_PHOTO_4: 'PHOTOS_REDUCER/ADD_PHOTO_4'
}

export const actions = {

	handlePhoto0: elem => ({ type: types.ADD_PHOTO_0, payload: elem }),

	handlePhoto1: elem => ({ type: types.ADD_PHOTO_1, payload: elem }),

	handlePhoto2: elem => ({ type: types.ADD_PHOTO_2, payload: elem }),

	handlePhoto3: elem => ({ type: types.ADD_PHOTO_3, payload: elem }),

	handlePhoto4: elem => ({ type: types.ADD_PHOTO_4, payload: elem }),

	handleResetPlace: () => dispatch => {
		dispatch({ type: typesValidatePlace.RESET_PLACE })
		dispatch({ type: types.ADD_PHOTO_0, payload: null })
		dispatch({ type: types.ADD_PHOTO_1, payload: null })
		dispatch({ type: types.ADD_PHOTO_2, payload: null })
		dispatch({ type: types.ADD_PHOTO_3, payload: null })
		dispatch({ type: types.ADD_PHOTO_4, payload: null })
	}
}

const initialState = {
	elem0: null,
	elem1: null,
	elem2: null,
	elem3: null,
	elem4: null
}

export default (state = initialState, action) => {

	switch (action.type) {

	case types.ADD_PHOTO_0:
		return {
			...state,
			elem0: action.payload
		}

	case types.ADD_PHOTO_1:
		return {
			...state,
			elem1: action.payload
		}

	case types.ADD_PHOTO_2:
		return {
			...state,
			elem2: action.payload
		}

	case types.ADD_PHOTO_3:
		return {
			...state,
			elem3: action.payload
		}

	case types.ADD_PHOTO_4:
		return {
			...state,
			elem4: action.payload
		}

	case typesValidatePlace.RESET_PLACE: return initialState

	default: return state
	}
}