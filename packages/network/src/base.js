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
 * It takes a method, url, body, options, and a middleware function, and returns a promise
 * @param method - The HTTP method to use.
 * @param url - The URL to make the request to.
 * @param body - The body of the request.
 * @param options - {
 * @param [middleware] - This is the fetch function.
 * @returns A function that takes in a config object and returns a promise.
 */
const request = (method, url, body, options, middleware = fetch) => {
    const dirtyConfig = {
        method,
        url,
        data: body,
        params: options.params,
        headers: options.headers,
        withCredentials: options.withCredentials,
        responseType: options.responseType,
        signal: options.signal,
        timeout: 0
    }

    const cleanConfig = cleanConfigHttp(dirtyConfig)
    return middleware(cleanConfig)
}

export { methods, cleanConfigHttp, request }
