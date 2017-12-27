import React from 'react'

import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from '../src/store'
// import { action } from '@storybook/addon-actions'

import LoginFormComponent from '../src/components/forms/loginForm/loginFormComponent'

storiesOf('loginFormComponent', module)
	.add('default', () => {
		return (
			<Provider store={ store }>
				<LoginFormComponent />
			</Provider>
		)
	})