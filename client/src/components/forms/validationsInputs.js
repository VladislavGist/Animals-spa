export const validateInputs = {
	phoneNumber: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
	textArea: /^.{10,200}$/,
	password: /^.{10,200}$/,
	name: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
	title: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
	surname: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
	email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
	price: /^[0-9]{2,6}$/
}

// /^[a-z0-9_-]{6,18}$/,

export const normilizeNumber = values => values.replace(/[^\d]/g, '')

export const normilizeText = values => values.replace(/[^\D]/g, '')