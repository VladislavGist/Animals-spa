import React from 'react'
import TextField from 'material-ui/TextField'

const style = {
	floatingLabelStyle: {
		'color': '#b1adad'
	},
	labelStyle: {
		'color': '#7c7c7c'
	},
	floatingLabelFocusStyle: {
		'color': '#2396f1'
	},
	underlineFocusStyle: {
		'borderColor': '#2396f1'
	},
	checkbox: {
		marginTop: '20px'
	}
}

export const renderField = ({
	input,
	label,
	type,
	meta: { touched, error, warning }
}) => <TextField
	hintText={ label }
	floatingLabelText={ label }
	name={ label }
	type={ type }
	{ ...input }
	underlineFocusStyle={ style.underlineFocusStyle }
	floatingLabelStyle={ style.labelStyle }
	floatingLabelFocusStyle={ style.floatingLabelFocusStyle }
	errorText={ touched && error } />

export const validate = values => {

	const errors = {}

	if (!values.phoneNumber) {
		errors.phoneNumber = 'Поле обязательно для заполнения!'
	} else if (!values.phoneNumber.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)) {
		errors.phoneNumber = 'Введите корректный номер телефона'
	}

	if (!values.password) {
		errors.password = 'Поле обязательно для заполнения!'
	} else if (!values.password.match(/^[a-z0-9_-]{6,18}$/)) {
		errors.password = 'Введите корректный пароль'
	}

	return errors
}