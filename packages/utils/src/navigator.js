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

export { copyToClipBoard, getDeviceInformation }
