import _ from 'lodash'
import classNames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import React, { Component, PropTypes } from 'react'

import CircularProgress from 'material-ui/CircularProgress'

import { actions as menuReducer } from '../../ducks/menuReducer'

if (process.env.BROWSER) {
	require('./MenuStyles.sass')
}

class MaterialLink extends Component {

	render() {
		const { children, icons, valueLink, active } = this.props

		return (
			<Link
				to={ valueLink }
				className={ classNames({
					button4: true,
					'button4__active': active
				}) }
			>
				{ children }
				<i className={ icons } aria-hidden='true' />
			</Link>
		)
	}
}

class Menu extends Component {

	state = { showMenu: false }

	componentWillReceiveProps() {
		// this.setState({ showMenu: false })
	}

	handleOpenMenu = () => {
		this.setState({ showMenu: !this.state.showMenu })
	}

	render() {
		const {
			menu,
			categories,
			categoriesFetch,
			categoriesError,
			pathname,
			params
		} = this.props

		const { showMenu } = this.state

		return (
			<div>
				{ menu && Object.keys(menu).length > 0
					&& pathname.search(/adv|placeAnAd|personalArea|\/$/g) < 0 ? (
						<div className={ classNames({ menu: true }) }>
							<div className='img'>
								<img src={ menu.img } />
							</div>

							<MediaQuery minWidth='1024px'>
								<div className='menuText'>
									<h2>{ menu.title }</h2>
								</div>
							</MediaQuery>

							<nav className='buttons'>
								{ menu.categoryNames.myLinks.map((elem, idx) => <MaterialLink
									valueLink={ elem }
									key={ idx }
									active={ _.get(params, 'advertisment') === menu.categoryNames.names[idx].type }
								>
									{ `${ menu.categoryNames.names[idx].translate }: ${ menu.categoryNames.names[idx].count }` }
								</MaterialLink>) }
							</nav>
						</div>
					) : null }

				{ showMenu ? (
					<div className='accordionContent'>
						{ categories && !categoriesFetch && !categoriesError ? (
							<div className='categories'>
								{ Object.keys(params).length ? (
									<Link
										to='/'
										className={ classNames({
											'categories__backLink': Object.keys(params).length
										}) }>
										<span>Вернуться на главную</span>
									</Link>
								) : null }
								
								{ categories.map((category, idx) => (
									<Link
										to={ `/animals/${ category.type }/buy` }
										key={ idx }
									>
										<span>{ category.translate } - { category.count } объявл.</span>
									</Link>
								)) }
							</div>
						) : <CircularProgress size={ 60 }/> }
					</div>
				) : null }
				
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
	valueLink: PropTypes.string
}

Menu.propTypes = {
	pathname: PropTypes.string.isRequired,
	menu: PropTypes.object
}

export default connect(
	state => {
		return {
			categories: _.get(state, 'menuReducer.categories'),
			categoriesFetch: _.get(state, 'menuReducer.fetchingCategories'),
			categoriesError: _.get(state, 'menuReducer.errorFetchCategories'),
			menu: _.get(state, 'menuReducer.menu'),
			pathname: _.get(state, 'routing.locationBeforeTransitions.pathname')
		}
	},
	{ ...menuReducer }
)(Menu)