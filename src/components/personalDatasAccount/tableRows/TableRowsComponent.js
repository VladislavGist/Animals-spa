import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import { SelectField } from 'redux-form-material-ui'
import React, { Component, PropTypes } from 'react'
import { Form, Field, reduxForm } from 'redux-form'
import CircularProgress from 'material-ui/CircularProgress'
import _ from 'lodash'

import { renderField, validate } from '../../forms/formValidate'
import { validateInputs } from '../../forms/validationsInputs'
import { actions as actionsAuthReducer } from '../../../ducks/auth'

import config from '../../../../config'

class TableRowsComponent extends Component {

	state = {
		changeName: false,
		changeLastName: false,
		changeEmail: false,
		changeCity: false,

		disabledButton: true
	}

	componentWillUpdate(nextProps) {
		if (nextProps !== this.props) {
			this.disabledSubmitButton(nextProps)
		}
	}

	disabledSubmitButton = nextProps => {
		const { rows: { values } } = nextProps

		if (values && Object.keys(values).length > 0 &&
			(values.name ? values.name.match(validateInputs.name) : true) &&
			(values.lastName ? values.lastName.match(validateInputs.lastName) : true) &&
			(values.email ? values.email.match(validateInputs.email) : true)
		) {
			this.setState({ disabledButton: false })
		} else {
			this.setState({ disabledButton: true })
		}
	}

	handleSubmitForm = () => {
		const {
			rows: { values },
			updateUserData
		} = this.props

		updateUserData(`${ config.payPetsApiUrl }/api/auth/changeUserData`, values)
	}

	render() {
		const {
			cityList,
			name,
			lastName,
			email,
			city
		} = this.props

		const {
			changeName,
			changeLastName,
			changeCity,
			changeEmail,

			disabledButton
		} = this.state

		return (
			<Form
				onSubmit={ this.handleSubmitForm }
				className='registrationForm TableRowsComponent'>
				<br />
				<div>
					<p>Ваше имя: { name }</p>
					<div>
						<a
							href='javascript:void(0)'
							onClick={ () => this.setState({ changeName: !changeName }) }>
							{ changeName ? 'Свернуть' : 'Изменить' }
						</a>
					</div>
					{ changeName ? (
						<Field
							name='name'
							type='text'
							label='Новое имя пользователя'
							component={ renderField }
						/>
					) : null }
				</div>
				<br />

				<div>
					<p>Ваша фамилия: { lastName }</p>
					<div>
						<a
							href='javascript:void(0)'
							onClick={ () => this.setState({ changeLastName: !changeLastName }) }>
							{ changeLastName ? 'Свернуть' : 'Изменить' }
						</a>
					</div>
					{ changeLastName ? (
						<Field
							name='lastName'
							type='text'
							label='Фамилия'
							component={ renderField }
						/>
					) : null }
				</div>
				<br />

				<div>
					<p>Город: { city }</p>
					<div>
						<a
							href='javascript:void(0)'
							onClick={ () => this.setState({ changeCity: !changeCity }) }>
							{ changeCity ? 'Свернуть' : 'Изменить' }
						</a>
					</div>

					{ cityList ? (
						changeCity ? (
							<Field
								name='city'
								component={ SelectField }
								floatingLabelText='Город'
							>
								{ cityList.map((elem, idx) => <MenuItem
									className='selectItem'
									name='selectItem'
									value={ elem }
									primaryText={ <option>{ elem }</option> }
									key={ idx }
								/>) }
							</Field>
						) : null
					) : <CircularProgress size={ 60 }/> }
				</div>
				<br />

				<div>
					<p>Email: { email }</p>
					<div>
						<a
							href='javascript:void(0)'
							onClick={ () => this.setState({ changeEmail: !changeEmail }) }>
							{ changeEmail ? 'Свернуть' : 'Изменить' }
						</a>
					</div>

					{ changeEmail ? (
						<Field
							name='email'
							type='text'
							label='Новый email'
							component={ renderField }
						/>
					) : null }
				</div>
				<br />

				<div>
					<br/>
					{ !disabledButton ? (
						<a
							href='javascript:void(0)'
							onClick={ this.handleSubmitForm }>
							Применить
						</a>
					) : null }
				</div>

			</Form>) }
}

TableRowsComponent.propTypes = {
	rows: PropTypes.object,
	name: PropTypes.string,
	lastName: PropTypes.string,
	email: PropTypes.string,
	city: PropTypes.string
}

TableRowsComponent = reduxForm({
	form: 'rows',
	validate
})(TableRowsComponent)

export default connect(
	state => {
		let user = state.auth.user

		return {
			rows: state.form.rows,
			cityList: state.filterCity.cityList,
			name: user && user.name,
			lastName: user && user.lastName,
			email: user && user.email,
			city: user && user.city
		}
	},
	{ ...actionsAuthReducer })
(TableRowsComponent)