export const generateId = () => Date.now()

export const normalizeFirebaseDatas = obj => {
	let res = []

	for(let key in obj) {
		res.push( Object.assign({}, { key }, obj[key]))
	}

	return res
}