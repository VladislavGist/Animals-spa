import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { normalizeFirebaseDatas } from './/ducks/utils'

import { actions as actionsSnackbar } from '../src/ducks/snackbarReducer'
import { actions as actionsAllParamsUrl } from '../src/ducks/allParamsUrl'

import './config'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

if (process.env.BROWSER) {
	require('./styles/styles.sass')
	require('./styles/base.sass')
	require('./App.sass')
}

import Sidebar from './components/sidebar/Sidebar.js'
import Menu from './components/menu/MenuComponent.js'
import Footer from './components/footer/FooterComponent.js'
import LinearProgressExampleDeterminate from './components/progressBar/ProgressBarComponent.js'
import SnackbarExampleSimple from './components/snackbarExampleSimple/SnackbarExampleSimpleComponent.js'

class App extends Component {

	componentDidMount() {
		const { removeCardsInDb } = this.props

		removeCardsInDb()
	}

	render() {
		const { location, preloaderLoading } = this.props

		const classes = classNames({
			spaContent: true,
			modileModificator: location === '/personalArea'
		})

		return (
			<MuiThemeProvider>
				<div className='wrapApp'>
					{
						(preloaderLoading > 0 && preloaderLoading !== 100) && <LinearProgressExampleDeterminate className='progressBar' />
					}
					<div className='container'>
						<Sidebar />
						<div className='wrapBackground'>
							<div className='wrapper'>
								<Menu />
								<div className={ classes }>{ this.props.children }</div>
							</div>
							<Footer />
						</div>
					</div>
					<SnackbarExampleSimple />
				</div>
			</MuiThemeProvider>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	preloaderLoading: state.preloader.loading,
	location: ownProps.location.pathname,
	authError: state.auth.userError && state.auth.userError.code
})

export default connect(mapStateToProps, { ...actionsSnackbar, ...actionsAllParamsUrl })(App)