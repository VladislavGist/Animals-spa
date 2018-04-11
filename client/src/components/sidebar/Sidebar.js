import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { moduleName } from '../../ducks/auth'

import LoginModal from '../sendDialog/SendDialogComponent.js'
import DrawerUndockedExample from '../drawerUndockedExample/DrawerUndockedExampleComponent.js'

if (process.env.BROWSER) {
	require('./TopHeaderStyles.sass')
}

class Sidebar extends Component {

	switchMenuRoles = () => {
		const { user, userDatas } = this.props

		if (user && userDatas.role === 'user') {
			return (
				<div className='userBtns'>
					<Link to='/personalArea' className='personalArea'>Личный кабинет</Link>
				</div>
			)
		} else if (user && userDatas.role === 'moderator') {
			return (
				<div className='userBtns'>
					<Link to='/moderation' className='personalArea'>moderation</Link>
				</div>
			)
		}
	}

	protected = () => {
		if (!this.props.user) {
			return false
		}
	}

	render() {
		const { user, filterCity } = this.props

		return (
			<header>
				<div className='menuHeader'>
					<div className='top_logo'>
						<Link to='/'>
							<img src='https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Flogo2.png?alt=media&token=bb1bf9a9-419b-475d-b28a-4a60b8d6783c'
								width='120'
								alt='logotype'
							/>
						</Link>
						<h1 className='h1'>Продай, купи, отдай в дар, сообщи о находке или размести объявление о пропаже любого животного.</h1>
					</div>

					<LoginModal titleBtn={ filterCity.cityTopHeader } dialogModal='02' />

					{ !user ? <LoginModal titleBtn='Вход / регистрация' dialogModal='01' /> : this.switchMenuRoles() }

					{
						!user ?
							<LoginModal
								titleBtn='Подать объявление'
								classNameMobile='needLoginMobile'
								classesBtn='button2 needLoginMobile'
								dialogModal='01'
							/> : <Link to='/placeAnAd' className='button2 needLogin' onClick={ this.protected }>Подать объявление</Link>
					}

					<DrawerUndockedExample />
				</div>
			</header>
		)
	}
}

// <div className="button3 repostBtn">
// 	<a href="javascript:void(0)" className="buttonCircle">
// 		<i className="fa fa-bullhorn" aria-hidden="true"></i>
// 	</a>
// 	<span>
// 		<a href="javascript:void(0)"><i className="fa fa-vk" aria-hidden="true"></i></a>
// 		<a href="javascript:void(0)"><i className="fa fa-odnoklassniki" aria-hidden="true"></i></a>
// 	</span>
// </div>

export default connect(state => ({
	user: state[moduleName].user,
	userDatas: state[moduleName].userDatas,
	filterCity: state.filterCity,
}))(Sidebar)