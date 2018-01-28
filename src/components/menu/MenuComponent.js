import classNames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import { actions as menuReducer } from '../../ducks/menuReducer'

import './MenuStyles.sass'

class MaterialLink extends Component {

	render() {
		return <Link to={ this.props.valueLink } className='button4'>
			{ this.props.children }
			<i className={ this.props.icons } aria-hidden='true' />
		</Link>
	}
}

class Menu extends Component {

	state = { showMenu: false }

	componentWillReceiveProps() {
		this.setState({ showMenu: false })
	}

	handleOpenMenu = () => {
		this.setState({ showMenu: !this.state.showMenu })
	}

	render() {
		const lin = this.props.state.menuReducer[0].categoryNames.myLinks,
			name = this.props.state.menuReducer[0].categoryNames.names,
			icons = this.props.state.menuReducer[0].categoryNames.icons,
			key = this.props.state.menuReducer[0].categoryNames.key

		const {
			onHandleCat,
			onHandleDog,
			onHandleParrot,
			onHandleHamster,
			onHandleMouse,
			onHandleHare,
			onGuineapig,
			onHandleChamp,
			onHandleSnak,
			onHandleIguana,
			onHandleTurtle,
			onHandleSnail,
			onHandleFish,
			onHandleInsects,
			onHandleHorse,
			onHandleCow,
			onHandlePig,
			onHandleGoat,
			onHandleSheep,
			onHandleDomesticbird
		} = this.props

		return (
			<div>
				{
					['/', '/placeAnAd', '/personalArea'].indexOf(this.props.state.routing.locationBeforeTransitions.pathname) === -1 ?
						<div className={ classNames({ menu: true }) }>
							<div className='img'>
								<img src={ this.props.state.menuReducer[0].img } />
							</div>

							<div className='menuText'>
								<h2>{ this.props.state.menuReducer[0].title }</h2>
								<p>{ this.props.state.menuReducer[0].text }</p>
							</div>

							<nav className='buttons'>
								{
									this.props.state.menuReducer[0].categoryNames.myLinks.map((elem, idx) => <MaterialLink
										valueLink={ lin[idx] }
										icons={ icons[idx] }
										key={ key[idx] }>
										{
											name[idx]
										} </MaterialLink>)
								}
							</nav>
						</div> : null
				}

				<div className={ classNames({
					accordionContent: true,
					visible: this.state.showMenu
				}) } >
					<div>

						<Link to='/'>
							<img src='uploads/index.png' className='img' />
							<h3>На главную</h3>
						</Link>

						<Link to='/animals/cat/buy' onClick={ onHandleCat }>
							<img src='uploads/catMenu.jpg' className='img' />
							<h3>Кошки</h3>
						</Link>

						<Link to='/animals/dog/buy' onClick={ onHandleDog }>
							<img src='uploads/dogMenu.jpg' className='img' />
							<h3>Собаки</h3>
						</Link>

						<Link to='/animals/parrot/buy' onClick={ onHandleParrot }>
							<img src='uploads/parrot.jpg' className='img' />
							<h3>Попугаи</h3>
						</Link>

						<Link to='/animals/hamster/buy' onClick={ onHandleHamster }>
							<img src='uploads/hamster.jpg' className='img' />
							<h3>Хомяки</h3>
						</Link>

						<Link to='/animals/mouse/buy' onClick={ onHandleMouse }>
							<img src='uploads/mouse.jpg' className='img' />
							<h3>Мыши / крысы</h3>
						</Link>

						<Link to='/animals/hare/buy' onClick={ onHandleHare }>
							<img src='uploads/hare.jpg' className='img' />
							<h3>Зайцы / кролики</h3>
						</Link>

						<Link to='/animals/guineapig/buy' onClick={ onGuineapig }>
							<img src='uploads/guineapig.jpg' className='img' />
							<h3>Морские свинки</h3>
						</Link>

						<Link to='/animals/champ/buy' onClick={ onHandleChamp }>
							<img src='uploads/champ.jpg' className='img' />
							<h3>Хорьки</h3>
						</Link>

						<Link to='/animals/snak/buy' onClick={ onHandleSnak }>
							<img src='uploads/snak.jpg' className='img' />
							<h3>Змеи</h3>
						</Link>

						<Link to='/animals/iguana/buy' onClick={ onHandleIguana }>
							<img src='uploads/iguana.jpg' className='img' />
							<h3>Игуаны</h3>
						</Link>

						<Link to='/animals/turtle/buy' onClick={ onHandleTurtle }>
							<img src='uploads/turtle.jpg' className='img' />
							<h3>Черепахи</h3>
						</Link>

						<Link to='/animals/snail/buy' onClick={ onHandleSnail }>
							<img src='uploads/snail.jpg' className='img' />
							<h3>Улитки</h3>
						</Link>

						<Link to='/animals/fish/buy' onClick={ onHandleFish }>
							<img src='uploads/fish.jpg' className='img' />
							<h3>Рыбки</h3>
						</Link>

						<Link to='/animals/insects/buy' onClick={ onHandleInsects }>
							<img src='uploads/insects.jpg' className='img' />
							<h3>Насекомые</h3>
						</Link>

						<Link to='/animals/horse/buy' onClick={ onHandleHorse }>
							<img src='uploads/horse.jpg' className='img' />
							<h3>Лошади</h3>
						</Link>

						<Link to='/animals/cow/buy' onClick={ onHandleCow }>
							<img src='uploads/cow.jpg' className='img' />
							<h3>Коровы / быки</h3>
						</Link>

						<Link to='/animals/pig/buy' onClick={ onHandlePig }>
							<img src='uploads/pig.jpg' className='img' />
							<h3>Свиньи</h3>
						</Link>

						<Link to='/animals/goat/buy' onClick={ onHandleGoat }>
							<img src='uploads/goat.jpg' className='img' />
							<h3>Козы</h3>
						</Link>

						<Link to='/animals/sheep/buy' onClick={ onHandleSheep }>
							<img src='uploads/sheep.jpg' className='img' />
							<h3>Овцы</h3>
						</Link>

						<Link to='/animals/domesticbird/buy' onClick={ onHandleDomesticbird }>
							<img src='uploads/domesticbird.jpg' className='img' />
							<h3>Домашняя птица</h3>
						</Link>

					</div>
				</div>

				<a href='javascript:void(0)' className='moreInfo' onClick={ this.handleOpenMenu }>
					Все животные
					<i className='fa fa-angle-down' aria-hidden='true' />
				</a>

			</div>
		)
	}
}

export default connect((state, routing) => ({ state, routing }),
	dispatch => bindActionCreators({ ...menuReducer }, dispatch)
)(Menu)