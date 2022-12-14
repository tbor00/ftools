/**
 * It takes a string as an argument and returns a promise that resolves when the string is copied to
 * the clipboard
 * @param {string} copy - The string you want to copy to the clipboard.
 * @returns {Promise<void>} A promise that resolves when the text has been written to the clipboard.
 */
const copyToClipBoard = async (copy) => {
    return navigator.clipboard.writeText(copy)
}

/**
 * It returns a promise that resolves to the connection information of the device
 * @returns The connection object
 */
const getDeviceInformation = async () => {
    return navigator.connection()
}

/**
 * It returns a promise that resolves to the battery object
 * @returns A promise
 */
const getBattery = async () => {
    const battery = await navigator.getBattery()
    return battery
}

/**
 * If the navigator object is undefined or the userAgent property is not a string, return an empty
 * string, otherwise return the userAgent property.
 * @returns The user agent string of the browser.
 */
const getUserAgent = () => {
    if (typeof navigator === 'undefined' && typeof navigator['userAgent'] !== 'string') return ''
    return navigator['userAgent']
}

export { copyToClipBoard, getDeviceInformation, getBattery, getUserAgent }
