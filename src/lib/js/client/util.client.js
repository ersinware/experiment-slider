import { browser } from "$app/environment"
import { page } from "$app/stores"
import { getContext, setContext } from "svelte"
import { get, writable } from "svelte/store"
import { getLocalizedURL } from "../common/localization/localization.util.common"
import { getPaths, randomID } from "../common/util.common"
import { ORIENTATITON_SLIDER_HORIZONTAL, ORIENTATITON_SLIDER_VERTICAL } from "./constants.slider.client"
import { L } from "./localization/localization.translations.data.client.app"
import { anyOpenLeftMenu, closeLastLeftMenu } from "./util.left.menus.client.common"
import { anyOpenModal, closeLastModal } from "./util.modals.client.common"

let navigationState,
    rippleTargetInfo,
    lang,
    openSnackbars,
    bigScreen,
    url,
    dontInterruptModal,
    slidingId

export function init(_navigationState, _rippleTargetInfo, _lang, _openSnackbars, _bigScreen, _url, _dontInterruptModal) {
    navigationState = _navigationState
    rippleTargetInfo = _rippleTargetInfo
    lang = _lang
    openSnackbars = _openSnackbars
    bigScreen = _bigScreen
    url = _url
    dontInterruptModal = _dontInterruptModal

    if (browser) {
        initZeroTimeout()
        addEscapeAndEnterListener()
    }
}

export function getStore(key) {
    return getContext(key)
}

export function createStore(key, defaultValue) {
    setContext(key, writable(defaultValue))
}

//

function initZeroTimeout() {
    const
        timeouts = [],
        messageName = "zero-timeout-message"

    function setZeroTimeout(f) {
        timeouts.push(f)
        window.postMessage(messageName, "*")
    }

    function handleMessage(event) {
        if (event.source !== window || event.data !== messageName)
            return

        event.stopPropagation()

        if (timeouts.length > 0)
            (timeouts.shift())()
    }

    window.addEventListener("message", handleMessage, true)
    window.setZeroTimeout = setZeroTimeout
}

export function waitFor(delay) {
    return new Promise(resolve => setTimeout(resolve, delay))
}

export function yieldToMain() {
    if (setZeroTimeout)
        return new Promise(resolve => setZeroTimeout(() => queueMicrotask(resolve)))
    else
        return new Promise(resolve => setTimeout(() => queueMicrotask(resolve), 0))
}

//

export function getTransitionWhenAppropriate(transition, noTransition) {
    return noTransition ? { duration: 0 } : transition
}

export function getTransition(transition) {
    return get(navigationState) === 'navigating' ? { duration: 0 } : transition
}

//

export function setSliding(sliderId) {
    slidingId = sliderId
}

export function getSliding() {
    return slidingId
}

export function clearSliding() {
    slidingId = undefined
}

export function isSlidingSibling(siblingId) {
    return slidingId === siblingId
}

// 

export function addIntersectionObserver(node, onIntersect, threshold) {
    const observer = new IntersectionObserver(
        entries => onVisibleOrInvisible(entries, onIntersect),
        { threshold: threshold ?? 0 }
    )
    observer.observe(node)

    return observer
}

export function removeIntersectionObserver(observer) {
    if (observer)
        observer.disconnect()
}

function onVisibleOrInvisible(entries, onIntersect) {
    for (const entry of entries)
        if (entry.isIntersecting) {
            onIntersect()

            return
        }
}

// 

export function performRippleEffect(
    event,
    rippleType = 1,
    rippleColor = 'var(--ripple-color)',
    borderRadius = 'var(--border-radius)') {

    const rect = event.currentTarget.getBoundingClientRect()

    rippleTargetInfo.set({
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
        clickX: event.clientX,
        clickY: event.clientY,
        rippleType,
        rippleColor,
        borderRadius
    })
}

/* */

export function changeLanguage(newLang) {
    setNewURL(newLang)
    document.cookie = `lang=${newLang}; path=/; max-age=31536000;`
    lang.set(newLang)

    showSnackbar({ content: L('onLangChange', get(lang)) })
}

function setNewURL(newLang) {
    const _url = new URL(get(url))
    let newURL = getLocalizedURL(getPaths(_url.pathname), _url.searchParams, newLang)
    if (newURL === '/')
        newURL = ''

    newURL = get(page).url.origin + newURL
    url.set(newURL)
    window.history.replaceState(window.history.state, window.document.title, newURL);
}

/* */

export function showSnackbar(snackbar, delay) {
    const temp = get(openSnackbars)
    snackbar.id = randomID()

    if (!get(bigScreen))
        temp.push(snackbar)
    else
        temp.unshift(snackbar)

    openSnackbars.set(temp)

    const _delay = delay ?? (temp.length > 1 ? 5000 + temp.length * 500 : 5000)
    setTimeout(() => closeSnackbar(snackbar.id), _delay)
}

export function closeSnackbar(id) {
    const temp = get(openSnackbars).filter(_snackbar => _snackbar.id !== id)
    openSnackbars.set(temp)
}

export function getOrientationAtFirst() {
    if (browser)
        if (get(bigScreen)) return ORIENTATITON_SLIDER_VERTICAL;
        else return ORIENTATITON_SLIDER_HORIZONTAL;

    return ORIENTATITON_SLIDER_VERTICAL;
}

/* */

export function areEqualStrings(valueOne, valueTwo) {
    if (!valueOne || !valueTwo)
        return false

    return String(valueOne).localeCompare(valueTwo, undefined, { sensitivity: 'accent' }) === 0
}

/* */

export function addEscapeAndEnterListener() {
    if (document.onkeydown)
        return

    document.onkeydown = event => {
        const
            escape = event.key === 'Escape' || event.keyCode === 27,
            enter = event.key === 'Enter' || event.keyCode === 13

        if (escape) {
            if (anyOpenLeftMenu()) {
                closeLastLeftMenu()

                return
            }

            if (!get(dontInterruptModal) && anyOpenModal())
                closeLastModal()

            return
        }

        if (enter) {
            focusNext()
            event.preventDefault()
        }
    }
}

export function focusNext(plusOne) {
    const inputs = Array.prototype.slice.call(document.querySelectorAll('input:not(:disabled), textarea:not(:disabled)'))

    if (!inputs)
        return

    const currInput = document.activeElement;
    const currInputIndex = inputs.indexOf(currInput);
    let nextInputIndex = (currInputIndex + 1)

    if (plusOne)
        nextInputIndex++

    const input = inputs[nextInputIndex];
    if (nextInputIndex > inputs.length - 1) {
        currInput?.blur()

        return
    }

    input.focus();
}