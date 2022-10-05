/* It's a proxy that allows you to get the query parameters from the URL. */
const getQueryParamsWithProxy = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop)
    })
    return params
}

/**
 * It takes a file size in bytes and returns the file size in megabytes
 * @param {number} size - The size of the file in bytes
 * @returns A function that takes a number and returns a number.
 */
const fileSizeByteToMb = (size) => {
    return Math.round(size / 1024 / 1024)
}

/**
 * It converts bytes to a human readable format
 * @param {number} bytes - The number of bytes to convert.
 * @returns A function that takes a number and returns a string.
 */
const bytesConvert = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}

/**
 * It takes a string, converts it to a unicode string, and then removes all the accents
 * @param str - The string to be normalized.
 * @returns A function that takes a string as an argument and returns a string with the accents
 * removed.
 */
const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * If the type of the value is a function, return true, otherwise return false.
 * @param {unknown} value - The value to check.
 */
const isFunction = (value) => typeof value === 'function'

/**
 * IsString returns true if the value is a string, otherwise it returns false.
 * @param {unknown} value - The value to check
 */
const isString = (value) => typeof value === 'string'

/**
 * IsBoolean returns true if the value is a boolean, otherwise it returns false.
 * @param {unknown} value - The value to check.
 */
const isBoolean = (value) => typeof value === 'boolean'

/**
 * If the value is undefined, return true, otherwise return false.
 * @param {unknown} value - The value to check.
 */
const isUndef = (value) => typeof value === 'undefined'

export { getQueryParamsWithProxy, fileSizeByteToMb, bytesConvert, removeAccents, isFunction, isString, isBoolean, isUndef }
