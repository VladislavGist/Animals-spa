import $ from 'jquery'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import CardItem from '../cardItem/CardItemComponent'
import { store } from '../../../store.js'
import { actions as actionsServerReducer } from '../../../ducks/serverReducer'
import { actions as actionsAllParamsUrl } from '../../../ducks/allParamsUrl'

import './CardItemsStyles.sass'

class CardItems extends Component {

	constructor() {
		super()
		this.subs = null
		this.elem = store.getState().serverReducer
		this.countMore = 20
		this.topPosition = 0
	}

	componentDidMount() {

		//смотрим расстояние от верха. нужно для корректной работы "еще объявления"
		window.onscroll = () => {
			this.topPosition = document.documentElement.scrollTop
		}

		//подписался на определенную часть store
		this.subs = store.subscribe(() => {

			//если новая часть Store не равна предыдущей, то выполнить код
			if (store.getState().serverReducer !== this.elem) {

				//фильтрация до 80 символа
				let el = $('.bottom .subTitle')

				for (let i = 0; i < el.length; i++) {
					let j = el[i].textContent.substring(0, 80)
					el[i].textContent = j
				}

				//запрет переворота объявление по клику на кнопку
				$('.button3').each((idx, elem) => {
					$(elem).click(function(e) {
						e.stopPropagation()
					})
				})

				//reverse объявлений
				$('.cardItem').bind('click', function() {

					//переключил класс
					$(this).toggleClass('verticalRotate')

					//отменил обработчики click для элемента
					$(this).off('click')
				})

				//нажал на кнопку reverse
				$('.btnReverse').on('click', function(e) {

					//перевернул card
					$(this).parents('.cardItem').removeClass('verticalRotate')

					//запретил всплытие событий (срабатывание событий на следующем уровне)
					e.stopPropagation()

					//назначил обработчик
					$(this).parents('.cardItem').on('click', function() {
						$(this).toggleClass('verticalRotate')
						$(this).unbind('click')
					})
				})

				// сохранил текущую часть store чтобы карточки корректно работали
				this.elem = store.getState().serverReducer

				this.props.onReplaceAllUrl(this.props.state.routing.locationBeforeTransitions.pathname)
			}
		})
	}

	componentWillUnmount() {
		this.subs()
		this.props.onHandleClearState()
		this.countMore = 20
		this.topPosition = 0
	}

	componentWillUpdate() {
		// при каждом изменении url будем скролится на то место на котором были
		$(document).scrollTop(this.topPosition)
	}

	addMoreCards = () => {

		const { state, getCards, allCards } = this.props

		getCards(process.env.URL + '/list-animals/animal_type/' + state.allParamsUrl.split('/')[2] + '/advertisement_type/' + state.allParamsUrl.split('/')[3]  + '/city/' + state.filterCity.cityTopHeader + '/count/' + this.countMore)
		allCards(process.env.URL + '/list-animals/animal_type/' + state.allParamsUrl.split('/')[2] + '/advertisement_type/' + state.allParamsUrl.split('/')[3]  + '/city/' + state.filterCity.cityTopHeader + '/count/' + this.countMore + '/allcount')
		this.countMore += 10
	}

	handleOnScroll = e => {
		console.log({ e })
	}

	render() {

		const { state, datas } = this.props

		return (
			<div className={
				classNames({
					wrapCardsContent: true,
					indexPageClassWrap: state.allParamsUrl === '/'
				})
			}
			onScroll={ this.handleOnScroll }
			>
				<article className={
					classNames({
						cardItems: true,
						indexPageClass: state.allParamsUrl === '/'
					})
				}>
					{
						datas.length > 0 ? datas.map(elem => <CardItem
							cardId={ elem.card_id }
							key={ elem.card_id }
							title={ elem.title }
							briefDescription={ elem.briefDescription }
							city={ elem.city }
							userName={ elem.userName }
							userStatus={ elem.userStatus }
							phoneNumber={ elem.phoneNumber }
							rating={ elem.rating }
							price={ elem.price }
							imgPath={ elem.imgPath }
							advType={ elem.advType }
							views={ elem.views }
						/>) : <p className='noCardsTitle'>Объявлений нет</p>
					}
					{ datas.length > 0 && state.allParamsUrl !== '/' ?
						(state.toggleAddMoreBtn ?
							<a href='javascript:void(0)' className='addMore button2' onClick={ this.addMoreCards }>Ещё объявления</a>
							: null) : null }
				</article>
				<aside className='cardsBanners'>
					Здесь будет реклама Яндекс.Директ
				</aside>
			</div>
		)
	}
}

export default connect(state => ({ state }),
	dispatch => bindActionCreators({ ...actionsServerReducer, ...actionsAllParamsUrl }, dispatch)
)(CardItems)