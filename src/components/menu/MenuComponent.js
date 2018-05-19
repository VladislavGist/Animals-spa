import classNames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import { actions as menuReducer } from '../../ducks/menuReducer'

if (process.env.BROWSER) {
	require('./MenuStyles.sass')
}

class MaterialLink extends Component {

	render() {
		const { children, icons, valueLink } = this.props

		return <Link to={ valueLink } className='button4'>
			{ children }
			<i className={ icons } aria-hidden='true' />
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
		const { lin, name, icons, keyElem, routing, img, title, text, myLinks } = this.props

		const menuDatas = [
			{
				path: '/',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Findex.png?alt=media&token=2447c385-80e6-4e3d-9518-814fe2222de0',
				title: 'На главную',
				func: null
			},
			{
				path: '/animals/cat/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2FcatMenu.jpg?alt=media&token=283aae65-4450-4ae4-b41d-46da0e35a24b',
				title: 'Кошки',
				func: this.props.onHandleCat
			},
			{
				path: '/animals/dog/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2FdogMenu.jpg?alt=media&token=61db6dd0-933d-4050-be3f-631038d95c0e',
				title: 'Собаки',
				func: this.props.onHandleDog
			},
			{
				path: '/animals/parrot/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fparrot.jpg?alt=media&token=a9042563-7b2e-4744-9741-79204e25af64',
				title: 'Попугаи',
				func: this.props.onHandleParrot
			},
			{
				path: '/animals/hamster/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fhamster.jpg?alt=media&token=2bb626a5-41a1-4998-93a9-9875481fb40f',
				title: 'Хомяки',
				func: this.props.onHandleHamster
			},
			{
				path: '/animals/mouse/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fmouse.jpg?alt=media&token=15e5b1c7-7ba5-4044-aa62-d9d120a2a079',
				title: 'Мыши / крысы',
				func: this.props.onHandleMouse
			},
			{
				path: '/animals/hare/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fhare.jpg?alt=media&token=f8f5156b-a298-4e7b-afc7-b13b14265132',
				title: 'Зайцы / кролики',
				func: this.props.onHandleHare
			},
			{
				path: '/animals/guineapig/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fguineapig.jpg?alt=media&token=9a932a7a-20d2-47ba-b22f-30f25b412c19',
				title: 'Морские свинки',
				func: this.props.onGuineapig
			},
			{
				path: '/animals/champ/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fchamp.jpg?alt=media&token=c8890970-fd64-4c27-9bd2-8a830c0e81e3',
				title: 'Хорьки',
				func: this.props.onHandleChamp
			},
			{
				path: '/animals/snak/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fsnak.jpg?alt=media&token=384d3814-2c4d-4f46-b1d7-0a6cfa39b15d',
				title: 'Змеи',
				func:  this.props.onHandleSnak
			},
			{
				path: '/animals/iguana/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Figuana.jpg?alt=media&token=37124f1d-10eb-48ac-815b-d3464403af50',
				title: 'Игуаны',
				func:  this.props.onHandleIguana
			},
			{
				path: '/animals/turtle/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fturtle.jpg?alt=media&token=9aff78ad-9093-4d31-ac25-40f959688521',
				title: 'Черепахи',
				func:  this.props.onHandleTurtle
			},
			{
				path: '/animals/snail/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fsnail.jpg?alt=media&token=4f010780-da2b-4ce0-92f7-3147e5086c46',
				title: 'Улитки',
				func:  this.props.onHandleSnail
			},
			{
				path: '/animals/fish/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Ffish.jpg?alt=media&token=7f70e25d-0b99-49fd-8221-949d77ac1147',
				title: 'Рыбки',
				func:  this.props.onHandleFish
			},
			{
				path: '/animals/insects/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Finsects.jpg?alt=media&token=08555cd0-d6ec-4877-85f0-ae9ed47602d9',
				title: 'Насекомые',
				func:  this.props.onHandleInsects
			},
			{
				path: '/animals/horse/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fhorse.jpg?alt=media&token=639589a1-86e1-48c4-8e0e-c9b37af5b18a',
				title: 'Лошади',
				func:  this.props.onHandleHorse.onHandleHorse
			},
			{
				path: '/animals/cow/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fcow.jpg?alt=media&token=713eca65-2a74-4d73-8b26-4a0628111245',
				title: 'Коровы / быки',
				func:  this.props.onHandleCow
			},
			{
				path: '/animals/pig/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fpig.jpg?alt=media&token=8aa8d17a-d9f9-4fb4-8baf-a20682406757',
				title: 'Свиньи',
				func:  this.props.onHandlePig
			},
			{
				path: '/animals/goat/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fgoat.jpg?alt=media&token=032e4074-0e53-416e-930a-a53d89cbac7e',
				title: 'Козы',
				func:  this.props.onHandleGoat
			},
			{
				path: '/animals/sheep/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fsheep.jpg?alt=media&token=2c2af997-46b4-4919-b15c-2bf7d6e462f5',
				title: 'Овцы',
				func:  this.props.onHandleSheep
			},
			{
				path: '/animals/domesticbird/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fdomesticbird.jpg?alt=media&token=94cbd183-326c-4b38-a251-8d159c011631',
				title: 'Домашняя птица',
				func:  this.props.onHandleDomesticbird
			},
			{
				path: '/animals/other/buy',
				image: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fother.png?alt=media&token=1d8fe29a-2fa3-418f-8e8d-1cc1a1a1901d',
				title: 'Другие',
				func:  this.props.onHandleAnother
			}
		]

		return (
			<div>
				{
					['/placeAnAd', '/personalArea'].indexOf(
						routing.locationBeforeTransitions &&
						routing.locationBeforeTransitions.pathname) === -1 &&
						<div className={ classNames({ menu: true }) }>
							<div className='img'>
								<img src={ img } />
							</div>

							<div className='menuText'>
								<h2>{ title }</h2>
								<p>{ text }</p>
							</div>

							<nav className='buttons'>
								{
									myLinks.map((elem, idx) => <MaterialLink
										valueLink={ lin[idx] }
										icons={ icons[idx] }
										key={ keyElem[idx] }
									>
										{ name[idx] }
									</MaterialLink>)
								}
							</nav>
						</div>
				}

				<div className={ classNames({
					accordionContent: true,
					visible: this.state.showMenu
				}) } >
					<div>
						{
							menuDatas.map((item, idx) => (
								<Link to={ item.path } onClick={ item.func } key={ idx }>
									<img src={ item.image } className='img' />
									<h3>{ item.title }</h3>
								</Link>
							))
						}
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

MaterialLink.propTypes = {
	children: PropTypes.string,
	icons: PropTypes.string,
	valueLink: PropTypes.string
}

Menu.propTypes = {
	lin: PropTypes.array.isRequired,
	name: PropTypes.array.isRequired,
	icons: PropTypes.array.isRequired,
	keyElem: PropTypes.array.isRequired,
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	myLinks: PropTypes.array.isRequired,
	routing: PropTypes.object.isRequired
}

export default connect(
	(state, routing) => {
		const menuReducer = state.menuReducer && state.menuReducer[0]

		return {
			lin: menuReducer.categoryNames.myLinks,
			name: menuReducer.categoryNames.names,
			icons: menuReducer.categoryNames.icons,
			keyElem: menuReducer.categoryNames.key,
			img: menuReducer.img,
			title: menuReducer.title,
			text: menuReducer.text,
			myLinks: menuReducer.categoryNames.myLinks,
			routing
		}
	},
	{ ...menuReducer }
)(Menu)