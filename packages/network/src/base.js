const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
}

/**
 * Receives an object and deletes the properties that are empty or invalid
 *
 * @param source The object that needs to be cleaned
 *
 * @return response body cleaned, ready to be sended to the HTTP Client.
 */

const cleanConfigHttp = (source) => {
    let target = {}
    Object.keys(source).forEach((key) => {
        if (source[key] != null && source[key] !== undefined) {
            target = { ...target, [key]: source[key] }
        }
    })
    return target
}

/**
 * It takes a method, a url, a body, and an options object, and returns a fetch request
 * @param method - The HTTP method to use.
 * @param url - The URL to make the request to.
 * @param body - The body of the request.
 * @param options - {
 * @returns A function that takes in 4 parameters and returns a fetch call.
 */
const implWithFetch = (method, url, body, options) => {
    const fetchOptions = {
        methods: method,
        body: JSON.stringify(body),
        params: options?.params,
        headers: options?.headers,
        withCredentials: options?.withCredentials,
        responseType: options?.responseType,
        signal: options?.signal,
        timeout: 0
    }

    const cleanOptions = cleanConfigHttp(fetchOptions)

    return fetch(url, cleanOptions)
}

/**
 * It takes a method, url, body, options, and middleware function, and returns the middleware function
 * with the cleaned config
 * @param method - The HTTP method to use.
 * @param url - The URL to make the request to.
 * @param body - The body of the request.
 * @param options - {
 * @param middleware - This is the function that will be called to make the request.
 * @returns A function that takes in a middleware function and returns a promise.
 */
const implWithAxios = (method, url, body, options, middleware) => {
    const dirtyConfig = {
        method,
        url,
        data: body,
        params: options?.params,
        headers: options?.headers,
        withCredentials: options?.withCredentials,
        responseType: options?.responseType,
        signal: options?.signal,
        timeout: 0
    }

    const cleanConfig = cleanConfigHttp(dirtyConfig)

    return middleware(cleanConfig)
}

/**
 * It takes a method, a url, a body, some options, and a middleware, and returns a promise
 * @param method - The HTTP method to use (GET, POST, PUT, DELETE, etc.)
 * @param url - The URL to make the request to.
 * @param body - The body of the request.
 * @param [options] - an object that contains the following properties:
 * @param [middleware] - The middleware to use. This can be either fetch or axios.
 * @returns A function that takes in a method, url, body, options, and middleware.
 */
const request = (method, url, body, options = {}, middleware = fetch) => {
    if (middleware === fetch) {
        return implWithFetch(method, url, body, options)
    }
    return implWithAxios(method, url, body, options, middleware)
}

export { methods, cleanConfigHttp, request, implWithFetch, implWithAxios }
