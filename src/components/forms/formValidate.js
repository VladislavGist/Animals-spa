import React from 'react'

export const renderField = ({
	input,
	label,
	type,
	meta: { touched, error, warning }
}) => (
	<div>
		<label>{ label }</label>
		<div>
			<input { ...input } placeholder={ label } type={ type } />
			{touched &&
			((error && <span>{ error }</span>) ||
			(warning && <span>{ warning }</span>))}
		</div>
	</div>
)

export const validate = values => {

	const errors = {}

	if (!values.username) {
		errors.username = 'Поле обязательно для заполнения!'
	}

	return errors
}