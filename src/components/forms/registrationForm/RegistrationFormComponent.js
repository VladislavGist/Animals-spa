import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import { Form, Field, reduxForm } from 'redux-form'
import { SelectField } from 'redux-form-material-ui'

import { renderField, validate } from '../formValidate'
import { actions as authActions } from '../../../ducks/auth'
import { normilizeNumber, normilizeText, validateInputs } from '../validationsInputs'

import LoginModal from '../../sendDialog/SendDialogComponent'

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
			values.check &&
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

	handleHideModal = () => {
		const { handleClose } = this.props

		handleClose()
	}

	render() {
		const { filterCity, auth: { userLoading, userError } } = this.props

		const styles = {
			floatingLabelStyle: { 'color': '#b1adad' },
			labelStyle: { 'color': '#7c7c7c', top: '7px' },
			floatingLabelFocusStyle: { 'color': '#2396f1' },
			checkbox: { marginTop: '20px' }
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
					component={ SelectField }
					floatingLabelStyle={ styles.floatingLabelStyle }
					labelStyle={ styles.labelStyle }
					floatingLabelText='Город'
					floatingLabelFixed={ true }
					hintText={ this.state.city.value }
					selectedMenuItemStyle={ styles.floatingLabelFocusStyle }
				>
					{
						filterCity.citys.map((elem, idx) => <MenuItem
							className='selectItem'
							name='selectItem'
							value={ elem }
							primaryText={ elem }
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

				<Field
					type='checkbox'
					label='Даю согласие на обработку персональных данных'
					name='check'
					component={ renderField }
					className='checkBoxLink'
					extra={ { style: styles.checkbox } }
				/>
				<Link to='conf' onClick={ this.handleHideModal }>Политика конфиденциальности</Link>
			</div>

			<div>
				<input
					type='submit'
					value={ userLoading && !userError ? 'Загрузка' : 'Зарегистрироваться' }
					className={ classNames({
						'btnReg': true,
						'button2': true,
						'disabledButton': this.state.disabledButton || (userLoading && !userError)
					}) }
					disabled={ this.state.disabledButton || (userLoading && !userError) }
				/>
			</div>
		</Form>)
	}
}

RegistrationFormComponent = reduxForm({
	form: 'registrationForm',
	initialValues: { city: 'Москва', check: false },
	validate
})(RegistrationFormComponent)

const mapStateToProps = state => ({
	filterCity: state.filterCity,
	registrationForm: state.form.registrationForm,
	auth: state.auth
})

export default connect(mapStateToProps, { ...authActions })(RegistrationFormComponent)