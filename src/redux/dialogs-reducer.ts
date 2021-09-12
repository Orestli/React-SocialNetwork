const SEND_MESSAGE = 'SEND_MESSAGE'

export type dialogsType = {
    id: number
    name: string
}

export type messagesType = {
    id: number
    message: string
}

const initialState = {
    dialogs: [
        {id: 1, name: 'Oleg'},
        {id: 2, name: 'Vova'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Viktor'},
        {id: 5, name: 'Viktoria'},
        {id: 6, name: 'Orest'}
    ] as Array<dialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
    ] as Array<messagesType>
}

export type initialStateType = typeof initialState

function dialogsReducer(state = initialState, action: any): initialStateType {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {id: 6, message: action.newMessageBody}
                ]
            };
        }
        default: {
            return state;
        }
    }
}

type addMessageCreatorType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const addMessageCreator = (newMessageBody: string): addMessageCreatorType => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;