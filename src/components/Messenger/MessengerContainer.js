import React from "react";
import "./messenger.css"
import Messenger from "./Messenger";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {addMessageCreator} from "../../redux/dialogs-reducer";

class MessengerContainer extends React.Component {
    render() {
        return (
            <Messenger {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages,
        dialogs: state.dialogsPage.dialogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage(newMessageBody) {
            dispatch(addMessageCreator(newMessageBody))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(MessengerContainer)