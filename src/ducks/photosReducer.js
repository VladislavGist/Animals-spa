import { types as typesValidatePlace } from './validarePlaceAnAd'

export const types = {
	ADD_PHOTO_0: 'PHOTOS_REDUCER/ADD_PHOTO_0',
	ADD_PHOTO_1: 'PHOTOS_REDUCER/ADD_PHOTO_1',
	ADD_PHOTO_2: 'PHOTOS_REDUCER/ADD_PHOTO_2',
	ADD_PHOTO_3: 'PHOTOS_REDUCER/ADD_PHOTO_3',
	ADD_PHOTO_4: 'PHOTOS_REDUCER/ADD_PHOTO_4'
}

export const actions = {

	handlePhoto0: () => dispatch => {
		dispatch({ type: types.ADD_PHOTO_0, payload: true })
		dispatch({ type: typesValidatePlace.PLACE_SUCCES_FALSE, payload: false })
	},

	handlePhoto1: () => dispatch => {
		dispatch({ type: types.ADD_PHOTO_1, payload: true })
		dispatch({ type: typesValidatePlace.PLACE_SUCCES_FALSE, payload: false })
	},

	handlePhoto2: () => dispatch => {
		dispatch({ type: types.ADD_PHOTO_2, payload: true })
		dispatch({ type: typesValidatePlace.PLACE_SUCCES_FALSE, payload: false })
	},

	handlePhoto3: () => dispatch => {
		dispatch({ type: types.ADD_PHOTO_3, payload: true })
		dispatch({ type: typesValidatePlace.PLACE_SUCCES_FALSE, payload: false })
	},

	handlePhoto4: () => dispatch => {
		dispatch({ type: types.ADD_PHOTO_4, payload: true })
		dispatch({ type: typesValidatePlace.PLACE_SUCCES_FALSE, payload: false })
	},

	onResetPlace: () => dispatch => {
		dispatch({ type: typesValidatePlace.RESET_PLACE })
		dispatch({ type: types.ADD_PHOTO_0, payload: false })
		dispatch({ type: types.ADD_PHOTO_1, payload: false })
		dispatch({ type: types.ADD_PHOTO_2, payload: false })
		dispatch({ type: types.ADD_PHOTO_3, payload: false })
		dispatch({ type: types.ADD_PHOTO_4, payload: false })
	}
}

const initialState = [{
	'p0': false,
	'p1': false,
	'p2': false,
	'p3': false,
	'p4': false
}]

export default (state = initialState, action) => {

	let sta, newSta, res

	switch (action.type) {

	case types.ADD_PHOTO_0:
		sta = [...state][0]
		newSta = [...state][0]['p0'] = action.payload
		res = Object.assign(sta, newSta)
		return [res]

	case types.ADD_PHOTO_1:
		sta = [...state][0]
		newSta = [...state][0]['p1'] = action.payload
		res = Object.assign(sta, newSta)
		return [res]

	case types.ADD_PHOTO_2:
		sta = [...state][0]
		newSta = [...state][0]['p2'] = action.payload
		res = Object.assign(sta, newSta)
		return [res]

	case types.ADD_PHOTO_3:
		sta = [...state][0]
		newSta = [...state][0]['p3'] = action.payload
		res = Object.assign(sta, newSta)
		return [res]

	case types.ADD_PHOTO_4:
		sta = [...state][0]
		newSta = [...state][0]['p4'] = action.payload
		res = Object.assign(sta, newSta)
		return [res]

	default: return state
	}
}