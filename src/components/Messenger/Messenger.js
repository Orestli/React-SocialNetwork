import React from "react";
import "./messenger.css"
import {NavLink} from "react-router-dom";

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

function Messenger(props) {
    function updatedNewMessage(e) {
        const value = e.target.value;
        props.updatedNewMessage(value);
    }

    function sendNewMessage() {
        props.sendNewMessage();
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
            <div>
                <textarea onChange={updatedNewMessage} />
                <button onClick={sendNewMessage}>Send</button>
            </div>
        </div>
    )
}

export default Messenger;