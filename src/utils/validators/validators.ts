<<<<<<< HEAD:src/utils/validators/validators.ts
export type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = (value) => {
    if (value) {
        return undefined
    } else {
        return 'Field is require'
    }
}

export const maxLengthCreator = (maxLength: number): ValidatorType => (value) => {
    if (value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    } else {
        return undefined
    }
=======
export type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = (value) => {
    if (value) {
        return undefined
    } else {
        return 'Field is require'
    }
}

export const maxLengthCreator = (maxLength: number): ValidatorType => (value) => {
    if (value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    } else {
        return undefined
    }
>>>>>>> 2168b5cfc8651cef8a12db09eeb1fd0403ebda77:src/utils/validators/validators.js
}