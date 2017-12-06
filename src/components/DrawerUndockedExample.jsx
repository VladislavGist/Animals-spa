import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import LoginModal from './SendDialog.jsx'

class DrawerUndockedExample extends React.Component {

	state = { open: false }

	handleToggle = () => this.setState({ open: !this.state.open })

	handleClose = () => this.setState({ open: false })

	render() {

		const loginFalse = () => {
			if (this.props.state.loginUser.results[0].rules === null) {
				return (
					<div className='userBtns'>
						<Link to='/personalArea' className='mobileBtnPersonalArea'>Личный кабинет</Link>
					</div>
				)
			} else if (this.props.state.loginUser.results[0].rules === 'moderator') {
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

		const { state } = this.props

		return (

			<div className='mobileMenuBtn'>
				<RaisedButton
					label={ <i className='fa fa-bars' /> }
					onTouchTap={ this.handleToggle }
					className='mobileMenuBtn shadowMaterial1'
					backgroundColor='#2196f3'
					labelColor='white'
					style={
						style.RaisedBtn
					}
					buttonStyle={
						style.RaisedBtnButton
					}
				/>

				<Drawer
					docked={ false }
					width={ 200 }
					open={ this.state.open }
					onRequestChange={ (open) => this.setState({ open }) }
				>
					<MenuItem>
						<LoginModal
							titleBtn={ state.filterCity.cityTopHeader }
							classNameMobile='regionsBtnMobile'
							dialogModal='02'
						/>
					</MenuItem>

					<MenuItem onTouchTap={ this.handleClose }>
						{
							state.loginUser === false || state.loginUser.error !== undefined ?
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
							state.loginUser === false ?
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

export default connect(
	state => ({ state })
)(DrawerUndockedExample)