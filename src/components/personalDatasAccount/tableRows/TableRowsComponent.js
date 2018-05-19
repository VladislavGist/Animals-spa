import firebase from 'firebase'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import React, { Component, PropTypes } from 'react'
import { Form, Field, reduxForm } from 'redux-form'

import { renderField, validate } from '../../forms/formValidate'
import { normilizeNumber, validateInputs } from '../../forms/validationsInputs'
import { actions as actionsSnackbarReducer } from '../../../ducks/snackbarReducer'

class TableRowsComponent extends Component {

	state = {
		changeName: false,
		changeSurName: false,
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

		if (Object.keys(values).length > 1 &&
			(values.name ? values.name.match(validateInputs.name) : true) &&
			(values.surName ? values.surName.match(validateInputs.surname) : true) &&
			(values.email ? values.email.match(validateInputs.email) : true)
		) {
			this.setState({ disabledButton: false })
		} else {
			this.setState({ disabledButton: true })
		}
	}

	handleSubmitForm = () => {
		const {
			handleSnackbar,
			uid,
			rows: { values },
			name,
			surName,
			email,
			city
		} = this.props

		firebase.database().ref(`users/${ uid }`).update({
			name: values.name || name,
			surName: values.surName || surName,
			email: values.email || email,
			city: values.city || city
		})
			.then(() => handleSnackbar('Изменено'))
			.catch(err => handleSnackbar(`Ошибка: ${ err }`))
	}

	render() {
		const {
			citys,
			name,
			surName,
			email,
			city
		} = this.props

		const {
			changeName,
			changeSurName,
			changeCity,
			changeEmail,

			disabledButton
		} = this.state

		const styles = {
			floatingLabelStyle: { 'color': '#b1adad' },
			labelStyle: { 'color': '#7c7c7c', top: '7px' },
			floatingLabelFocusStyle: { 'color': '#2396f1' }
		}

		return <Form onSubmit={ this.handleSubmitForm } className='registrationForm TableRowsComponent'>
			<br />
			<div>
				<p>Ваше имя: { name }</p>
				<div>
					<a href='javascript:void(0)' onClick={ () => this.setState({ changeName: !changeName }) }>
						{ changeName ? 'Свернуть' : 'Изменить' }
					</a>
				</div>
				{
					changeName && <Field
						name='name'
						type='text'
						label='Новое имя пользователя'
						component={ renderField }
					/>
				}
			</div>
			<br />

			<div>
				<p>Ваша фамилия: { surName }</p>
				<div>
					<a href='javascript:void(0)' onClick={ () => this.setState({ changeSurName: !changeSurName }) }>
						{ changeSurName ? 'Свернуть' : 'Изменить' }
					</a>
				</div>
				{
					changeSurName && <Field
						name='surName'
						type='text'
						label='Фамилия'
						component={ renderField }
					/>
				}
			</div>
			<br />

			<div>
				<p>Город: { city }</p>
				<div>
					<a href='javascript:void(0)' onClick={ () => this.setState({ changeCity: !changeCity }) }>
						{ changeCity ? 'Свернуть' : 'Изменить' }
					</a>
				</div>
				{
					changeCity && <Field
						name='city'
						component={ renderField }
						type='select'
						extra={ {
							floatingLabelStyle: styles.floatingLabelStyle,
							labelStyle: styles.labelStyle,
							floatingLabelText: 'Город',
							floatingLabelFixed: true,
							hintText: this.props.rows && this.props.rows.values.city,
							selectedMenuItemStyle: styles.floatingLabelFocusStyle
						} }
					>
						{
							citys.map((elem, idx) => <MenuItem
								className='selectItem'
								name='selectItem'
								value={ elem }
								primaryText={ <option>{ elem }</option> }
								key={ idx }
							/>)
						}
					</Field>
				}
			</div>
			<br />

			<div>
				<p>Email: { email }</p>
				<div>
					<a href='javascript:void(0)' onClick={ () => this.setState({ changeEmail: !changeEmail }) }>
						{ changeEmail ? 'Свернуть' : 'Изменить' }
					</a>
				</div>
				{
					changeEmail && <Field
						name='email'
						type='text'
						label='Новый email'
						component={ renderField }
					/>
				}
			</div>
			<br />

			<div>
				<br/>
				{ !disabledButton && <a href='javascript:void(0)'onClick={ this.handleSubmitForm }>Применить</a> }
			</div>

		</Form>
	}
}

TableRowsComponent.propTypes = {
	handleSnackbar: PropTypes.func.isRequired,
	uid: PropTypes.string,
	rows: PropTypes.object,
	name: PropTypes.string,
	surName: PropTypes.string,
	email: PropTypes.string,
	city: PropTypes.string
}

TableRowsComponent = reduxForm({
	form: 'rows',
	initialValues: { city: 'Москва' },
	validate
})(TableRowsComponent)

export default connect(
	state => {
		let user = state.auth.user,
			userDatas = state.auth.userDatas

		return {
			rows: state.form.rows,
			citys: state.filterCity.citys,
			uid: user && user.uid,
			name: userDatas && userDatas.name,
			surName: userDatas && userDatas.surName,
			email: userDatas && userDatas.email,
			city: userDatas && userDatas.city
		}
	},
	{ ...actionsSnackbarReducer })
(TableRowsComponent)