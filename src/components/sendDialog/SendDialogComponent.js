import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'

import { actions as actionsFilterCity } from '../../ducks/filterCity'

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
				top: '-9px'
			},
			overlayStyle: { padding: '30px 16px 26px' },
			actionsContainerStyle: {
				position: 'absolute',
				top: '0',
				right: '0',
				width: '30px'
			}
		}

		const { dispatchCityTopHeader, cityList } = this.props

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
			modal={ false }
			autoScrollBodyContent={ true }
			repositionOnUpdate={ true }
			autoDetectWindowHeight={ true }
			open={ this.state.open }
			contentStyle={ styles.contentStyle }
			actionsContainerStyle={ styles.actionsContainerStyle }
			bodyStyle={ styles.overlayStyle }
			onRequestClose={ this.handleClose }
		>
			<TabsFormsComponent handleClose={ this.handleClose } />
		</Dialog>

		const dialogModal02 = () => {

			let handleCityTopHeader = e => {
				dispatchCityTopHeader(e.target.innerText)
				this.handleClose()
			}

			return (
				<Dialog
					actions={ actions }
					modal={ false }
					autoScrollBodyContent={ true }
					repositionOnUpdate={ true }
					autoDetectWindowHeight={ true }
					open={ this.state.open }
					contentStyle={ styles.contentStyle }
					actionsContainerStyle={ styles.actionsContainerStyle }
					bodyStyle={ styles.overlayStyle }
					onRequestClose={ this.handleClose }
				>
					<div className='modalCityWrap'>
						<a href='javascript:void(0)' onClick={ handleCityTopHeader } className='allCitys'>Все регионы</a>
						<div className='modalAllCity'>
							{ cityList && cityList.length > 0
								? cityList.map((elem, idx) =>
									<a href='javascript:void(0)' key={ idx } onClick={ handleCityTopHeader }>{ elem }</a>)
								: <CircularProgress size={ 60 }/> }
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

LoginModal.propTypes = {
	dispatchCityTopHeader: PropTypes.func.isRequired,
	cityList: PropTypes.array.isRequired
}

export default connect(
	state => ({ cityList: state.filterCity.cityList }),
	{ ...actionsFilterCity }
)(LoginModal)