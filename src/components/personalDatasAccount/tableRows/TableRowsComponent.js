import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Field, reduxForm } from 'redux-form'

import { renderField, validate } from '../../forms/formValidate'
import { normilizeNumber, validateInputs } from '../../forms/validationsInputs'

class TableRowsComponent extends Component {

	handleSubmitForm = () => {}

	render() {

		const { filterCity } = this.props.state

		const styles = {
			floatingLabelStyle: { 'color': '#b1adad' },
			labelStyle: { 'color': '#7c7c7c', top: '21px' },
			floatingLabelFocusStyle: { 'color': '#2396f1' }
		}

		// отправка данных на сервер
		// onHandlePOSTName = () => {
		//
		// 	const { state, updateUserDatas } = this.props
		//
		// 	// проверка
		// 	// взять и передать данные
		//
		// 	updateUserDatas(`${ process.env.URL }/updateUserData?userId='${ state.loginUser.user_id }'&parametr=name&value='${ '' }'`)
		// }
		//
		// onHandlePOSTPhoneNumber = () => {
		//
		// 	const { state, updateUserDatas } = this.props
		//
		// 	// проверка
		// 	// взять и передать данные
		//
		// 	updateUserDatas(`${ process.env.URL }/updateUserData?userId=${ state.loginUser.user_id }&parametr=phoneNumber&value=${ '' }`)
		// }
		//
		// onHandlePOSTPhoneCity = () => {
		//
		// 	const { state, updateUserDatas } = this.props
		//
		// 	// проверка
		// 	// взять и передать данные
		//
		// 	updateUserDatas(`${ process.env.URL }/updateUserData?userId=${ state.loginUser.user_id }&parametr=city&value=${ '' }`)
		// }
		//
		// onHandlePOSTPhonePassword = () => {
		//
		// 	const { state, updateUserDatas } = this.props
		//
		// 	// проверка
		// 	// взять и передать данные
		//
		// 	updateUserDatas(`${ process.env.URL }/updateUserData?userId=${ state.loginUser.user_id }&parametr=password&value=${ '' }`)
		// }

		return <Form onSubmit={ this.handleSubmitForm } className='registrationForm TableRowsComponent'>

			<div>
				<Field
					name='name'
					type='text'
					label='Новое имя пользователя'
					normalize={ normilizeNumber }
					component={ renderField }
				/>
			</div>

			<div>
				<Field
					name='phoneNumber'
					type='tel'
					label='Номер телефона'
					normalize={ normilizeNumber }
					component={ renderField }
				/>
			</div>

			<div>
				<Field
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
						filterCity.citys.map((elem, idx) => <MenuItem
							className='selectItem'
							name='selectItem'
							value={ elem }
							primaryText={ <option>{ elem }</option> }
							key={ idx }
						/>)
					}
				</Field>
			</div>

			<div>
				<Field
					name='password'
					type='password'
					label='Введите новый пароль'
					normalize={ normilizeNumber }
					component={ renderField }
				/>
			</div>

			<div>
				<br/>
				<a href='javascript:void(0)' onClick={ this.handleSubmitForm }>Применить</a>
			</div>

		</Form>
	}
}

TableRowsComponent = reduxForm({
	form: 'rows',
	initialValues: { city: 'Москва' },
	validate
})(TableRowsComponent)

export default connect(state => ({ state, rows: state.form.rows }))(TableRowsComponent)