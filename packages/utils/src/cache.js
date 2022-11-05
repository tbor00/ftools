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
