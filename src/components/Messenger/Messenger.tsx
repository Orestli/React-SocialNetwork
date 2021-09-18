import React from "react";
import "./messenger.css"
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Element} from "../common/FormsContorls/FormsContorls";
import { MessengerType } from "./MessengerContainer";
import {dialogsType, messagesType} from "../../redux/dialogs-reducer";

type ContactsType = {
    dialogs: Array<dialogsType>
}

const Contacts: React.FC<ContactsType> = (props) => {
    return (
        <ul className="dialog-persons">
            {
                props.dialogs.map(data => {
                    return (
                        <li className="person"><NavLink to={`/messenger/${data.id}`}>{data.name}</NavLink></li>
                    )
                })
            }
        </ul>
    )
}

type MessagesType = {
    messages: Array<messagesType>
}

const Messages: React.FC<MessagesType> = (props) => {
    return (
        <ul className="dialog-messages">
            {
                props.messages.map(data => {
                    return <li>{data.message}</li>
                })
            }
        </ul>
    )
}

const Textarea = Element('textarea')
const maxLength10 = maxLengthCreator(10)

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newMessageBody'} validate={[required, maxLength10]} placeholder={'Enter your message'}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({'form': 'AddMessageForm'})(AddMessageForm)

const Messenger: React.FC<MessengerType> = (props) => {
    const sendNewMessage = (value: any) => {
        props.sendNewMessage(value.newMessageBody);
    }

    return (
        <div className="dialog-page">
            <div className="dialog-contacts">
                <Contacts dialogs={props.dialogs} />
            </div>
            <div className="dialog-messages">
                <ul className="dialog-messages">
                    <Messages messages={props.messages} />
                </ul>
            </div>
            <AddMessageFormRedux onSubmit={sendNewMessage}/>
        </div>
    )
}

export default Messenger