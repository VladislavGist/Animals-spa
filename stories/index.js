import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

import { store } from '../src/store'

import Wrapper from './Wrapper'
import LoginFormComponent from '../src/components/forms/loginForm/loginFormComponent'

storiesOf('loginFormComponent', module)
	.add('default', () => {
		return (
			<MuiThemeProvider>
				<Provider store={ store }>
					<Wrapper>
						<LoginFormComponent />
					</Wrapper>
				</Provider>
			</MuiThemeProvider>
		)
	})