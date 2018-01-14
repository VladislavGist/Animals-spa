import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import { actions as actionsPhotosReducer } from '../../../../ducks/photosReducer'
import { actions as actionsSnackbarReducer } from '../../../../ducks/snackbarReducer'

class AddPhotoInputComponent extends Component {

	state = {
		active: false,
		unmountValue: ''
	}

	changeInput = e => {

		const { handleAddPhoto } = this.props

		if (e.target.value.length && e.target.files[0].type === 'image/jpeg') {
			this.setState({
				active: true
			})
			handleAddPhoto(JSON.stringify(e.target.files[0]))
		} else {
			this.props.handleSnackbar('Формат изображения должен быть jpeg или jpg')
			this.setState({
				active: false
			})
		}
	}

	componentWillUnmount() {
		this.setState({
			active: false,
			unmountValue: ''
		})
	}

	render() {

		return <div className={
			classNames({
				loadingPhoto: true,
				activeLabel: this.state.active
			}) }
		>
			<i className={
				classNames({
					fa: true,
					'fa-check': this.state.active,
					'modifyColor': this.state.active,
					'fa-plus': !this.state.active
				}) }
			/>
			<input
				type='file'
				accept='image/jpeg,image/png'
				className={ `formImg` }
				onChange={ this.changeInput }
				value={ this.state.unmountValue }
			/>
		</div>
	}
}

export default connect(state => ({ state }),
	dispatch => bindActionCreators({ ...actionsSnackbarReducer, ...actionsPhotosReducer }, dispatch)
)(AddPhotoInputComponent)