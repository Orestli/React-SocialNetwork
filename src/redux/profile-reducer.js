import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

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
        default: {
            return state;
        }
    }
}

export const addPost = (text) => ({type: ADD_POST, text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})

export const setProfile = (userId) => {
    return (
        (dispatch) => {
            profileAPI.getProfile(userId)
                .then(response => {
                    dispatch(setUserProfile(response.data));
                })
        }
    )
}

export const getStatus = (userId) => {
    return (
        (dispatch) => {
            profileAPI.getStatus(userId)
                .then(response => {
                    dispatch(setStatus(response.data));
                })
        }
    )
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        })
}


export default profileReducer;