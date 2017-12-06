import $ from 'jquery'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import snackbar from '../actions/snackbar.jsx'
import connectMess from '../actions/connectMess.jsx'

import './Contacts.sass'

class Contacts extends Component {

	handleConnectMess = () => {
		if ($('.formContacts .checkBoxLink')[0].children[0].checked === true) {
			this.props.onHandleConnectMess(`${process.env.URL}/sendus?name=${$('#contName')[0].value}&email=${$('#contEmail')[0].value}&title=${$('#contTitle')[0].value}&mess=${$('#contMess')[0].value}`)
		} else {
			this.props.onHandleSnackbar('Дайте согласие на обработку Ваших данных')
		}
	}

	messagePlace = () => {
		return (
			<div className='mesagePlace'>
				<i className='fa fa-check-circle' aria-hidden='true' />
				<p>{ this.props.state.contactFormStatus.message }</p>
			</div>
		)
	}

	componentWillUnmount() {
		$('#contName').value = ''
		$('#contEmail').value = ''
		$('#contTitle').value = ''
		$('#contMess').value = ''
		this.props.onHandleConnectClear()
	}

	style = {
		checkbox: {
			marginTop: '20px'
		}
	}

	render() {

		return (
			<div className='contacts'>
				<div className='formContacts'>
					
					<p className='conTitle'>
						Свяжитесь с нами по любым интересующим Вас вопросам (что-то не работает, реклама, сотрудничество, идеи и т.д.)
					</p>
					<TextField
						id='contName'
						hintText='Ваше имя'
					/>
					<TextField
						id='contEmail'
						hintText='Ваш email'
					/>
					<TextField
						id='contTitle'
						hintText='Тема сообщения'
					/>
					<TextField
						id='contMess'
						hintText='Сообщение'
						multiLine={ true }
						rows={ 2 }
					/>
					<a href='javascript:void(0)' className='button2' onClick={ ::this.handleConnectMess }>Отправить</a>
					<Checkbox
						label='Даю согласие на обработку персональных данных'
						style={ this.style.checkbox }
						className='checkBoxLink'
					/>
					<Link to='conf'>Политика конфиденциальности</Link>
					{
						this.props.state.contactFormStatus !== false ? ::this.messagePlace() : null
					}
				</div>

				<div className='author'>
					<p className='conTitle'>CEO: Дружбинский Владислав Романович. <br/> Автор, основатель и главный разработчик веб-приложения.</p>
					<a href='https://vk.com/vladfebruary' target='_blank'>vk.com/vladfebruary</a>
					<div className='imageAuthor'>
						<img src='uploads/author.jpg' alt='author' />
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({ state }),
	dispatch => ({
		onHandleConnectMess: url => {
			dispatch(connectMess(url))
		},
		onHandleConnectClear: () => {
			dispatch({ type: 'TOOLTIP_CLEAR' })
		},
		onHandleSnackbar: data => {
			dispatch(snackbar(data))
		}
	})
)(Contacts)