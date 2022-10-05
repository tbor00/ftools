/**
 * If the value is not null and the type of the value is an object, then return true, otherwise return
 * false.
 * @param {unknown} value - The value to check.
 */
export const isObject = (value) => value !== null && typeof value === 'object'

/**
 * It returns true if the object is empty, false if it's not
 * @param {unknown} obj - The object to check if it's empty.
 * @returns {boolean} A boolean value.
 */
export const objectIsEmpty = (obj) => {
    const objTmp = obj
    for (const prop in objTmp) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false
        }
    }
    return JSON.stringify(obj) === JSON.stringify({})
}
