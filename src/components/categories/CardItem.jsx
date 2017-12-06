import { connect } from 'react-redux'
import React, { Component } from 'react'

import SlickSlider from '../SlickSlider.jsx'

import './CardItem.sass'

import { completedCard } from '../../actions/completedCard.jsx'
import { updateCardView } from '../../actions/updateCardView.jsx'
import { replaceStatusCard } from '../../actions/replaceStatusCard.jsx'

class CardItem extends Component {

	// остановка объявления
	handlerDelete = e => {

		const { id, handleCompletedCard } = this.props

		//отправили запрос на сервер об остановке объявления с нужным id
		handleCompletedCard(`${process.env.URL}/completeCard?cardId=${id}`)
		e.target.text = 'Остановлено'
	}

	//повышение счетчика просмотров
	clickFunc = () => {
		if (location.hash !== '#/personalArea') {
			this.props.getUpdateCardView( this.props.cardId )
		}
	}

	handleAccepted = e => {

		const { onHandleAccepted, cardId } = this.props

		onHandleAccepted(`${process.env.URL}/replaceStatusCard?cardid=${cardId}&status=accepted`)
		e.target.textContent = 'Выполнено'
	}

	handleRejected = e => {

		const { onHandleRejected, cardId } = this.props

		onHandleRejected(`${process.env.URL}/replaceStatusCard?cardid=${cardId}&status=rejected`)
		e.target.textContent = 'Выполнено'
	}

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
			dataDelete,
			moderate
		} = this.props

		const mass = []

		for (let i = 0; i < rating; i++) {
			mass.push(<i className='fa fa-star' aria-hidden='true' key={ i } />)
		}

		let imagePath = imgPath.split(' ')

		return (
			<div className='cardItemWrap'>
				<div className='cardItem horizontalBig'>
					<div className='contentWrap' onClick={ ::this.clickFunc }>
						<div className='top'>
							<div>
								<p className='price'>{ price > 0 ? price + ' руб.' : null }</p>
							</div>
							<div>
								<div className='info'>
									<i className='fa' aria-hidden='true' />
									<span className='categoty'>{ advType }</span>
								</div>
								<p className='number'>{ phoneNumber }</p>
								<p className='city'>{ city.indexOf('обл.') === -1 ? 'г. ' + city : city }</p>
								<div className='userItem'>
									{ mass }
									<p className={ `userName ${ userStatus === 'seller' ? 'gold' : null }` }>{ userName }</p>
								</div>
								<div className='priceMobile'>
									<p className='price'>{ price > 0 ? price + ' руб.' : null }</p>
								</div>
							</div>
						</div>
						<div className='bottom'>
							<div>
								<h3 className='title'>{ title }</h3>
								<p className='subTitle'>{ briefDescription }</p>
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
									location.hash === '#/personalArea' ? null : (
										<div className='visibles'>
											<i className='fa fa-eye' aria-hidden='true' />
											<p>{ views }</p>
										</div>
									)
								}
								<button className='btnReverse'><i className='fa fa-reply' aria-hidden='true' /></button>
							</div>
						</div>
					</div>
				</div>
				{
					deleted || deleteInfo ?
						<div className='cardInfoInAccount'>
							{ deleted ? <a href='javascript:void(0)' className='button1' onClick={ ::this.handlerDelete }>Завершить</a> : null }
							{ deleteInfo ? <p>Будет удалено { dataDelete }</p> : null }
						</div> : null
				}
				{
					moderate ?
						<div className='moderation'>
							<button className='btnAccepted' onClick={ ::this.handleAccepted }>Пропустить</button>
							<button className='btnRejected' onClick={ ::this.handleRejected }>Отклонить</button>
						</div> : null
				}
			</div>
		)
	}
}

// {
// 	location.hash === "#/personalArea" ? null :
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
	state => ({ state }),
	dispatch => ({
		getUpdateCardView: cardId => {
			dispatch(updateCardView(cardId))
		},
		handleCompletedCard: (url, param) => {
			dispatch(completedCard(url, param))
		},
		onHandleAccepted: (url, status, cardId) => {
			dispatch(replaceStatusCard(url, status, cardId))
		},
		onHandleRejected: (url, status, cardId) => {
			dispatch(replaceStatusCard(url, status, cardId))
		}
	})
)(CardItem)