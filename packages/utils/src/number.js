/**
 * It returns true if the given number is a real number, otherwise it returns false
 * @param {number} num - number - This is the number that we're checking to see if it's a real number.
 * @returns {boolean} A function that takes a number as an argument and returns a boolean.
 */
export const isRealNumber = (num) => {
    return typeof num === 'number' && !isNaN(num)
}

/**
 * It takes a number, rounds it to a given precision, and returns a string
 * @param {number} num - The number to be formatted.
 * @param {number} precision - The number of decimal places to round to.
 * @param {string} [placeholder=--] - The value to return if the number is not a real number.
 * @returns {string} - number parsed at float
 */
export const float = (num, precision, placeholder = '--') => {
    const accuracy = isRealNumber(precision) ? precision : 2
    if (!isRealNumber(num)) {
        return placeholder
    }
    return num.toFixed(accuracy)
}

/**
 * It takes a number, a precision, and a placeholder, and returns a string that is the number
 * multiplied by 100, rounded to the precision, and appended with a percent sign
 * @param {number} num - The number to be formatted
 * @param {number} precision - The number of decimal places to be displayed.
 * @param {string} [placeholder=--] - The placeholder to be returned when the number is not a real
 * number.
 * @returns {string}
 */
export const percentage = (num, precision, placeholder = '--') => {
    const accuracy = isRealNumber(precision) ? precision : 2
    if (!isRealNumber(num)) {
        return placeholder
    }
    return `${(num * 100).toFixed(accuracy)}%`
}
