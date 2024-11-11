import {langs, paths, searchParams, searchValues} from "$lib/js/server/localization/localization.constants.server.js";
import {
    localizedPaths,
    localizedSearchParams,
    localizedSearchValues,
    langs as arrLangs
} from "$lib/js/server/localization/localization.translations.data.server.js";

export function init() {
    constructLangs()
    constructTranslationTables(localizedPaths, paths, true)
    constructTranslationTables(localizedSearchParams, searchParams)
    constructTranslationTables(localizedSearchValues, searchValues)
}

function constructLangs() {
    for (const lang of arrLangs)
        langs.set(lang, { lang })
}

function constructTranslationTables(source, target, forPaths) {
    for (const [key, value] of source.entries())
        for (let i = 0; i < value.length; i++) {
            let content = new Map([['lang', key]])
            const _value = value[i]

            if (forPaths)
                if (_value.dynamic)
                    content.set('dynamic', 1)

            for (const [key2, value2] of source.entries()) {
                if (key2 === key)
                    continue

                content.set(key2, value2[i].name)
            }

            target.set(_value.name, content)
        }
}