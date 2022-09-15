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
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}

export { getQueryParamsWithProxy, fileSizeByteToMb, bytesConvert }
