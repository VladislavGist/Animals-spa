import { Tabs, Tab } from 'material-ui/Tabs'
import React, { Component, PropTypes } from 'react'

import LoginFormComponent from '../loginForm/LoginFormComponent'
import RegistrationFormComponent from '../registrationForm/RegistrationFormComponent'

if (process.env.BROWSER) {
	require('./tabsFormsStyles.sass')
}

export default class TabsForms extends Component {

	state = {
		value: '0',
		slideIndex: 0
	}

	handleActive = e => this.setState({ slideIndex: e.props.value })

	handleChange = value => this.setState({ value: value })

	render() {
		const { handleClose } = this.props

		const styles = {
			inkBarStyle: { backgroundColor: false },
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
			}
		}

		styles.tab = []
		styles.tab[0] = styles.default_tab
		styles.tab[1] = styles.default_tab
		styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[this.state.slideIndex], styles.active_tab)

		return (<Tabs
			value={ this.state.value }
			onChange={ this.handleChange }
			className='sendAndRegTabs'
			inkBarStyle={ styles.inkBarStyle }
			contentContainerStyle={ styles.tabTemplateStyle }>

			<Tab
				label='Войти'
				value='0'
				className='tabBtn'
				style={ styles.tab[0] }
				onActive={ this.handleActive }
			>
				<div>
					<LoginFormComponent />
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
					<RegistrationFormComponent handleClose={ handleClose } />
				</div>
			</Tab>

		</Tabs>)
	}
}

TabsForms.propTypes = {
	handleClose: PropTypes.func.isRequired
}