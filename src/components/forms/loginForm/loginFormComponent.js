import { connect } from 'react-redux'
import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Form, Field, reduxForm } from 'redux-form'

import './loginFormStyles.sass'

import { renderField, validate } from '../formValidate'

class LoginFormComponent extends Component {

	state = {
		value: '0',
		slideIndex: 0,
		city: {
			value: 'Москва'
		}
	}

	handleSubmit = event => {
		event.preventDefault()
		console.log('send form')
	}

	handleActive = e => this.setState({ slideIndex: e.props.value })

	handleChange = value => this.setState({ value: value })

	handleChangeCity = (event, index, value) => this.setState({ city: { value } })

	render() {

		const { loginUser, regReducer, filterCity } = this.props.state

		const styles = {
			inkBarStyle: {
				backgroundColor: false
			},
			default_tab: {
				backgroundColor: 'white',
				color: '#add1ed',
				height: 'auto'
			},
			active_tab:{
				backgroundColor: '#2397f3',
				color: 'white'
			},
			tabItemContainerStyle: {
				minHeight: '100px'
			},
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

		styles.tab = []
		styles.tab[0] = styles.default_tab
		styles.tab[1] = styles.default_tab
		styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[this.state.slideIndex], styles.active_tab)

		return (
			<Tabs
				value={ this.state.value }
				onChange={ this.handleChange }
				className='sendAndRegTabs'
				inkBarStyle={ styles.inkBarStyle }
				contentContainerStyle={ styles.tabTemplateStyle }
			>

				<Tab
					label='Войти'
					value='0'
					className='tabBtn'
					style={ styles.tab[0] }
					onActive={ this.handleActive }
				>
					<div>
						<Form onSubmit={ this.handleSubmit } className='sendForm'>
							<Field name='phoneNumber' type='tel' label='Номер телефона' component={ renderField } />
							<Field name='password' type='password' label='Пароль' component={ renderField } />

							<div>
								{ loginUser.error ?
									<p className='loginFormErrMess'>{ loginUser.error }</p>
									: null }
							</div>

							<div>
								<input type='submit' value='Войти' className='button2' onClick={ this.handleSubmit } />
							</div>

						</Form>
					</div>
				</Tab>

				<Tab
					label='Регистрация'
					value='1'
					className='tabBtn'
					style={ styles.tab[1] }
					onActive={ this.handleActive }
				>
					<div>
						<Form onSubmit={ this.handleSubmit } className='registrationForm'>
							<div className='wrapInputs'>
								<Field type='text' label='Имя' name='name' component={ renderField } />
								<Field type='text' label='Фамилия' name='surname' component={ renderField } />
								<Field type='tel' label='Номер телефона' name='phoneNumber' component={ renderField } />
								<Field type='password' label='Пароль' name='password' component={ renderField } />
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
								<input type='submit' value='Зарегистрироваться' className='btnReg button2' onClick={ this.handleSubmit }/>
							</div>

						</Form>
					</div>
				</Tab>

			</Tabs>
		)
	}
}

LoginFormComponent = reduxForm({
	form: 'newForm',
	validate
})(LoginFormComponent)

export default connect(state => ({ state }))(LoginFormComponent)
