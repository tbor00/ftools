/**
 * It takes a function as an argument and returns a function that caches the result of the original
 * function
 * @param fnCallback - The function that we want to memoize.
 * @returns A function that takes in a number and returns the fibonacci number at that index.
 */
export function memoized(fnCallback) {
    let cache = {}
    return (args) => {
        let n = args[0]
        if (n in cache) {
            console.log('getting data from cache')
            return cache[n]
        } else {
            console.log('calculating result...', n)
            let result = fnCallback(n)
            cache[n] = result
            return result
        }
    }
}
