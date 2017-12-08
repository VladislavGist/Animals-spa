import React from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import { bindActionCreators } from 'redux'

import { store } from '../store'
import { actions as actionsSnackbarReducer } from '../ducks/snackbarReducer'

class SnackbarExampleSimple extends React.Component {

	constructor(props) {
		super(props)
		this.elem = store.getState().snackbarReducer
		this.state = {
			open: false,
		}
	}

	handleTouchTap = () => {
		this.setState({
			open: true
		})
	}

	handleRequestClose = () => {
		// функция срабатывает спустя 4 сек., меняет store, очищаем значение переменной чтобы сратабывало не единожды
		this.setState({
			open: false,
		})
		this.props.handleSnackbar('')
		this.elem = ''
	}

	componentDidMount() {
		// показывает tooltip, если текущий state не равен прерыдущему и он же не равен пустой строке чтобы не было повторного появление спутя 4 сек.
		this.subs = store.subscribe(() => {
			if (store.getState().snackbarReducer !== this.elem && store.getState().snackbarReducer !== '' ) {
				this.elem = store.getState().snackbarReducer
				this.handleTouchTap()
			}
		})
	}

	render() {
		return (
			<div>
				<Snackbar
					open={ this.state.open }
					message={ this.props.state.snackbarReducer }
					autoHideDuration={ 4000 }
					onRequestClose={ this.handleRequestClose }
				/>
			</div>
		)
	}
}

export default connect(state => ({ state }),
	dispatch => bindActionCreators({ ...actionsSnackbarReducer }, dispatch)
)(SnackbarExampleSimple)