import { connect } from 'react-redux'
import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import { Form, Field, reduxForm } from 'redux-form'

import { renderField, validate } from '../formValidate'
import { normilizePhone, normilizeText } from '../validationsInputs'

class RegistrationFormComponent extends Component {

	state = {
		city: { value: 'Москва' }
	}

	handleChangeCity = (event, index, value) => this.setState({ city: { value } })

	handleReg = event => {
		event.preventDefault()
		console.log('send form')
	}

	render() {

		const { regReducer, filterCity } = this.props.state

		const styles = {
			floatingLabelStyle: {
				'color': '#b1adad'
			},
			labelStyle: {
				'color': '#7c7c7c',
				top: '21px'
			},
			floatingLabelFocusStyle: {
				'color': '#2396f1'
			},
			menuItem: {
				display: 'flex',
				alignItems: 'center'
			}
		}

		return(
			<Form onSubmit={ this.handleReg } className='registrationForm'>
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
						normalize={ normilizePhone }
						component={ renderField }
					/>
					<Field
						type='password'
						label='Пароль'
						name='password'
						component={ renderField }
					/>
					<Field
						name='favoriteColor'
						component={ renderField }
						type='select'
						extra={ {
							floatingLabelStyle: styles.floatingLabelStyle,
							labelStyle: styles.labelStyle,
							floatingLabelText: 'Город',
							selectedMenuItemStyle: styles.floatingLabelFocusStyle
						} }
					>
						{
							filterCity.citys.map((elem, idx) => <MenuItem
								className='selectItem'
								name='selectItem'
								style={ styles.menuItem }
								value={ elem }
								primaryText={ <option>{ elem }</option> }
								key={ idx }
							/>)
						}
					</Field>

					<Field type='text' label='Email' name='email' component={ renderField } />
				</div>

				{ regReducer !== '' ?
					<p className='codeInfo'>{ this.props.state.regReducer.message }</p>
					: null }

				<div>
					<input
						type='submit'
						value='Зарегистрироваться'
						className='btnReg button2'
						onClick={ this.handleReg }
					/>
				</div>

			</Form>
		)
	}
}

RegistrationFormComponent = reduxForm({
	form: 'registrationForm',
	validate
})(RegistrationFormComponent)

export default connect(state => ({ state }))(RegistrationFormComponent)