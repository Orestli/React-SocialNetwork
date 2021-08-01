const initialState = {
    dialogs: [
        {id: 1, name: 'Oleg'},
        {id: 2, name: 'Vova'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Viktor'},
        {id: 5, name: 'Viktoria'},
        {id: 6, name: 'Orest'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
    ],
    newMessageText: ''
}

function dialogsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SEND-MESSAGE': {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {id: 6, message: state.newMessageText}
                ]
            };
        }
        case 'UPDATE-MESSAGE': {
            return {
                ...state,
                newMessageText: action.text
            };
        }
        default: {
            return state;
        }
    }
}

export default dialogsReducer;