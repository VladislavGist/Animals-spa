import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import { moduleName } from '../../ducks/auth'

import LoginModal from '../sendDialog/SendDialogComponent.js'

class DrawerUndockedExample extends Component {

	state = { open: false }

	handleToggle = () => this.setState({ open: !this.state.open })

	handleClose = () => this.setState({ open: false })

	render() {
		const { userDatas, filterCity } = this.props

		const loginFalse = () => {
			if (userDatas.role === 'user') {
				return (
					<div className='userBtns'>
						<Link to='/personalArea' className='mobileBtnPersonalArea'>Личный кабинет</Link>
					</div>
				)
			} else if (userDatas.role === 'moderator') {
				return (
					<div className='userBtns'>
						<Link to='/moderation' className='mobileBtnPersonalArea'>moderation</Link>
					</div>
				)
			}
		}

		let style = {
			RaisedBtn: {
				'minWidth': '50px',
				'maxWidth': '50px'
			},
			RaisedBtnButton: {
				'height': '40px'
			}
		}

		return (

			<div className='mobileMenuBtn'>
				<RaisedButton
					label={ <i className='fa fa-bars' /> }
					onTouchTap={ this.handleToggle }
					className='mobileMenuBtn shadowMaterial1'
					backgroundColor='#2196f3'
					labelColor='white'
					style={ style.RaisedBtn }
					buttonStyle={ style.RaisedBtnButton }
				/>

				<Drawer
					docked={ false }
					width={ 200 }
					open={ this.state.open }
					onRequestChange={ open => this.setState({ open }) }
				>
					<MenuItem>
						<LoginModal
							titleBtn={ filterCity.cityTopHeader }
							classNameMobile='regionsBtnMobile'
							dialogModal='02'
						/>
					</MenuItem>

					<MenuItem onTouchTap={ this.handleClose }>
						{
							!userDatas ?
								<LoginModal
									classesBtn='accountBtnMobile'
									classNameMobile='mobileSign'
									titleBtn='Вход / регистрация'
									dialogModal='01'
								/>
								: loginFalse()
						}
					</MenuItem>

					<MenuItem onTouchTap={ this.handleClose }>
						{
							!userDatas ?
								<LoginModal
									titleBtn='Подать объявление'
									classesBtn='button2 mobileBtnPersonalArea'
									classNameMobile='mobilePersonal'
									dialogModal='01' /> :
								<Link to='/placeAnAd'
									className='button2 mobileBtnPersonalArea'>
										Подать объявление
								</Link>
						}
					</MenuItem>
				</Drawer>
			</div>
		)
	}
}

export default connect(state => ({
	userDatas: state[moduleName].userDatas,
	filterCity: state.filterCity
}))(DrawerUndockedExample)