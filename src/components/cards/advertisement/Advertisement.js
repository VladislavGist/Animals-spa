import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import CircularProgress from 'material-ui/CircularProgress'

import SlickSlider from '../../slickSlider/SlickSliderComponent'

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
		typesList: PropTypes.array.isRequired
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
			openedCard,
			categories,
			typesList
		} = this.props

		const imagePath = []

		openedCard.imageUrl.forEach(path => {
			let value = `${ config.payPetsApiUrl }/${ path }`
			imagePath.push(value)
		})

		const animalType = _.find(categories, o => o.type === openedCard.animalType)
		const advType = _.find(typesList, o => o.type === openedCard.postType)

		return (
			<div className='adv'>
				<div className='advHeader'>
					<div>
						<h2>{ openedCard.title }</h2>
						<p className='advTime'>Дата размещения: { moment(openedCard.createdAt).format('DD-MM-YYYY, h:mm:ss a') }</p>
					</div>

					{ openedCard.price ? (
						<p className='advPrice'>
							{ openedCard.price } руб.
						</p>
					) : null }
				</div>
				<div className='advContent'>
					{/* <div className='cardItem horizontalBig'>
						<div className='reverseFace'> */}
					<div>
						<SlickSlider imagesItems={ imagePath } />
					</div>
					{/* </div>
					</div> */}
					<div className='advContacts'>
						<p>{ openedCard.phoneNumber }</p>
						<p>{ openedCard.creatorName }</p>
						<p>{ openedCard.city }</p>
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
			typesList
		}
	},
	{ ...articlesActions }
)(Advertisement)