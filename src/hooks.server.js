import { getLocalizedURL, init as initLocalizationUtil } from '$lib/js/common/localization/localization.util.common'
import { getPaths } from '$lib/js/common/util.common'
import { paths, searchParams, searchValues } from '$lib/js/server/localization/localization.constants.server'
import { init as initLocalizationData } from '$lib/js/server/localization/localization.constants.util.server'
import { getLanguageByHeader } from '$lib/js/server/localization/localization.util.server'
import { redirect } from '@sveltejs/kit'

initLocalizationData()
initLocalizationUtil(paths, searchParams, searchValues)

export async function handle({ event, resolve }) {
    const
        pathname = decodeURI(event.url.pathname),
        paths = getPaths(pathname),
        firstPath = paths[0]

    if (firstPath && firstPath.includes('sitemap'))
        return await resolve(event)

    event.locals.lang = event.cookies.get('lang') ?? getLanguageByHeader(event.request.headers.get('Accept-Language'))
    event.locals.theme = event.cookies.get('theme') ?? 'system'
    event.locals.searchParams = event.url.searchParams

    localizeURL(paths, event, pathname)

    return await resolve(event)
}

function localizeURL(paths, event, pathname) {
    let localizedURL

    try {
        localizedURL = getLocalizedURL(paths, event.url.searchParams, event.locals.lang)
    } catch (error) {
        event.locals.manualError = error

        return
    }

    const requestURL = pathname + decodeURI(event.url.search)

    console.log('requestURL:', requestURL);
    console.log('localizedURL:', localizedURL);

    if (localizedURL !== requestURL)
        throw redirect(307, encodeURI(localizedURL))
}