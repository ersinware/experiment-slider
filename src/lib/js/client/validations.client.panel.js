import { browser } from "$app/environment";

const phoneNumberBreakpoints = [3, 7, 10]

export function onValidityChange(arrFormValid) {
    if (!browser)
        return false

    return allTrue(arrFormValid)
}

function allTrue(arr) {
    return !arr.includes(false) && !arr.includes(undefined)
}

/* */

export function validateNameAndSurname(value) {
    return value.length >= 3 && value.length <= 25;
}

export function validateEmailAddress(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

export function validateThoughts(value) {
    return value.length >= 10 && value.length <= 300
}

export function validatePhoneNumber(value) {
    if (value[0] !== '5')
        return false

    return /^[0-9 ]{13}$/.test(value)
}

export function validateEmail(value) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
}

export function formatPhoneNumber(value, newLetter) {
    if (!/^[0-9]$/.test(newLetter))
        return { preventDefault: true }

    if (value.length > 13)
        return { preventDefault: true }

    for (const breakpoint of phoneNumberBreakpoints) {
        const newPhoneNumber = getNewPhoneNumber(value, breakpoint)

        if (newPhoneNumber)
            return { newValue: newPhoneNumber }
    }
}

export function getNewPhoneNumber(value, breakpoint) {
    if (value.length > breakpoint) {
        const target = value[breakpoint]
        if (target !== ' ')
            return value.substring(0, breakpoint) + ' ' + target
    }
}