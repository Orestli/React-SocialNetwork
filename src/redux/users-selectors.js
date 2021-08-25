import {createSelector} from "reselect";

export const _getUsers = (state) => {
    return state.usersPage.users
}

export const getUserSelector = createSelector(_getUsers, (users) => {
    return users.filter(u => true)
})

export const _getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const _getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const _getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const _getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const _getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}