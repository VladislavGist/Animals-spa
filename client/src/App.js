import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import './config'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

if (process.env.BROWSER) {
	require('./styles/styles.sass')
	require('./styles/base.sass')
	require('./App.sass')
}

import Menu from './components/menu/MenuComponent.js'
import Footer from './components/footer/FooterComponent.js'
import Sidebar from './components/sidebar/Sidebar.js'
import SnackbarExampleSimple from './components/snackbarExampleSimple/SnackbarExampleSimpleComponent.js'
import LinearProgressExampleDeterminate from './components/progressBar/ProgressBarComponent.js'

class App extends Component {

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
	location: ownProps.location.pathname
})

export default connect(mapStateToProps)(App)