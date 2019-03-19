import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import moment from 'moment'

moment.locale('ru')

import { actions as actionsAllParamsUrl } from '../../../ducks/allParamsUrl'

import config from '../../../../config'

if (process.env.BROWSER) {
	require('./card.sass')
}

class Card extends Component {

	stopArticle = () => {
		const { cardId, stopArticle } = this.props

		stopArticle(`${ config.payPetsApiUrl }/api/feed/post/${ cardId }`, { active: false })
	}

	deleteArticle = () => {
		const { cardId } = this.props

		console.log({ cardId })
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

	changeActiveStatusPostWapper = event => {
		const { cardId, changeActiveStatusPost } = this.props
		changeActiveStatusPost(cardId, event)
	}

	render() {
		const {
			addDate,
			price,
			advType,
			phoneNumber,
			city,
			userStatus,
			userName,
			title,
			briefDescription,
			cardId,
			imgPath,
			deleted,
			stoppedInfo,
			stopped,
			deleteDate,
			moderate
		} = this.props

		const imagePath = []

		imgPath.forEach(path => {
			let value = `${ config.payPetsApiUrl }/${ path }`
			imagePath.push(value)
		})

		return (
			<div className='cardItemWrap'>
				<Link to={ `/adv/${ cardId }` }>
					<div
						className={ classNames({
							'cardItem': true,
							'horizontalBig': true
						}) }
					>
						<div className='contentWrap'>
							<div className='top'>
								<div>
									<p className='price'>{ price && price > 0 ? `${ price } руб.` : null }</p>
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
										{ userName && <p className={ `userName ${ (userStatus === 'seller') && 'gold' }` }>{ userName }</p> }
									</div>
									<div className='priceMobile'>
										<p className='price'>{ price && price > 0 ? `${ price } руб.` : null }</p>
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
					</div>
				</Link>

				<div className='cardInfoInAccount'>
					<div className='cardInfoBtns'>
						{ stopped ? (
							<a
								href='javascript:void(0)'
								className='button1'
								onClick={ this.stopArticle }>
									Завершить
							</a>
						) : null }

						{ deleted ? (
							<a
								href='javascript:void(0)'
								className='button1'
								onClick={ this.deleteArticle }>
									Удалить
							</a>
						) : null }
					</div>

					{ stoppedInfo ? (
						<p>Будет остановлено: { moment(deleteDate).format('DD-MM-YYYY, h:mm:ss a') }</p>
					) : null }
				</div>

				{ moderate ? (
					<div className='moderation'>
						<button
							className='btnAccepted'
							data-action='resolve'
							onClick={ this.changeActiveStatusPostWapper }>
								Пропустить
						</button>

						<button
							className='btnRejected'
							data-action='reject'
							onClick={ this.changeActiveStatusPostWapper }>
								Отклонить
						</button>
					</div>
				) : null }
			</div>
		)
	}
}

Card.propTypes = {
	addDate: PropTypes.string.isRequired,
	price: PropTypes.number,
	advType: PropTypes.string.isRequired,
	rating: PropTypes.number,
	phoneNumber: PropTypes.string.isRequired,
	city: PropTypes.string.isRequired,
	userStatus: PropTypes.string,
	userName: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	briefDescription: PropTypes.string.isRequired,
	view: PropTypes.number,
	imgPath: PropTypes.array.isRequired,
	deleted: PropTypes.bool,
	stopped: PropTypes.bool,
	stoppedInfo: PropTypes.bool,
	deleteDate: PropTypes.string,
	moderate: PropTypes.bool,
	compleate: PropTypes.bool,
	pathname: PropTypes.string.isRequired,
	changeActiveStatusPost: PropTypes.func
}

export default connect(
	state => ({
		pathname: state.routing.locationBeforeTransitions.pathname,
	}),
	{ ...actionsAllParamsUrl }
)(Card)