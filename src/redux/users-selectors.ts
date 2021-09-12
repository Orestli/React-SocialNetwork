import {createSelector} from "reselect";
import {StateType} from "./redux-store";

export const _getUsers = (state: StateType) => {
    return state.usersPage.users
}

export const getUserSelector = createSelector(_getUsers, (users) => {
    return users.filter(u => true)
})

export const _getPageSize = (state: StateType) => {
    return state.usersPage.pageSize
}

export const _getTotalUsersCount = (state: StateType) => {
    return state.usersPage.totalUsersCount
}

export const _getCurrentPage = (state: StateType) => {
    return state.usersPage.currentPage
}

export const _getIsFetching = (state: StateType) => {
    return state.usersPage.isFetching
}

export const _getFollowingInProgress = (state: StateType) => {
    return state.usersPage.followingInProgress
}