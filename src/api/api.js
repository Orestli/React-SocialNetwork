import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '3e258c9a-a74c-4267-8ffa-40721630520b'
    }
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return (
            instance
                .get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
        )
    },
    follow(userId) {
        return (
            instance
                .post(`follow/${userId}`)
                // .then(response => response.data)
        )
    },
    unfollow(userId) {
        return (
            instance
                .delete(`follow/${userId}`)
                // .then(response => response.data)
        )
    },
    getProfile(userId) {
        if (!userId) {
            userId = 2;
        }

        return (
            instance
                .get(`profile/${userId}`)
        )
    }
}

export const authAPI = {
    me() {
        return (
            instance
                .get(`auth/me`)
        )
    }
}