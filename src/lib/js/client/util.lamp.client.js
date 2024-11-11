import { performRippleEffect } from "./util.client"
import { anyOpenLeftMenu, closeLastLeftMenu } from "./util.left.menus.client.common"
import { anyOpenModal, closeLastModal } from "./util.modals.client.common"

let lampInterceptors = []

export function openLamp() {
    document.querySelectorAll('[data-scrollable]').forEach(node => node.classList.remove('o-y-hidden'))
    document.getElementById('lamp').classList.remove('close-lamp')
}

export function closeLamp() {
    document.querySelectorAll('[data-scrollable]').forEach(node => node.classList.add('o-y-hidden'))
    document.getElementById('lamp').classList.add('close-lamp')
}

export function registerLampClick(id, f) {
    lampInterceptors.push({ id, f })
}

export function unregisterLampClick(id) {
    lampInterceptors = lampInterceptors.filter(element => element.id !== id)
}

export function onLampClick(event) {
    if (lampInterceptors.length > 0) {
        lampInterceptors[lampInterceptors.length - 1].f(event)

        return
    }

    if (anyOpenLeftMenu()) {
        performRippleEffect(event)
        closeLastLeftMenu()

        return
    }

    if (anyOpenModal()) {
        performRippleEffect(event)
        closeLastModal()
    }
}