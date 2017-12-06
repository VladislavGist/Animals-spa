import $ from 'jquery'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { store } from './store.jsx'
import CardItem from './categories/CardItem.jsx'
import { loadCards } from '../actions/loadCards.jsx'

class Moderate extends Component {

	constructor() {
		super()
		this.subs
		this.elem = store.getState().serverReducer
	}

	componentWillMount() {
		this.props.getCards(`${process.env.URL}/moderate`)
	}

	componentDidMount() {

		//подписался на определенную часть store
		this.subs = store.subscribe(() => {

			//если новая часть Store не равна предыдущей, то выполнить код
			if(store.getState().serverReducer !== this.elem) {

				//фильтрация до 80 символа
				let el = $('.bottom .subTitle')
				for (let i = 0; i < el.length; i++) {
					let j = el[i].textContent.substring(0, 80)
					el[i].textContent = j
				}

				//условие добавления многоточия
				el.each((idx, elem) => {
					if(elem.textContent.length >= 80) {
						elem.textContent += ' ...'
					}
				})

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

				//редактирование статусов category
				$('.categoty').each((idx, elem) => {
					switch($(elem).text()) {
					case 'buy':
						$(elem).text('Продажа')
						break
					case 'sale':
						$(elem).text('Продать')
						break
					case 'gift':
						$(elem).text('Даром')
						break
					case 'missing':
						$(elem).text('Пропало животное')
						break
					case 'find':
						$(elem).text('Найдено животное')
						break
					default:
						$(elem).text('')
					}
				})

				//иконки статусов
				$('.info .fa').each((idx, elem) => {
					switch($(elem).next().text()) {
					case 'Продажа':
						$(elem).addClass('fa-eur')
						break
					case 'Продать':
						$(elem).addClass('fa-eur')
						break
					case 'Даром':
						$(elem).addClass('fa-globe')
						break
					case 'Пропало животное':
						$(elem).addClass('fa-exclamation-triangle')
						break
					case 'Найдено животное':
						$(elem).addClass('fa-bell-o')
						break
					default:
						$(elem).addClass('')
					}
				})

				// сохранил текущую часть Store чтобы объявления корректно работали
				this.elem = store.getState().serverReducer
			}
		})
	}

	componentWillUnmount() {
		this.subs()
		this.props.clearCards()
	}

	render() {

		const { state } = this.props

		return (
			<div>
				{
					state.serverReducer.advertisementList.length > 0 ?
						state.serverReducer.advertisementList.map(elem => <CardItem
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
							moderate={ true }
						/>) : <p>Объявлений на модерацию нет</p>
				}
			</div>
		)
	}
}

export default connect(
	state => ({ state }),
	dispatch => ({
		getCards: url => {
			dispatch(loadCards(url))
		},
		clearCards: () => {
			dispatch({ type: 'CLEAR_STATE', payload: []})
		}
	})
)(Moderate)