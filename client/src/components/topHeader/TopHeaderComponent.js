import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import LoginModal from '../sendDialog/SendDialogComponent.js'
import DrawerUndockedExample from '../drawerUndockedExample/DrawerUndockedExampleComponent.js'

if (process.env.BROWSER) {
	require('./TopHeaderStyles.sass')
}

class TopHeader extends Component {

	loginFalse = () => {

		const { loginUser } = this.props.state

		if (!loginUser.rules) {
			return (
				<div className='userBtns'>
					<Link to='/personalArea' className='personalArea'>Личный кабинет</Link>
				</div>
			)
		} else if (loginUser.rules === 'moderator') {
			return (
				<div className='userBtns'>
					<Link to='/moderation' className='personalArea'>moderation</Link>
				</div>
			)
		}
	}

	handleClick = () => {
		if (!this.props.state.loginUser) {
			return false
		}
	}

	render() {

		const { loginUser, filterCity } = this.props.state

		return (
			<header>
				<div className='menuHeader'>
					<div className='top_logo'>
						<Link to='/'>
							<img src={ `${ process.env.URL_PATH }/static/uploads/logo2.png` } width='120' alt='logotype' />
						</Link>
						<h1 className='h1'>Продай, купи, отдай в дар, сообщи о находке или размести объявление о пропаже любого животного.</h1>
					</div>

					<LoginModal titleBtn={ filterCity.cityTopHeader } dialogModal='02' />

					{
						!loginUser || loginUser.error !== undefined ? <LoginModal titleBtn='Вход / регистрация' dialogModal='01' /> : this.loginFalse()
					}

					{
						!loginUser || loginUser.error !== undefined ?
							<LoginModal
								titleBtn='Подать объявление'
								classNameMobile='needLoginMobile'
								classesBtn='button2 needLoginMobile'
								dialogModal='01'
							/> : <Link to='/placeAnAd' className='button2 needLogin' onClick={ this.handleClick }>Подать объявление</Link>
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

export default connect(state => ({ state }))(TopHeader)