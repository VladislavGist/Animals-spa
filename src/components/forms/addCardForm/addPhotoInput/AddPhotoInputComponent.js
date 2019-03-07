import classNames from 'classnames'
import React, { Component, PropTypes } from 'react'

export default class AddPhotoInputComponent extends Component {

	state = {
		active: false,
		unmountValue: ''
	}

	changeInput = e => {
		const { handleAddPhoto, handleSnackbar } = this.props
		const target = e.target

		if (target.value.length && ['image/jpeg', 'image/jpg', 'image/png'].includes(target.files[0].type)) {
			this.setState({ active: true })
			handleAddPhoto(target.files[0])
		} else {
			handleSnackbar('Формат изображения должен быть jpeg, jpg или png')
			this.setState({ active: false })
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.photo) this.setState({ active: true })
		else this.setState({ active: false })
	}

	componentWillUnmount() { this.setState({ active: false, unmountValue: '' }) }

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
				accept='image/jpeg,image/jpg,image/png'
				className={ `formImg` }
				onChange={ this.changeInput }
				value={ this.state.unmountValue }
			/>
		</div>
	}
}

AddPhotoInputComponent.propTypes = {
	handleAddPhoto: PropTypes.func.isRequired,
	handleSnackbar: PropTypes.func.isRequired
}
