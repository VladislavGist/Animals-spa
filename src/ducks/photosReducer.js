import { types as typesValidatePlace } from './validatePlaceAnAd'

export const types = {
	ADD_PHOTO: 'PHOTOS_REDUCER/ADD_PHOTO'
}

export const actions = {

	handleAddPhoto: file => ({ type: types.ADD_PHOTO, payload: true, file01: file }),

	handleResetPlace: () => dispatch => {
		dispatch({ type: typesValidatePlace.RESET_PLACE })
		dispatch({ type: types.ADD_PHOTO, payload: false })
	}
}

const initialState = {
	addPhoto: false
}

export default (state = initialState, action) => {

	switch (action.type) {

	case types.ADD_PHOTO: return {
		...state,
		addPhoto: action.payload,
		file01: action.file
	}

	case typesValidatePlace.RESET_PLACE: return initialState

	default: return state
	}
}