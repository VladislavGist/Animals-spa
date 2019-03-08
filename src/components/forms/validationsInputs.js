export const validateInputs = {
	phoneNumber: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
	textArea: /^[a-zA-Zа-яА-Я-0-9 ]{10,200}$/,
	password: /^.{6,200}$/,
	name: /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я ]+[a-zA-Zа-яА-Я]?$/u,
	title: /^[a-zA-Zа-яА-Я-0-9 ]{10,57}$/,
	lastName: /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я ]+[a-zA-Zа-яА-Я]?$/u,
	email: /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/,
	price: /^[0-9]{2,6}$/
}

export const normilizeNumber = values => values.replace(/[^\d]/g, '')

export const normilizeText = values => values.replace(/[^\D]/g, '')