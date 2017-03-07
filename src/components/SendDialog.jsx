import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SendAndRegistrationsTabs from "./SendAndRegistrationsTabs.jsx";

//styles
import "./SendDialog.sass"

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class LoginModal extends React.Component {

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const styles = {
      contentStyle: {
        maxWidth: "585px",
        width: "100%"
      },
      flatIcon: {
        minWidth: "30px",
        right: "10px",
        top: "-12px"     
      },
      overlayStyle: {
        padding: "30px 16px 26px"
      },
      actionsContainerStyle: {
        position: "absolute",
        top: "0",
        right: "0",
        width: "30px"
      }
  }
    const actions = [
      <FlatButton
        icon={<i className="fa fa-times" aria-hidden="true"></i>}
        primary={true}
        onTouchTap={this.handleClose}
        style={styles.flatIcon}
      />
    ];

    return (
      <div>
        <a href="javascript:void(0)" onTouchTap={this.handleOpen} className="button1">Вход / регистрация</a>
        <Dialog actions={actions} modal={true} repositionOnUpdate={true} autoDetectWindowHeight={true} open={this.state.open} contentStyle={styles.contentStyle} actionsContainerStyle={styles.actionsContainerStyle} bodyStyle={styles.overlayStyle} >

          <SendAndRegistrationsTabs className="sendAndRegDialog" />

        </Dialog>
      </div>
    );
  }
}