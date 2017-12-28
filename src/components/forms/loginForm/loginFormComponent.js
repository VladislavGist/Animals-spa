import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Form, Field, reduxForm } from 'redux-form'

import { renderField, validate } from '../formValidate'

import './loginFormStyles.sass'

class LoginFormComponent extends Component {

	state = {
		value: '0',
		slideIndex: 0
	}

	handleSubmit = event => {
		event.preventDefault()
		console.log('send form')
	}

	handleActive = e => {
		this.setState({
			slideIndex: e.props.value
		})
	}

	render() {

		const { loginUser } = this.props.state

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
			tabTemplateStyle: {

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
						<Form onSubmit={ this.handleSubmit }>

							<Field
								name='phoneNumber'
								type='tel'
								label='Номер телефона'
								component={ renderField }
							/>

							<Field
								name='password'
								type='password'
								label='Пароль'
								component={ renderField }
							/>

							<div>
								{
									loginUser.error ?
										<p className='loginFormErrMess'>
											{
												loginUser.error
											}
										</p> : null
								}
							</div>

							<div>
								<input
									type='submit'
									value='Войти'
									className='button2'
									onClick={ this.handleSubmit }
								/>
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
