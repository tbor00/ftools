/**
 * If the length of the array is 0, return true, otherwise return false.
 * @param {array} arr - The array to check
 * @returns {boolean}
 */
const isEmptyArray = (arr) => {
    return arr.length === 0
}

/**
 * Return true if the argument is an array, otherwise return false.
 * @param {array} arr - The array to check.
 * @returns {boolean}
 */
const isArray = (arr) => {
    return Array.isArray(arr)
}

/**
 * It takes an array as an argument, and returns a new array with the same values as the original array
 * @param {array} arr - The array to copy.
 * @returns {array} -  the copy of the array
 */
const copyArray = (arr) => {
    return [...arr]
}

/**
 * Given an array and an index, return a new array with the element at the given index removed.
 * @param {array} array - the array to delete element
 * @param {number} index -  The index of the element to remove.
 * @returns {array} -  array with the element at the index removed.
 */
const deleteElementByIndex = (array, index) => {
    if (index !== -1) {
        array?.splice(index, 1)
    }
    return array
}

export { deleteElementByIndex, isEmptyArray, copyArray, isArray }
