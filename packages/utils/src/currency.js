/**
 * It takes a string value, removes the dollar sign and commas, and then multiplies the result by 100
 * @param value - The value of the input field.
 * @returns the value of the cents variable multiplied by 100.
 */
export const formatCents = (value) => {
    let cents = value.replace(/[$,]/g, '')
    return cents * 100
}

/**
 * It takes a number and returns a string with the number formatted as a currency
 * @param value - The value to be formatted.
 * @param type - The locale to use.
 * @returns A function that takes two parameters, value and type.
 */
export const formatCurrency = (value, type) => {
    return new Intl.NumberFormat(type ?? 'en-US').format(value)
}

/**
 * It takes a number and returns a string with the number formatted with two decimal places
 * @param value - The value to be formatted
 * @param type - The locale to use.
 * @returns A function that takes two parameters, value and type.
 */
export const formatWithDecimal = (value, type) => {
    return new Intl.NumberFormat(type ?? 'en-US', { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value)
}
