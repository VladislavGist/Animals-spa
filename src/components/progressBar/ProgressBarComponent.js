import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import LinearProgress from 'material-ui/LinearProgress'

const LinearProgressExampleDeterminate = ({ loading }) => {
	const style = {
		progress: {
			'position': 'fixed',
			'zIndex': 1000,
			'backgroundColor': 'transparent'
		}
	}

	return <LinearProgress
		mode='determinate'
		value={ loading }
		style={ style.progress }
		color='#2196f3'
	/>
}

LinearProgressExampleDeterminate.propTypes = {
	loading: PropTypes.number
}

LinearProgressExampleDeterminate.defaultProps = {
	loading: 0
}

export default connect(state => ({
	loading: state.preloader.loading
}))(LinearProgressExampleDeterminate)