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
 * It takes a method, url, body, options, and middleware, and returns a request
 * @param method - The HTTP method to use.
 * @param url - The URL to make the request to.
 * @param body - The body of the request.
 * @param [options] - {
 * @param middleware - A function that takes in the config object and returns a promise. This is used
 * to allow for custom middleware to be used.
 * @returns A function that takes in a method, url, body, options, and middleware.
 */
const request = (method, url, body, options = {}, middleware) => {
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

    if (!middleware) {
        delete cleanConfig.url
        cleanConfig.body = JSON.stringify(body)
        return fetch(url, cleanConfig)
    }

    return middleware(cleanConfig)
}

export { methods, cleanConfigHttp, request }
