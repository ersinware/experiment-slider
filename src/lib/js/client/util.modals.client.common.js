import { randomID } from "$lib/js/common/util.common.js";
import { get } from "svelte/store";
import { closeLamp, openLamp } from "./util.lamp.client";

const openStaticModals = []

let
    openModals,
    openDynamicModals,
    activeInnerModal

export function init(_openModals, _openDynamicModals, _activeInnerModal) {
    openModals = _openModals
    openDynamicModals = _openDynamicModals
    activeInnerModal = _activeInnerModal
}

export function openModal(modal) {
    if (modal.static)
        openStaticModal(modal.id)
    else if (modal.inner)
        openInnerModal(modal)
    else
        openDynamicModal(modal)

    const temp = get(openModals)
    temp.unshift(modal)
    openModals.set(temp)

    if (modal.inner)
        return

    if (temp.length === 1)
        closeLamp()
    else closeCurrentModal()
}

export function closeLastModal() {
    const
        temp = get(openModals),
        modal = temp.shift()

    if (modal.static) closeLastStaticModal(true)
    else if (modal.inner) closeInnerModal()
    else closeLastDynamicModal(true)

    openModals.set(temp)

    if (modal.inner)
        return

    if (temp.length === 0)
        openLamp()
    else openPreviousModal()
}

export function anyOpenModal() {
    return get(openModals).length > 0
}

function closeCurrentModal() {
    const temp = get(openModals)

    const modal = temp[1]
    if (!modal.addToBackstack)
        openModals.set(temp.filter(_entry => _entry !== modal))

    if (modal.static) closeLastStaticModal()
    else closeLastDynamicModal()
}

function openPreviousModal() {
    const modal = get(openModals)[0]
    if (modal.static)
        openStaticModal(modal.id)
    else openDynamicModal(modal)
}

function openStaticModal(id) {
    const modal = document.getElementById(id)
    modal.classList.add('block')
    setTimeout(() => modal.classList.add('open-static-modal'), 0)

    openStaticModals.unshift(id)
}

function closeLastStaticModal(fromStart) {
    const id = fromStart ? openStaticModals.shift() : openStaticModals.pop()
    const modal = document.getElementById(id)
    modal.classList.remove('open-static-modal')
    setTimeout(() => modal.classList.remove('block'), 250)
}

function openDynamicModal(modal) {
    if (!modal.id)
        modal.id = randomID()

    const temp = get(openDynamicModals)
    temp.unshift(modal)
    openDynamicModals.set(temp)
}

function closeLastDynamicModal(fromStart) {
    const temp = get(openDynamicModals)

    if (fromStart) temp.shift()
    else temp.pop()

    openDynamicModals.set(temp)
}

function openInnerModal(modal) {
    activeInnerModal.set(modal)
}

function closeInnerModal() {
    activeInnerModal.set(null)
}

export function closeAllModals() {
    while (get(openModals).length > 0)
        closeLastModal()
}

// farklı senaryolarda test edilmedi, sadece dynamic modals için yazıldı
export function closeModalByIdIfOpen(id) {
    const
        generalTemp = get(openModals),
        dynamicTemp = get(openDynamicModals)

    for (let i = 0; i < generalTemp.length; i++) {
        const
            modal = generalTemp[i],
            modalId = modal.id
        if (modalId === id)
            onFound(modal, i, getGeneralIndex(modalId))
    }

    function onFound(modal, generalIndex, dynamicIndex) {
        generalTemp.splice(generalIndex, 1)
        dynamicTemp.splice(dynamicIndex, 1)

        openModals.set(generalTemp)
        openDynamicModals.set(dynamicTemp)

        if (modal.inner)
            return

        if (generalTemp.length === 0)
            openLamp()
    }

    function getGeneralIndex() {
        for (let i = 0; i < dynamicTemp.length; i++) {
            const modalId = dynamicTemp[i].id
            if (modalId === id)
                return modalId
        }
    }
}