import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import { Form, Field, reduxForm } from 'redux-form'

import { renderField, validate } from '../formValidate'
import { normilizeNumber, normilizeText, validateInputs } from '../validationsInputs'
import { actions as authActions } from '../../../ducks/auth'

class RegistrationFormComponent extends Component {

	state = {
		city: { value: 'Москва' },
		disabledButton: true
	}

	componentWillUpdate(nextProps) {
		if (nextProps !== this.props) {
			this.disabledSubmitButton(nextProps)
		}
	}

	disabledSubmitButton = nextProps => {
		const { registrationForm: { values } } = nextProps

		if (values &&
			values.name &&
			values.surname &&
			values.phoneNumber &&
			values.password &&
			values.email &&
			values.name.match(validateInputs.name) &&
			values.surname.match(validateInputs.surname) &&
			values.phoneNumber.match(validateInputs.phoneNumber) &&
			values.password.match(validateInputs.password) &&
			values.email.match(validateInputs.email)) {

			this.setState({ disabledButton: false })
		} else {
			this.setState({ disabledButton: true })
		}
	}

	handleReg = event => {
		event.preventDefault()

		const { registrationForm, signUp } = this.props

		let params = {
			inpName: registrationForm.values.name,
			inpSurname: registrationForm.values.surname,
			inpNumberReg: registrationForm.values.phoneNumber,
			inpPasswordReg: registrationForm.values.password,
			inpCityReg: registrationForm.values.city,
			inpEmailReg: registrationForm.values.email
		}

		signUp({
			email: params.inpEmailReg,
			password: params.inpPasswordReg,
			name: params.inpName,
			surName: params.inpSurname,
			city: params.inpCityReg,
			phoneNumber: params.inpNumberReg
		})
	}

	render() {
		const { filterCity } = this.props

		const styles = {
			floatingLabelStyle: { 'color': '#b1adad' },
			labelStyle: { 'color': '#7c7c7c', top: '21px' },
			floatingLabelFocusStyle: { 'color': '#2396f1' }
		}

		return(<Form onSubmit={ this.handleReg } className='registrationForm'>
			<div className='wrapInputs'>
				<Field
					type='text'
					label='Имя'
					name='name'
					normalize={ normilizeText }
					component={ renderField }
				/>
				<Field
					type='text'
					label='Фамилия'
					name='surname'
					normalize={ normilizeText }
					component={ renderField }
				/>
				<Field
					type='tel'
					label='Номер телефона'
					name='phoneNumber'
					normalize={ normilizeNumber }
					component={ renderField }
				/>
				<Field
					type='password'
					label='Пароль'
					name='password'
					component={ renderField }
				/>
				<Field
					name='city'
					component={ renderField }
					type='select'
					extra={ {
						floatingLabelStyle: styles.floatingLabelStyle,
						labelStyle: styles.labelStyle,
						floatingLabelText: 'Город',
						floatingLabelFixed: true,
						hintText: this.state.city.value,
						selectedMenuItemStyle: styles.floatingLabelFocusStyle
					} }
				>
					{
						filterCity.citys.map((elem, idx) => <MenuItem
							className='selectItem'
							name='selectItem'
							value={ elem }
							primaryText={ <option>{ elem }</option> }
							key={ idx }
						/>)
					}
				</Field>

				<Field
					type='text'
					label='Email'
					name='email'
					component={ renderField }
				/>
			</div>

			<div>
				<input
					type='submit'
					value='Зарегистрироваться'
					className={ classNames({
						'btnReg': true,
						'button2': true,
						'disabledButton': this.state.disabledButton
					}) }
					disabled={ this.state.disabledButton }
				/>
			</div>

		</Form>)
	}
}

RegistrationFormComponent = reduxForm({
	form: 'registrationForm',
	initialValues: { city: 'Москва' },
	validate
})(RegistrationFormComponent)

const mapStateToProps = state => ({
	filterCity: state.filterCity,
	registrationForm: state.form.registrationForm
})

export default connect(mapStateToProps, { ...authActions })(RegistrationFormComponent)