import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import { moduleName } from '../../ducks/auth'

import LoginModal from '../sendDialog/SendDialogComponent.js'
import DrawerUndockedExample from '../drawerUndockedExample/DrawerUndockedExampleComponent.js'

if (process.env.BROWSER) {
	require('./TopHeaderStyles.sass')
}

class Sidebar extends Component {

	switchMenuRoles = () => {
		const { user } = this.props

		if (user && user.role === 'user') {
			return <div className='userBtns'>
				<Link to='/personalArea' className='personalArea'>Личный кабинет</Link>
			</div>

		} else if (user && user.role === 'moderator') {
			return <div className='userBtns'>
				<Link to='/moderation' className='personalArea'>moderation</Link>
			</div>
		}
	}

	protected = () => !this.props.user && false

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
						<h1 className='h1'>Продай, купи, отдай в дар, сообщи о находке или пропаже животного</h1>
					</div>

					<LoginModal titleBtn={ filterCity.cityTopHeader } dialogModal='02' />

					{ !user ? <LoginModal titleBtn='Вход / регистрация' dialogModal='01' /> : this.switchMenuRoles() }

					{ !user ? (
						<LoginModal
							titleBtn='Подать объявление'
							classNameMobile='needLoginMobile'
							classesBtn='button2 needLoginMobile'
							dialogModal='01'
						/>
					) : (
						<Link
							to='/placeAnAd'
							className='button2 needLogin'
							onClick={ this.protected }>
								Подать объявление
						</Link>
					) }

					<DrawerUndockedExample />
				</div>
			</header>
		)
	}
}

Sidebar.propTypes = {
	user: PropTypes.object,
	filterCity: PropTypes.object.isRequired
}

export default connect(state => ({
	user: state[moduleName].user,
	filterCity: state.filterCity,
}))(Sidebar)