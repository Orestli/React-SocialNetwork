import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}

const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}})

export const setUserData = () => (dispatch) => {
    return authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0){
                    const {id, login, email} = response.data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            })
}

export const login = (email, password, rememberMe = true) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData())
            } else {
                dispatch(stopSubmit('login', {_error: response.data.messages}))
            }
        })
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}

export default authReducer;