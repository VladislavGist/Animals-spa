import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import { actions as actionsLoginUser } from '../../ducks/loginUser'
import { actions as actionsAccountType } from '../../ducks/accountType'

class AccountType extends Component {

	componentWillMount() {

		const { loginUser } = this.props.state
		const { handlePrivateSeller, handlePermanentSeller, handleShelter } = this.props

		if (loginUser && loginUser.accountType === 'PRIVATE_SELLER') {
			handlePrivateSeller()
		} else if (loginUser && loginUser.accountType === 'PERMANENT_SELLER') {
			handlePermanentSeller()
		} else if (loginUser && loginUser.accountType === 'SHELTER') {
			handleShelter()
		}
	}

	//генерирование таблиц
	table = () => {

		let generateTable = () => {

			let obj, mass = [], tr, td

			//получили данные
			obj = this.props.state.accountType.tableData

			//прошлись циклом и вывели  td
			for(let i in obj) {

				let arg0 = i
				let arg1 = obj[i]

				mass.push(arg0, arg1)

				td = () => mass.map((elem, idx) => idx % 2 === 0 ?
					<tr key={ idx }>
						<td>{ elem }</td>
						<td>{ mass[idx + 1] }</td>
					</tr> : null
				)
			}
			
			return td()
		}

		return (
			<table>
				<tbody>
					{
						generateTable()
					}
				</tbody>
			</table>
		)
	}

	render() {

		const { accountType } = this.props.state
		const { handlePermanentSeller, loginFalse } = this.props

		return (
			<div className='accountType'>
				<p className='title'>Аккаунт</p>
				<p className='subTitle'>Тип аккаунта</p>
				<div className='buttons'>
					<a href='javascript:void(0)'
						className={ `typeBtn ${ accountType.type === 'PRIVATE_SELLER' ? 'active' : '' }` }
						onClick={ handlePermanentSeller }
					>
						<i className='fa fa-smile-o' aria-hidden='true' />
						<p>Частный <br /> продавец</p>
					</a>
					
				</div>

				<p className='price'>{ accountType.price } рублей</p>
				<p className='inMonth'>В месяц</p>
				{
					this.table()
				}
				
				<a href='javascript:void(0)'
					className='exitBtn button2'
					onClick={ loginFalse }
				>Выйти из аккаунта</a>
			</div>
		)
	}
}
/*
	<a href="javascript:void(0)" className={`typeBtn ${this.props.state.accountType.type === "PERMANENT_SELLER" ? "active" : ""}`} onClick={this.handlePermanentSeller}>
		<i className="fa fa-mobile" aria-hidden="true"></i>
		<p>Постоянный <br /> продавец</p>
	</a>
	<a href="javascript:void(0)" className={`typeBtn ${this.props.state.accountType.type === "SHELTER" ? "active" : ""}`} onClick={this.onHandleShelter}>
		<i className="fa fa-home" aria-hidden="true"></i>
		<p>Приют</p>
	</a>
	<a href="javascript:void(0)" className="button1">Активировать</a>
*/

export default connect(
	state => ({ state }),
	dispatch => bindActionCreators({ ...actionsAccountType, ...actionsLoginUser }, dispatch)
)(AccountType)