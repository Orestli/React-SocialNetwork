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
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    }
}

export const profileAPI = {
    getProfile(userId) {
        if (!userId) {
            userId = 2;
        }

        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status})
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = true) {
        return instance.post('auth/login', {
            email,
            password,
            rememberMe
        })
    },
    logout() {
        return instance.delete('auth/login')
    }
}