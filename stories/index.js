import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

import { store } from '../src/store'

import Wrapper from './Wrapper'
import TabsFormsComponent from '../src/components/forms/tabsForms/TabsFormsComponent'
import AddCardFormComponent from '../src/components/forms/addCardForm/AddCardFormComponent'

storiesOf('loginFormComponent', module)
	.add('default', () => {
		return (
			<MuiThemeProvider>
				<Provider store={ store }>
					<Wrapper>
						<TabsFormsComponent />
					</Wrapper>
				</Provider>
			</MuiThemeProvider>
		)
	})

storiesOf('AddCardFormComponent', module)
	.add('default', () => {
		return (
			<MuiThemeProvider>
				<Provider store={ store }>
					<Wrapper>
						<AddCardFormComponent />
					</Wrapper>
				</Provider>
			</MuiThemeProvider>
		)
	})