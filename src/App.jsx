import $ from 'jquery'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
// import { push } from 'react-router-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import './styles/styles.sass'
import './styles/base.sass'
import './App.sass'

import Menu from './components/menu/MenuComponent.js'
import Footer from './components/footer/FooterComponent.js'
// import { store } from './components/store.jsx'
import TopHeader from './components/topHeader/TopHeaderComponent.js'
import SnackbarExampleSimple from './components/snackbarExampleSimple/SnackbarExampleSimpleComponent.js'
import LinearProgressExampleDeterminate from './components/progressBar/ProgressBarComponent.js'

class App extends Component {

	componentDidMount() {
		//запрет переворота объявление по клику на кнопку
		$('.button3').each((idx, elem) => {
			$(elem).click(function(e) {
				e.stopPropagation()
			})
		})
	}

	render() {

		const { location } = this.props

		const classes = classNames({
			spaContent: true,
			modileModificator: location === '/personalArea'
		})

		return (

			<MuiThemeProvider>

				<div className='wrapApp'>

					{ this.props.state.preloader.loading > 0 && this.props.state.preloader.loading !== 100 ?
						<LinearProgressExampleDeterminate className='progressBar' /> : null
					}

					<div className='container'>

						<TopHeader />

						<div className='wrapBackground'>
							<div className='wrapper'>

								<Menu />

								<div className={ classes }>
									{ this.props.children }
								</div>

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
	state,
	location: ownProps.location.pathname
})

export default connect(mapStateToProps)(App)