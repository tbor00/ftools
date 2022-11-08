import { getUserAgent } from './navigator'

/**
 * If the self object is an object and self.self is the same as self, then we're in a browser.
 * @returns {boolean} A boolean value.
 */
export function isBrowser() {
    return typeof self === 'object' && self.self === self
}

/**
 * If the navigator object exists and its product property is ReactNative, then we're in React Native.
 * @returns {boolean} A boolean value.
 */
export function isReactNative() {
    return typeof navigator === 'object' && navigator['product'] === 'ReactNative'
}

/**
 * If the user agent string contains the word 'Electron', then we're in an Electron app.
 * @returns {boolean} A boolean value.
 */
export function isElectron() {
    return getUserAgent().indexOf('Electron/') >= 0
}

/**
 * If the user agent string contains the string 'MSIE' or 'Trident/', then return true, otherwise
 * return false.
 * @returns {boolean} A boolean value.
 */
export function isInternetExplorer() {
    return getUserAgent().indexOf('MSIE') >= 0 || getUserAgent().indexOf('Trident/') >= 0
}

/**
 * If the user agent string contains the word 'Chrome', return true, otherwise return false.
 * @returns {boolean} A boolean value.
 */
export function isChrome() {
    return getUserAgent().includes('Chrome')
}

/**
 * "If the navigator object is defined and the cookieEnabled property is true, return true, otherwise
 * return false."
 *
 * The navigator object is a property of the window object. It contains information about the browser.
 * The cookieEnabled property is a boolean that indicates whether cookies are enabled in the browser
 * @returns {boolean} A function that returns a boolean value.
 */
export function areCookiesEnabled() {
    if (navigator !== 'undefined' || navigator.cookieEnabled) return true

    return false
}
