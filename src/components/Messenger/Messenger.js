import React from "react";
import "./messenger.css"
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Element} from "../common/FormsContorls/FormsContorls";

function Contacts(props) {
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

function Messages(props) {
    return (
        <ul className="dialog-messages">
            {
                props.messages.map(data => {
                    return (
                        <li>{data.message}</li>
                    )
                })
            }
        </ul>
    )
}

const Textarea = Element('textarea')
const maxLength10 = maxLengthCreator(10)

const AddMessageForm = (props) => {
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

function Messenger(props) {
    function sendNewMessage(value) {
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