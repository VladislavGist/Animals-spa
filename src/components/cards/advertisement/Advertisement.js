import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CircularProgress from 'material-ui/CircularProgress'

import ImageGallery from '../../imageGallery/ImageGalleryComponent'
import config from '../../../../config'

import { actions as articlesActions } from '../../../ducks/articles'

if (process.env.BROWSER) {
	require('./advertisement.sass')
}

moment.locale('ru')

class Advertisement extends Component {

	static propTypes = {
		openedCard: PropTypes.object,
		fetchingOpenedCard: PropTypes.bool.isRequired,
		errorFetchOpenedCard: PropTypes.bool.isRequired,
		categories: PropTypes.array.isRequired,
		typesList: PropTypes.array.isRequired,
		userPosts: PropTypes.array
	}

	static defaultProps = {
		openedCard: {}
	}

	componentWillMount() {
		const { id, getOpenedCard } = this.props

		getOpenedCard(id)
	}

	showingContent = (notFound, preloader, advertisement) => {
		const {
			openedCard,
			fetchingOpenedCard,
			errorFetchOpenedCard
		} = this.props

		if (fetchingOpenedCard && !errorFetchOpenedCard) return preloader
		else if (!fetchingOpenedCard && errorFetchOpenedCard && Object.keys(openedCard).length === 0) return notFound
		else if (!fetchingOpenedCard && !errorFetchOpenedCard && Object.keys(openedCard).length > 0) return advertisement()
	}

	contentIfSuccessLoadingData = () => {
		const {
			id,
			openedCard,
			categories,
			typesList,
			userPosts
		} = this.props

		const imagePath = []

		openedCard.imageUrl.forEach(path => {
			let value = `${ config.payPetsApiUrl }/${ path }`
			imagePath.push({
				original: value,
				thumbnail: value,
				thumbnailClass: 'customClass'
			})
		})

		const animalType = _.find(categories, o => o.type === openedCard.animalType)
		const advType = _.find(typesList, o => o.type === openedCard.postType)
		const showChangesButton = Boolean(_.find(userPosts, o => o._id === id))

		return (
			<div className='advContentItem'>
				{showChangesButton ? (
					<div className='advContentUserButtons'>
						<Link
							to={ `advEdit/${ id }` }
							className='button1'
						>
								Редактировать
						</Link>
					</div>
				) : null}
				<div className='advHeader'>
					<div>
						<h2>{ openedCard.title }</h2>
						<p className='advTime'>Дата размещения: { moment(openedCard.createdAt).format('MM-DD-YYYY') }</p>
					</div>

					{ openedCard.price ? (
						<p className='advPrice'>
							{ openedCard.price } руб.
						</p>
					) : null }
				</div>
				<div className='advContent'>
					<div>
						<ImageGallery imagesItems={ imagePath } />
					</div>
					<div className='advContacts'>
						<div>
							<div className='advPhone'>
								<p className='advPhoneNumberTitle'>Номер телефона</p>
								<p>{ openedCard.phoneNumber }</p>
							</div>
							<div className='advPerson'>
								<p className='advPersonTitle'>Контактное лицо</p>
								<p>{ openedCard.creatorName }</p>
							</div>
							
							<div className='advCity'>
								<p className='advCityTitle'>Город</p>
								<p>{ openedCard.city }</p>
							</div>

							<div className='advCity'>
								<p className='advCityTitle'>Адрес</p>
								<p>{ openedCard.address }</p>
							</div>
						</div>
					</div>
				</div>
				<div className='advSubArticle'>
					<div className='advType'>
						<p>
							<span>Тип объявления: </span>
							{ animalType.translate } / { advType.translate }
						</p>
					</div>
					<div className='advDescription'>
						<p>{ openedCard.content }</p>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div>
				{ this.showingContent(
					<div>Объявление не найдено</div>,
					<CircularProgress size={ 60 }/>,
					this.contentIfSuccessLoadingData
				) }
			</div>
		)
	}
}

export default connect(
	(state, ownProps) => {
		const { params: { id } } = ownProps

		const {
			openedCard,
			fetchingOpenedCard,
			errorFetchOpenedCard
		} = state.articles

		const {
			categories,
			typesList
		} = state.menuReducer

		return {
			id,
			openedCard,
			fetchingOpenedCard,
			errorFetchOpenedCard,
			categories,
			typesList,
			userPosts: _.get(state, 'auth.user.posts')
		}
	},
	{ ...articlesActions }
)(Advertisement)