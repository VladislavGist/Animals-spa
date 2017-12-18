import classNames from 'classnames'
import React, { Component } from 'react'

export default class AddPhotoInputComponent extends Component {

	state = {
		active: false
	}

	changeInput = e => {

		const { handlePhoto } = this.props

		if (e.target.value.length && e.target.files[0].type === 'image/jpeg') {
			this.setState({
				active: true
			})
			handlePhoto(e.target.files[0])
		} else {
			this.props.handleSnackbar('Формат изображения должен быть jpeg или jpg')
			this.setState({
				active: false
			})
		}
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
			<input type='file' accept='image/jpeg,image/png' className={ `formImg` } onChange={ this.changeInput } />
		</div>
	}
}