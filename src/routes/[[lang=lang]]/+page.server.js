import { getLocalizedSearchParam } from '$lib/js/common/localization/localization.util.common.js'
import { error } from '@sveltejs/kit'

export function load({ locals }) {
    const _error = locals.manualError
    if (_error)
        throw error(_error.status, _error.body)

    const
        lang = locals.lang,
        page = locals.searchParams.get(getLocalizedSearchParam('page', lang))

    let sliderIndexAtFirst = 0
    if (page)
        sliderIndexAtFirst = getIndexByPageName(page)

    return {
        sliderIndexAtFirst
    }
}

function getIndexByPageName(page) {
    switch (page) {
        case 'hot-coffees':
            return 1
        case 'sıcak-kahveler':
            return 1
        case 'cold-coffees':
            return 2
        case 'soğuk-kahveler':
            return 2
        case 'gallery':
            return 3
        case 'galeri':
            return 3
        case 'about-us':
            return 4
        case 'hakkımızda':
            return 4
        case 'contact':
            return 5
        case 'iletişim':
            return 5
        default:
            return 0
    }
}