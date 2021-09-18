<<<<<<< HEAD
import {authAPI, ResultCodes, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA = 'auth/GET_CAPTCHA';

export type initialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl?: string
}

const initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: ''
};

const authReducer = (state = initialState, action: any): initialStateType => {

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

type setAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: initialStateType
}
const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
})

type getCaptchaSuccessType = {
    type: typeof GET_CAPTCHA
    payload: {
        captchaUrl: string
    }
}
const getCaptchaSuccess = (captchaUrl: string): getCaptchaSuccessType => ({type: GET_CAPTCHA, payload: {captchaUrl}})

export const setUserData = () => async (dispatch: any) => {
    const meData = await authAPI.me()

    if (meData.resultCode === ResultCodes.Success) {
        const {id, login, email} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)

    if (data.resultCode === ResultCodes.Success) {
        dispatch(setUserData())
    } else {
        if (data.resultCode === ResultCodes.Captcha) {
            dispatch(getCaptcha())
        }

        dispatch(stopSubmit('login', {_error: data.messages}))
    }
}

export const logout = () => async (dispatch: any) => {
    const data = await authAPI.logout()

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptcha = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptcha()
    dispatch(getCaptchaSuccess(data.url))
}

=======
import {authAPI, ResultCodes, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA = 'auth/GET_CAPTCHA';

export type initialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl?: string
}

let initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: ''
};

const authReducer = (state = initialState, action: any): initialStateType => {

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

type setAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: initialStateType
}
const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
})

type getCaptchaSuccessType = {
    type: typeof GET_CAPTCHA
    payload: {
        captchaUrl: string
    }
}
const getCaptchaSuccess = (captchaUrl: string): getCaptchaSuccessType => ({type: GET_CAPTCHA, payload: {captchaUrl}})

export const setUserData = () => async (dispatch: any) => {
    const meData = await authAPI.me()

    if (meData.resultCode === ResultCodes.Success) {
        const {id, login, email} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)

    if (data.resultCode === ResultCodes.Success) {
        dispatch(setUserData())
    } else {
        if (data.resultCode === ResultCodes.Captcha) {
            dispatch(getCaptcha())
        }

        dispatch(stopSubmit('login', {_error: data.messages}))
    }
}

export const logout = () => async (dispatch: any) => {
    const data = await authAPI.logout()

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptcha = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptcha()
    dispatch(getCaptchaSuccess(data.url))
}

>>>>>>> 2168b5cfc8651cef8a12db09eeb1fd0403ebda77
export default authReducer;