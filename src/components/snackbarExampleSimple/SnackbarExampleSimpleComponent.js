import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import Snackbar from 'material-ui/Snackbar'

class SnackbarExampleSimple extends React.Component {

	state = { open: false }

	handleTouchTap = () => this.setState({ open: true })

	handleRequestClose = () => {
		this.setState({ open: false })
	}

	componentWillReceiveProps(nextProps) {
		nextProps.snackbarReducer && this.handleTouchTap()
	}

	render() {
		return (
			<Snackbar
				open={ this.state.open }
				message={ this.props.snackbarReducer }
				autoHideDuration={ 4000 }
				onRequestClose={ this.handleRequestClose }
			/>
		)
	}
}

SnackbarExampleSimple.propTypes = {
	snackbarReducer: PropTypes.string.isRequired
}

export default connect(
	state => ({ snackbarReducer: state.snackbarReducer })
)(SnackbarExampleSimple)