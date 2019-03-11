import classNames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

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
		const { lin, name, icons, keyElem, pathname, img, title, text, myLinks, categories } = this.props

		return (
			<div>
				{ !['/', '/placeAnAd', '/personalArea'].includes(pathname) ? (
					<div className={ classNames({ menu: true }) }>
						<div className='img'>
							<img src={ img } />
						</div>

						<div className='menuText'>
							<h2>{ title }</h2>
							<p>{ text }</p>
						</div>

						<nav className='buttons'>
							{ myLinks.map((elem, idx) => <MaterialLink
								valueLink={ lin[idx] }
								icons={ icons[idx] }
								key={ keyElem[idx] }
							>
								{ name[idx] }
							</MaterialLink>) }
						</nav>
					</div>
				) : null }

				<div className={ classNames({
					accordionContent: true,
					visible: this.state.showMenu
				}) } >
					<div className='categories'>
						{ <Link
							to='/'
						>
							<span>Вернуться на главную</span>
						</Link> }
						
						{ categories && categories.map((category, idx) => (
							<Link
								to={ `/animals/${ category.type }/buy` }
								key={ idx }
							>
								<span>{ category.translate } - { category.count } объявл.</span>
							</Link>
						)) }
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
	pathname: PropTypes.string.isRequired
}

export default connect(
	state => {
		const menuReducer = _.get(state, 'menuReducer.0')

		return {
			categories: _.get(state, 'menuReducer.categories'),
			lin: menuReducer.categoryNames.myLinks,
			name: menuReducer.categoryNames.names,
			icons: menuReducer.categoryNames.icons,
			keyElem: menuReducer.categoryNames.key,
			img: menuReducer.img,
			title: menuReducer.title,
			text: menuReducer.text,
			myLinks: menuReducer.categoryNames.myLinks,
			pathname: _.get(state, 'routing.locationBeforeTransitions.pathname')
		}
	},
	{ ...menuReducer }
)(Menu)