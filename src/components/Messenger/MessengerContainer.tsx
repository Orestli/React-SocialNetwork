import React from "react";
import "./messenger.css"
import Messenger from "./Messenger";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {addMessageCreator, dialogsType, messagesType} from "../../redux/dialogs-reducer";
import {StateType} from "../../redux/redux-store";
import {UsersType} from "../../redux/users-reducer";

type mapStateToPropsType = {
    messages: Array<messagesType>
    dialogs: Array<dialogsType>
}

type mapDispatchToPropsType = {
    sendNewMessage: (newMessageBody: string) => void
}

type PropsType = mapStateToPropsType & mapDispatchToPropsType

class MessengerContainer extends React.Component<PropsType> {
    render() {
        return (
            <Messenger {...this.props}/>
        )
    }
}

const mapStateToProps = (state: StateType): mapStateToPropsType => ({
    messages: state.dialogsPage.messages,
    dialogs: state.dialogsPage.dialogs
})

export default compose(
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, StateType>(mapStateToProps, {sendNewMessage: addMessageCreator}),
    withAuthRedirect
)(MessengerContainer)