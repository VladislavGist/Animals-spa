export const generateId = () => Date.now()

export const getRandomInt = (min = 0, max = 9090909090) => Math.floor(Math.random() * (max - min)) + min

export const normalizeFirebaseDatas = obj => {
	let res = []

	for(let key in obj) {
		res.push( Object.assign({}, { key }, obj[key]))
	}

	return res
}

export const normalizeImgs = obj => {
	let res = []

	for(let key in obj) {
		res.push( Object.assign({}, { key }, { val: obj[key] } ))
	}

	return res
}