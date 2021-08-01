import React from "react";
import "./messenger.css"
import Messenger from "./Messenger";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages,
        dialogs: state.dialogsPage.dialogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage() {
            dispatch({
                type: 'SEND-MESSAGE'
            })
        },
        updatedNewMessage(value) {
            dispatch({
                type: 'UPDATE-MESSAGE',
                text: value
            })
        }
    }
}

const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(Messenger);

export default MessengerContainer;