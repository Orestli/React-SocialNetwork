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
}