import { connect } from 'react-redux'
import React, { Component } from 'react'

import { actions as authActions } from '../../ducks/auth'
import { actions as actionsAccountType } from '../../ducks/accountType'

class AccountType extends Component {

	componentWillMount() {
		const { accountType } = this.props
		const { handlePrivateSeller, handlePermanentSeller, handleShelter } = this.props

		if (accountType === 'PRIVATE_SELLER') {
			handlePrivateSeller()
		} else if (accountType === 'PERMANENT_SELLER') {
			handlePermanentSeller()
		} else if (accountType === 'SHELTER') {
			handleShelter()
		}
	}

	//генерирование таблиц
	table = () => {
		const { accountsTypes } = this.props

		let generateTable = () => {

			let obj, mass = [], tr, td

			//получили данные
			obj = accountsTypes.tableData

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
		const { accountType, accountsTypes} = this.props
		const { handlePermanentSeller, loginFalse } = this.props

		return (
			<div className='accountType'>
				<p className='title'>Аккаунт</p>
				<p className='subTitle'>Тип аккаунта</p>
				<div className='buttons'>
					<a href='javascript:void(0)'
						className={ `typeBtn ${ accountType === 'PRIVATE_SELLER' && 'active' }` }
						// onClick={ handlePermanentSeller }
					>
						<i className='fa fa-smile-o' aria-hidden='true' />
						<p>Частный <br /> продавец</p>
					</a>
					
				</div>

				<p className='price'>{ accountsTypes.price } рублей</p>
				<p className='inMonth'>В месяц</p>

				{ this.table() }

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
	state => ({
		accountType: state.auth.userDatas && state.auth.userDatas.accountType,
		accountsTypes: state.accountType
	}),
	{ ...actionsAccountType, ...authActions }
)(AccountType)