<<<<<<< HEAD
import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SAVE_PHOTO = 'SAVE_PHOTO'

export type PostType = {
    value: string
    views: number
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: PhotosType
}

const initialState = {
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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type initialStateType = typeof initialState

function profileReducer(state = initialState, action: any): initialStateType {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {value: action.text, views: 100}
                ]
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
           return {
               ...state,
               status: action.status
           }
        }
        case SAVE_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default: {
            return state;
        }
    }
}

type AddPostType = {
    type: typeof ADD_POST
    text: string
}
export const addPost = (text: string): AddPostType => ({type: ADD_POST, text})

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: object
}
export const setUserProfile = (profile: object): SetUserProfileType => ({type: SET_USER_PROFILE, profile})

type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status})

type UpdatePhotoSuccessType = {
    type: typeof SAVE_PHOTO
    photos: PhotosType
}
export const updatePhotoSuccess = (photos: PhotosType): UpdatePhotoSuccessType => ({type: SAVE_PHOTO, photos})

export const setProfile = (userId: number) => async (dispatch: any) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const updatePhoto = (file: any) => async (dispatch: any) => {
    const data = await profileAPI.updatePhoto(file)
    if (data.resultCode === 0) {
        dispatch(updatePhotoSuccess(data.data.photos));
    }
}

export const updateProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const data = await profileAPI.updateProfile(profile)

    if (data.resultCode === 0) {
        dispatch(setProfile(userId));
    } else {
        dispatch(stopSubmit('profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

=======
import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SAVE_PHOTO = 'SAVE_PHOTO'

type PostType = {
    value: string
    views: number
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: PhotosType
}

const initialState = {
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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type initialStateType = typeof initialState

function profileReducer(state = initialState, action: any): initialStateType {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {value: action.text, views: 100}
                ]
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
           return {
               ...state,
               status: action.status
           }
        }
        case SAVE_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default: {
            return state;
        }
    }
}

type AddPostType = {
    type: typeof ADD_POST
    text: string
}
export const addPost = (text: string): AddPostType => ({type: ADD_POST, text})

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: object
}
export const setUserProfile = (profile: object): SetUserProfileType => ({type: SET_USER_PROFILE, profile})

type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status})

type UpdatePhotoSuccessType = {
    type: typeof SAVE_PHOTO
    photos: PhotosType
}
export const updatePhotoSuccess = (photos: PhotosType): UpdatePhotoSuccessType => ({type: SAVE_PHOTO, photos})

export const setProfile = (userId: number) => async (dispatch: any) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const updatePhoto = (file: any) => async (dispatch: any) => {
    const data = await profileAPI.updatePhoto(file)
    if (data.resultCode === 0) {
        dispatch(updatePhotoSuccess(data.data.photos));
    }
}

export const updateProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const data = await profileAPI.updateProfile(profile)

    if (data.resultCode === 0) {
        dispatch(setProfile(userId));
    } else {
        dispatch(stopSubmit('profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

>>>>>>> 2168b5cfc8651cef8a12db09eeb1fd0403ebda77
export default profileReducer;