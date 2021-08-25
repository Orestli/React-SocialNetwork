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
    },
    updatePhoto(file) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfile(profile) {
        return instance.put(`profile`, profile)
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = true, captcha = null) {
        return instance.post('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logout() {
        return instance.delete('auth/login')
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
    }
}