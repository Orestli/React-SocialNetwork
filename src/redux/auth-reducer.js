import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA = 'auth/GET_CAPTCHA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        case GET_CAPTCHA: {
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
const getCaptchaSuccess = (captchaUrl) => ({type: GET_CAPTCHA, payload: {captchaUrl}})

export const setUserData = () => async (dispatch) => {
    const response = await authAPI.me()

    if (response.data.resultCode === 0) {
        const {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(setUserData())
    } else {
        if (response.data.resultCode) {
            dispatch(getCaptcha())
        }

        dispatch(stopSubmit('login', {_error: response.data.messages}))
    }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptcha = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha()
    dispatch(getCaptchaSuccess(response.data.url))
}

export default authReducer;