import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u, followed: true
                        }
                    }
                    return u;
                })
            };
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u, followed: false
                        }
                    }
                    return u;
                })
            };
        }
        case 'SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SET_TOTAL_USER_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default: {
            return state;
        }
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUserCount = (totalUsersCount) => ({type: SET_TOTAL_USER_COUNT, totalUsersCount});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});
export const setToggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getUsers = (page, pageSize) => {
        return (
            (dispatch) => {
                dispatch(setToggleIsFetching(true));
                dispatch(setCurrentPage(page));
                usersAPI.getUsers(page, pageSize)
                    .then(data => {
                        dispatch(setUsers(data.items));
                        dispatch(setTotalUserCount(data.totalCount));
                        dispatch(setToggleIsFetching(false));
                    })
                }
        )
}

export const follow = (userId) => {
    return (
        (dispatch) => {
            dispatch(toggleFollowingProgress(true, userId));
            usersAPI.follow(userId)
                .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(followSuccess(userId));
                    }
                    dispatch(toggleFollowingProgress(false, userId));
                })
        }
    )
}

export const unfollow = (userId) => {
    return (
        (dispatch) => {
            dispatch(toggleFollowingProgress(true, userId));
            usersAPI.unfollow(userId)
                .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(unfollowSuccess(userId));
                    }
                    dispatch(toggleFollowingProgress(false, userId));
                })
        }
    )
}

export default usersReducer;