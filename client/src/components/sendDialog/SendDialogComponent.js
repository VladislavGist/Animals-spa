import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import FlatButton from 'material-ui/FlatButton'

import { actions as actionsFilterCity } from '../../ducks/filterCity'
import { actions as actionsServerReducer } from '../../ducks/serverReducer'

import TabsFormsComponent from '../forms/tabsForms/TabsFormsComponent'

if (process.env.BROWSER) {
	require('./SendDialogStyles.sass')
}

class LoginModal extends Component {

	state = { open: false }

	handleOpen = () => { this.setState({ open: true }) }

	handleClose = () => { this.setState({ open: false }) }

	render() {

		const styles = {
			contentStyle: {
				maxWidth: '585px',
				width: '100%'
			},
			flatIcon: {
				minWidth: '30px',
				right: '10px',
				top: '-11px'
			},
			overlayStyle: { padding: '30px 16px 26px' },
			actionsContainerStyle: {
				position: 'absolute',
				top: '0',
				right: '0',
				width: '30px'
			}
		}

		const { allParamsUrl, filterCity } = this.props.state

		const { dispatchCityTopHeader, getCards } = this.props

		const actions = [
			<FlatButton
				icon={ <i className='fa fa-times' aria-hidden='true' /> }
				primary={ true }
				onTouchTap={ this.handleClose }
				style={ styles.flatIcon }
			/>
		]

		const dialogModal01 = () => <Dialog
			actions={ actions }
			modal={ true }
			autoScrollBodyContent={ true }
			repositionOnUpdate={ true }
			autoDetectWindowHeight={ true }
			open={ this.state.open }
			contentStyle={ styles.contentStyle }
			actionsContainerStyle={ styles.actionsContainerStyle }
			bodyStyle={ styles.overlayStyle }
		>
			<TabsFormsComponent />
		</Dialog>

		const dialogModal02 = () => {

			let handleCityTopHeader = e => {
				dispatchCityTopHeader(e.target.innerText)
				this.handleClose()
		
				// фльтр объявлений по клику на город. на главной
				if (allParamsUrl.split('/')[1] === '') {
					getCards(`${ process.env.URL_PATH }/api/list-hot-adv/${ e.target.innerText }`)
				} else {
					// на остальных
					getCards(`${ process.env.URL_PATH }/api/list-animals/animal_type/${ allParamsUrl.split('/')[2] }/advertisement_type/${ allParamsUrl.split('/')[3] }/city/${ e.target.innerText }/count/10`)
				}
			}

			return (
				<Dialog
					actions={ actions }
					modal={ true }
					autoScrollBodyContent={ true }
					repositionOnUpdate={ true }
					autoDetectWindowHeight={ true }
					open={ this.state.open }
					contentStyle={ styles.contentStyle }
					actionsContainerStyle={ styles.actionsContainerStyle }
					bodyStyle={ styles.overlayStyle }
				>
					<div className='modalCityWrap'>
						<a href='javascript:void(0)' onClick={ handleCityTopHeader } className='allCitys'>Все регионы</a>
						<div className='modalAllCity'>
							{
								filterCity.citys.map((elem, idx) => <a href='javascript:void(0)' key={ idx } onClick={ handleCityTopHeader }>{ elem }</a>)
							}
						</div>
					</div>
				</Dialog>
			)
		}

		return (
			<div className={ `regionsBtn ${ this.props.classNameMobile }` }>
				<a
					href='javascript:void(0)'
					onTouchTap={ this.handleOpen }
					className={ `button1 ${ this.props.classesBtn }` }>
					{ this.props.titleBtn }
				</a>
				{ this.props.dialogModal === '01' ? dialogModal01() : '' }
				{ this.props.dialogModal === '02' ? dialogModal02() : '' }
			</div>
		)
	}
}

export default connect(state => ({ state }),
	dispatch => bindActionCreators({ ...actionsFilterCity, ...actionsServerReducer }, dispatch)
)(LoginModal)