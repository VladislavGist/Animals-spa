import _ from 'lodash'
import firebase from 'firebase'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { actions as actionsAllParamsUrl } from '../../../ducks/allParamsUrl'
import { actions as actionsSnackbarReducer } from '../../../ducks/snackbarReducer'

import SlickSlider from '../../slickSlider/SlickSliderComponent'

if (process.env.BROWSER) {
	require('./card.sass')
}

class Card extends Component {

	state = { verticalRotate: false }

	handleDelete = () => {
		const { handleSnackbar, uid, cardId } = this.props

		firebase.database().ref(`users/${ uid }/articles/${ cardId }`).update({
			compleate: true
		})
			.then(() => handleSnackbar('Завершено'))
			.catch(err => handleSnackbar(`Ошибка: ${ err }`))
	}

	//повышение счетчика просмотров
	clickFunc = () => {
		// if (this.props.state.routing.locationBeforeTransitions && this.props.state.routing.locationBeforeTransitions.pathname !== '/personalArea') {
		// 	this.props.updateCardView( this.props.cardId )
		// }
	}

	handleAccepted = e => {
		const { handleSnackbar, userId, cardId } = this.props

		console.log(userId)

		firebase.database().ref(`users/${ userId }/articles/${ cardId }`).update({
			moderate: 'resolve',
			compleate: false
		})
			.then(() => handleSnackbar('Принято'))
			.catch(err => handleSnackbar(`Ошибка: ${ err }`))
	}

	handleRejected = e => {
		const { handleSnackbar, userId, cardId } = this.props

		firebase.database().ref(`users/${ userId }/articles/${ cardId }`).update({
			moderate: 'rejected',
			compleate: true
		})
			.then(() => handleSnackbar('Отклонено'))
			.catch(err => handleSnackbar(`Ошибка: ${ err }`))
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
			price,
			advType,
			rating,
			phoneNumber,
			city,
			userStatus,
			userName,
			title,
			briefDescription,
			views,
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

		_.forEach(imgPath, (value, key) => { imagePath.push(value) })

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
									views && <div className='visibles'>
										<i className='fa fa-eye' aria-hidden='true' />
										<p>{ views }</p>
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
							{/* { deleteInfo && <p>Будет удалено: { deleteDate }</p> } */}
						</div> : null
				}
				{/* {
					compleate && <div className='cardInfoInAccount'>
						<p>Будет удалено: { deleteDate }</p>
					</div>
				} */}
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

// {
// 	this.props.state.routing.locationBeforeTransitions.pathname === "/personalArea" ? null :
// 	<div>
// 		<div className="button3" title="Сделать репост в социальную сеть">
// 			<a href="javascript:void(0)" className="buttonCircle">
// 				<i className="fa fa-bullhorn" aria-hidden="true"></i>
// 			</a>
// 			<span>
// 				<a href="javascript:void(0)"><i className="fa fa-vk" aria-hidden="true"></i></a>
// 				<a href="javascript:void(0)"><i className="fa fa-odnoklassniki" aria-hidden="true"></i></a>
// 			</span>
// 		</div>
// 	</div>
// }

export default connect(
	state => ({
		pathname: state.routing.locationBeforeTransitions.pathname,
		uid: state.auth.user && state.auth.user.uid
	}),
	{ ...actionsAllParamsUrl, ...actionsSnackbarReducer }
)(Card)