import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SAVE_PHOTO = 'SAVE_PHOTO'

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
    ],
    profile: null,
    status: ''
}

function profileReducer(state = initialState, action) {
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
                profile: {...state.profile, photos: action.photos}
            }
        }
        default: {
            return state;
        }
    }
}

export const addPost = (text) => ({type: ADD_POST, text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const updatePhotoSuccess = (photos) => ({type: SAVE_PHOTO, photos})

export const setProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const updatePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.updatePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(updatePhotoSuccess(response.data.data.photos));
    }
}

export const updateProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.updateProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(setProfile(userId));
    } else {
        dispatch(stopSubmit('profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;