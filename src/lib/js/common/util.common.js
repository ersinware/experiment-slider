export function getPaths(pathname) {
    return pathname.split('/').filter(value => {
        if (value)
            return value
    })
}

export function randomID() {
    const random = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (random() + random() + "-" + random() + "-" + random() + "-" + random() + "-" + random() + random() + random())
}