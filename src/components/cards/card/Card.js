import _ from 'lodash'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import { actions as actionsAllParamsUrl } from '../../../ducks/allParamsUrl'
import { actions as actionsSnackbarReducer } from '../../../ducks/snackbarReducer'

import SlickSlider from '../../slickSlider/SlickSliderComponent'

import config from '../../../../config'

if (process.env.BROWSER) {
	require('./card.sass')
}

class Card extends Component {

	state = { verticalRotate: false }

	handleDelete = () => {
		const { handleSnackbar, uid, cardId } = this.props

		// firebase.database().ref(`users/${ uid }/articles/${ cardId }`).update({
		// 	compleate: true
		// })
		// 	.then(() => handleSnackbar('Завершено'))
		// 	.catch(err => handleSnackbar(`Ошибка: ${ err }`))
	}

	clickFunc = () => {
		const { pathname, updateCardView, userId, cardId, view } = this.props

		if ((pathname !== '/personalArea') && (pathname !== '/moderation')) {
			updateCardView(userId, cardId, view)
		}
	}

	handleAccepted = e => {
		const { handleSnackbar, userId, cardId } = this.props

		// firebase.database().ref(`users/${ userId }/articles/${ cardId }`).update({
		// 	moderate: 'resolve',
		// 	compleate: false
		// })
		// 	.then(() => handleSnackbar('Принято'))
		// 	.catch(err => handleSnackbar(`Ошибка: ${ err }`))
	}

	handleRejected = e => {
		const { handleSnackbar, userId, cardId } = this.props

		// firebase.database().ref(`users/${ userId }/articles/${ cardId }`).update({
		// 	moderate: 'rejected',
		// 	compleate: true
		// })
		// 	.then(() => handleSnackbar('Отклонено'))
		// 	.catch(err => handleSnackbar(`Ошибка: ${ err }`))
	}

	stausesReplace = status => {
		switch(status) {
		case 'buy': return 'Продажа'; break
		case 'gift': return 'Даром'; break
		case 'missing': return 'Пропало животное'; break
		case 'find': return 'Найдено животное'; break
		default: return null
		}
	}

	dottsText = text => {
		if (text.length >= 80) {
			let res = text.substring(0, 80)
			return res += ' ...'
		}

		return text
	}

	handleReverseCard = () => this.setState({ verticalRotate: !this.state.verticalRotate })

	render() {
		const {
			addDate,
			price,
			advType,
			rating,
			phoneNumber,
			city,
			userStatus,
			userName,
			title,
			briefDescription,
			view,
			imgPath,
			deleted,
			deleteInfo,
			deleteDate,
			moderate,
			compleate,

			pathname
		} = this.props

		// const mass = []

		// for (let i = 0; i < rating; i++) {
		// 	mass.push(<i className='fa fa-star' aria-hidden='true' key={ i } />)
		// }

		let imagePath = []

		imgPath.forEach(path => {
			let value = `${ config.payPetsApiUrl }/${ path }`
			imagePath.push(value)
		})

		return (
			<div className='cardItemWrap'>
				<div
					className={ classNames({
						'cardItem': true,
						'horizontalBig': true,
						'verticalRotate': this.state.verticalRotate
					}) }
				>
					<div className='contentWrap' onClick={ this.clickFunc }>
						<div className='top' onClick={ this.handleReverseCard }>
							<div>
								<p className='price'>{ price && price > 0 && `${ price } руб.` }</p>
							</div>
							<div>
								<div className='info'>
									<i className={ classNames({
										'fa': true,
										'fa-eur': advType === 'buy',
										'fa-globe': advType === 'gift',
										'fa-exclamation-triangle': advType === 'missing',
										'fa-bell-o': advType === 'find'
									}) }
									aria-hidden='true'
									/>
									<span className='categoty'>{ this.stausesReplace(advType) }</span>
								</div>

								<p className='number'>{ phoneNumber }</p>
								<p className='city'>{ city.indexOf('обл.') === -1 ? `г. ${ city }` : city }</p>

								{ addDate && <p className='number'>{ moment(addDate).format('DD-MM-YYYY') }</p> }

								<div className='userItem'>
									{/* { mass } */}
									{ userName && <p className={ `userName ${ (userStatus === 'seller') && 'gold' }` }>{ userName }</p> }
								</div>
								<div className='priceMobile'>
									<p className='price'>{ price && price > 0 && `${ price } руб.` }</p>
								</div>
							</div>
						</div>
						<div className='bottom'>
							<div>
								<h3 className='title'>{ title }</h3>
								<p className='subTitle'>{ this.dottsText(briefDescription) }</p>
							</div>

						</div>
					</div>
					<div className='img'>
						<img src={ imagePath[0] } />
					</div>
					<div className='reverseFace'>
						<div className='sliderItem'>
							<SlickSlider imagesItems={ imagePath } />
						</div>
						<div className='textItem'>
							<p className='subTitleReverse'>{ briefDescription }</p>
							<div className='buttonsList'>
								{
									pathname !== '/personalArea' &&
									view && <div className='visibles'>
										<i className='fa fa-eye' aria-hidden='true' />
										<p>{ view }</p>
									</div>
								}
								<button className='btnReverse' onClick={ this.handleReverseCard }>
									<i className='fa fa-reply' aria-hidden='true' />
								</button>
							</div>
						</div>
					</div>
				</div>
				{
					deleted || deleteInfo ?
						<div className='cardInfoInAccount'>
							{ deleted && <a href='javascript:void(0)' className='button1' onClick={ this.handleDelete }>Завершить</a> }
							{ deleteInfo && <p>Будет удалено: { deleteDate }</p> }
						</div> : null
				}
				{
					compleate && <div className='cardInfoInAccount'>
						<p>Будет удалено: { deleteDate }</p>
					</div>
				}
				{
					moderate &&
						<div className='moderation'>
							<button className='btnAccepted' onClick={ this.handleAccepted }>Пропустить</button>
							<button className='btnRejected' onClick={ this.handleRejected }>Отклонить</button>
						</div>
				}
			</div>
		)
	}
}

Card.propTypes = {
	addDate: PropTypes.string.isRequired,
	price: PropTypes.string,
	advType: PropTypes.string.isRequired,
	rating: PropTypes.number,
	phoneNumber: PropTypes.string.isRequired,
	city: PropTypes.string.isRequired,
	userStatus: PropTypes.string,
	userName: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	briefDescription: PropTypes.string.isRequired,
	view: PropTypes.number,
	imgPath: PropTypes.object.isRequired,
	deleted: PropTypes.bool,
	deleteInfo: PropTypes.bool,
	deleteDate: PropTypes.string,
	moderate: PropTypes.bool,
	compleate: PropTypes.bool,
	pathname: PropTypes.string.isRequired,
	uid: PropTypes.string
}

export default connect(
	state => ({
		pathname: state.routing.locationBeforeTransitions.pathname,
		uid: state.auth.user && state.auth.user.uid
	}),
	{ ...actionsAllParamsUrl, ...actionsSnackbarReducer }
)(Card)