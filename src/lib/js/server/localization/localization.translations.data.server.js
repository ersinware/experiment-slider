import { PUBLIC_DEFAULT_LANGUAGE } from "$env/static/public";

export const langs = [PUBLIC_DEFAULT_LANGUAGE, 'tr']

export const localizedPaths = new Map([
    [PUBLIC_DEFAULT_LANGUAGE, [
        { name: '' }
    ]],
    ['tr', [
        { name: 'tr' }
    ]]
])

export let localizedSearchParams = new Map([
    [PUBLIC_DEFAULT_LANGUAGE, [
        { name: 'page' }
    ]],
    ['tr', [
        { name: 'sayfa' }
    ]]
])

export let localizedSearchValues = new Map([
    [PUBLIC_DEFAULT_LANGUAGE, [
        { name: 'hot-coffees' },
        { name: 'cold-coffees' },
        { name: 'gallery' },
        { name: 'about-us' },
        { name: 'contact' }
    ]],
    ['tr', [
        { name: 'sıcak-kahveler' },
        { name: 'soğuk-kahveler' },
        { name: 'galeri' },
        { name: 'hakkımızda' },
        { name: 'iletişim' }
    ]]
])