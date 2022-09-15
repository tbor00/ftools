/**
 * It returns the left and top position of the center of the element that was clicked
 * @param {any} event - any - The event that triggered the function.
 * @returns An object with two properties, left and top.
 */
const getLeftAndTopScreen = (event) => {
    const rect = event.target.getBoundingClientRect()
    const left = rect.x + rect.width / 2
    const top = rect.y + window.scrollY
    return { left, top }
}

export { getLeftAndTopScreen }
