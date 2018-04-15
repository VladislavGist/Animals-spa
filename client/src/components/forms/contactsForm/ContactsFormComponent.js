import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Field, reduxForm } from 'redux-form'

import { renderField, validate } from '../formValidate'
import { normilizeText, validateInputs } from '../validationsInputs'

import { actions as actionsSnackbarReducer } from '../../../ducks/snackbarReducer'
import { actions as actionsContactFormStatus } from '../../../ducks/contactFormStatus'

if (process.env.BROWSER) {
	require('./ContactsStyles.sass')
}

class ContactsForm extends Component {

	state = { disabledButton: true }

	componentWillUpdate(nextProps) {
		if (nextProps !== this.props) {
			this.disabledSubmitButton(nextProps)
		}
	}

	disabledSubmitButton = nextProps => {
		const { contactsForm: { values } } = nextProps

		if (values &&
			values.name &&
			values.email &&
			values.title &&
			values.textArea &&
			values.check &&
			values.name.match(validateInputs.name) &&
			values.email.match(validateInputs.email) &&
			values.title.match(validateInputs.title) &&
			values.textArea.match(validateInputs.textArea)
		) { this.setState({ disabledButton: false }) }
		else { this.setState({ disabledButton: true }) }
	}

	handleMessage = event => {
		event.preventDefault()

		const { contactsForm: { values }, handleSnackbar } = this.props

		fetch('https://us-central1-animals-bbfac.cloudfunctions.net/hell', {
			'Content-Type': 'application/x-www-form-urlencoded',
			method: 'POST',
			body: JSON.stringify(values)
		})
			.then(res => {
				if (res.status === 200) {
					handleSnackbar('Отправлено')
				} else {
					handleSnackbar('Ошибка отправки')
				}
			})
	}

	render() {
		const style = { checkbox: { marginTop: '20px' } }

		return (
			<div className='contacts'>
				<div className='formContacts'>
					<p className='conTitle'>
						Свяжитесь с нами по любым интересующим Вас вопросам (что-то не работает, реклама, сотрудничество, идеи и т.д.)
					</p>
					<Form onSubmit={ this.handleMessage } className='sendForm'>
						<Field
							type='text'
							label='Имя'
							name='name'
							normalize={ normilizeText }
							component={ renderField }
						/>
						<Field
							type='text'
							label='Email'
							name='email'
							component={ renderField }
						/>
						<Field
							type='text'
							label='Тема сообщения'
							name='title'
							normalize={ normilizeText }
							component={ renderField }
						/>
						<Field
							type='text'
							label='Сообщение'
							name='textArea'
							normalize={ normilizeText }
							component={ renderField }
						/>
						<div>
							<button
								className={ classNames({
									button2: true,
									disabledButton: this.state.disabledButton
								}) }
								disabled={ this.state.disabledButton }
								onClick={ this.handleMessage }
							>
								Отправить
							</button>
						</div>
						<Field
							type='checkbox'
							label='Даю согласие на обработку персональных данных'
							name='check'
							component={ renderField }
							className='checkBoxLink'
							extra={ { style: style.checkbox } }
						/>
						<Link to='conf'>Политика конфиденциальности</Link>
					</Form>
				</div>

				<div className='author'>
					<p className='conTitle'>CEO: Дружбинский Владислав Романович. <br/> Автор, основатель и главный разработчик веб-приложения.</p>
					<a href='https://vk.com/vladfebruary' target='_blank'>vk.com/vladfebruary</a>
					<div className='imageAuthor'>
						<img src='uploads/author.jpg' alt='author' />
					</div>
				</div>
			</div>
		)
	}
}

ContactsForm = reduxForm({
	form: 'contactsForm',
	validate
})(ContactsForm)

export default connect(
	state => ({
		state,
		contactsForm: state.form.contactsForm
	}),
	{ ...actionsContactFormStatus, ...actionsSnackbarReducer }
)(ContactsForm)