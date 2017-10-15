
let photosReducer;
export default photosReducer = (state = [{
		"p0": false,
		"p1": false,
		"p2": false,
		"p3": false,
		"p4": false
	}], action) => {
	let sta, newSta, res;
	switch(action.type) {
		case "ADD_PHOTO0":
			sta = [...state][0];
			newSta = [...state][0]['p0'] = action.payload;
			res = Object.assign(sta, newSta);
			return [
				res
			];
			break;
		case "ADD_PHOTO1":
			sta = [...state][0];
			newSta = [...state][0]['p1'] = action.payload;
			res = Object.assign(sta, newSta);
			return [
				res
			];
			break;
		case "ADD_PHOTO2":
			sta = [...state][0];
			newSta = [...state][0]['p2'] = action.payload;
			res = Object.assign(sta, newSta);
			return [
				res
			];
			break;
		case "ADD_PHOTO3":
			sta = [...state][0];
			newSta = [...state][0]['p3'] = action.payload;
			res = Object.assign(sta, newSta);
			return [
				res
			];
			break;
		case "ADD_PHOTO4":
			sta = [...state][0];
			newSta = [...state][0]['p4'] = action.payload;
			res = Object.assign(sta, newSta);
			return [
				res
			];
			break;
		default:
			return state;
	}
};