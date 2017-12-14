import classNames from 'classnames'
import React, { Component } from 'react'

import TextField from 'material-ui/TextField'

export default class TableRowsComponent extends Component {

	state = {
		openElem: false
	}

	handleOpenElem = () => {
		this.setState({
			openElem: !this.state.openElem
		})
	}

	render() {

		let { name, state, hintText, changeFunc, nameText, errorElem, submitFunc, resultsElem } = this.props

		return <tr>
			<tr>
				<td>{ name }</td>
				<td>{ state.loginUser.results[0][resultsElem] || '' }</td>
				<td>
					<a href='javascript:void(0)' className='toggleBtn' onClick={ this.handleOpenElem }>Изменить</a>
				</td>
			</tr>
			<tr className={
				classNames({
					'trToggle': true,
					'active': this.state.openElem
				})
			}>
				<td>
					<TextField
						hintText={ hintText }
						onChange={ changeFunc }
						name={ nameText }
						errorText={ state.userPersonalDatas.validateRoles[errorElem] || state.userPersonalDatas.validateRoles[errorElem] === ' ' ? '' : ' ' }
					/>
				</td>
				<td>
					<a href='javascript:void(0)' onClick={ submitFunc }>Применить</a>
				</td>
			</tr>
		</tr>
	}
}