import { langs, paths, searchParams, searchValues } from '$lib/js/server/localization/localization.constants.server';

export const prerender = 'auto';

export function load({ locals }) {
    return {
        langs,
        paths,
        searchParams,
        searchValues,
        theme: locals.theme,
        lang: locals.lang
    }
}