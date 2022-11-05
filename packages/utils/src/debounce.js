/**
 * It returns a function that will call the callback function after the wait time has passed, but if
 * the returned function is called again before the wait time has passed, it will clear the timer and
 * start the wait time over again.
 * @param callback - The function to be called after the wait time has passed.
 * @param wait - The number of milliseconds to wait before calling the callback function.
 * @returns A function that takes in arguments and calls the callback function with those arguments
 * after a certain amount of time.
 */
export function miniDebounce(callback, wait) {
    if (callback) throw new Error('callback parameter is required')
    if (wait) throw new Error('wait parameter is required')

    let timerId
    return (...args) => {
        clearTimeout(timerId)
        timerId = window.setTimeout(() => {
            callback(...args)
        }, wait)
    }
}
