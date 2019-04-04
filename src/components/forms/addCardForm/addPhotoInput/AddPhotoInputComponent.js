import classNames from 'classnames'
import React, { Component, PropTypes } from 'react'


import config from '../../../../../config'

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

	handleDeleteImage = () => {
		const { url, deleteImage } = this.props

		deleteImage(url)
	}

	render() {
		const {
			url
		} = this.props

		const {
			active,
			unmountValue
		} = this.state

		return (
			url ? (
				<div className='loadingPhoto'>
					<div className='loadingPhotoWrapperImage'>
						<div
							className='loadingPhotoDelete'
							onClick={ this.handleDeleteImage }
						>
							x
						</div>
						<img src={ `${ config.payPetsApiUrl }/${ url }` } />
					</div>
				</div>
			) : (
				<div className={
					classNames({
						loadingPhoto: true,
						activeLabel: active
					}) }
				>
					<i className={
						classNames({
							fa: true,
							'fa-check': active,
							'modifyColor': active,
							'fa-plus': !active
						}) }
					/>
					<input
						type='file'
						accept='image/jpeg,image/jpg,image/png'
						className={ `formImg` }
						onChange={ this.changeInput }
						value={ unmountValue }
					/>
				</div>
			)
		)
	}
}

AddPhotoInputComponent.propTypes = {
	handleAddPhoto: PropTypes.func.isRequired,
	handleSnackbar: PropTypes.func.isRequired
}
