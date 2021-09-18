import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

const store = {
    _state: {
        profilePage: {
            posts: [
                {
                    value: "Hello everyone!",
                    views: 104
                },
                {
                    value: "It's my first post",
                    views: 1061
                },
                {
                    value: "Test#0000 created account",
                    views: 1067
                }
            ],
            newPostText: 'Discord'
        },
        dialogsPage: {
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
    },

    getState() {
        return this._state;
    },
    renderEntireTree() {},
    subscribe(observer) {
        this.renderEntireTree = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this.renderEntireTree()
    }
}

export default store;