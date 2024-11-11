import { cubicInOut } from "svelte/easing"

export const MEDIA_QUERY_BIG_SCREEN = '(min-width: 65.001em)'

/* */

export const MODAL_TRANSITION_DURATION = 500
export const MODAL_TRANSITION_Y = 16

export const LEFT_MENU_TRANSITION_X = -16
export const LEFT_MENU_TRANSITION_DURATION = 500

export const RIPPLE_TYPE_ZERO_DURATION = 400
export const RIPPLE_TYPE_ONE_DURATION = 300

export const MODAL_PROGRESS_BAR_NAVIGATED_TRANSITION_DURATION = 500

/* */

export const ACTIVE_OPTION_IN_TRANSITION = { y: -8, easing: cubicInOut, delay: 125 }

/* */

export const EVENT_CLOSE_LANGUAGES = 'EVENT_CLOSE_LANGUAGES'