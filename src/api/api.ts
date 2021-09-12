import axios from "axios";
import {PhotosType, ProfileType} from "../redux/profile-reducer";
import {UsersType} from "../redux/users-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '3e258c9a-a74c-4267-8ffa-40721630520b'
    }
})

export enum ResultCodes {
    Success = 0,
    Error = 1,
    Captcha = 10
}

type ClassicType = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {
        userId?: number
    }
}

type _UsersType = {
    items: Array<UsersType>
    totalCount: number
    error: string
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<_UsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<ClassicType>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<ClassicType>(`follow/${userId}`)
    }
}

type UpdatePhotoType = {
    data: {
        photos: PhotosType
    }
    resultCode: number
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId: number) {
        if (!userId) {
            userId = 2;
        }

        return instance.get<ProfileType>(`profile/${userId}`)
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ClassicType>(`profile/status`, {status})
            .then(res => res.data)
    },
    updatePhoto(file: any) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<UpdatePhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    updateProfile(profile: ProfileType) {
        return instance.put<ClassicType>(`profile`, profile)
            .then(res => res.data)
    }
}

type meType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodes
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<meType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = true, captcha: string | null = null) {
        return instance.post<ClassicType>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete<ClassicType>('auth/login').then(res => res.data)
    }
}

type CaptchaType = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<CaptchaType>(`security/get-captcha-url`).then(res => res.data)
    }
}