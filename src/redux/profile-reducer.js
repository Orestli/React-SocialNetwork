import {usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_POST = 'UPDATE-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

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
    newPostText: 'Discord',
    profile: null
}

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD-POST': {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {value: action.text, views: 100}
                ]
            };
        }
        case 'UPDATE-POST': {
            return {
                ...state,
                newPostText: action.text
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        default: {
            return state;
        }
    }
}

export const addPost = (text) => ({type: ADD_POST, text})
export const updatePost = (text) => ({type: UPDATE_POST, text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const setProfile = (userId) => {
    return (
        (dispatch) => {
            usersAPI.getProfile(userId)
                .then(response => {
                    dispatch(setUserProfile(response.data));
                })
        }
    )
}

export default profileReducer;