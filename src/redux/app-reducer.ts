<<<<<<< HEAD:src/redux/app-reducer.ts
import {setUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
};

export type initialStateType = typeof initialState

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
    const resultPromise = dispatch(setUserData())
    Promise.all([resultPromise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

=======
import {setUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
};

export type initialStateType = typeof initialState

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
    const resultPromise = dispatch(setUserData())
    Promise.all([resultPromise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

>>>>>>> 2168b5cfc8651cef8a12db09eeb1fd0403ebda77:src/redux/app-reducer.js
export default appReducer;