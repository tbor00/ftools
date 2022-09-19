import axios from 'axios'
import { methods, request } from './base'

const get = async (url, options = {}) => {
    return request(methods.GET, url, undefined, options, axios)
}

const post = async (url, body, options = {}) => {
    return request(methods.POST, url, body, options, axios)
}

const put = async (url, body, options = {}) => {
    return request(methods.PUT, url, body, options, axios)
}

const patch = async (url, body, options = {}) => {
    return request(methods.PATCH, url, body, options, axios)
}

const deleteReq = async (url, options = {}) => {
    return request(methods.DELETE, url, undefined, options, axios)
}

/**
 * It creates an axios instance with the baseUrl and moreOptions passed in
 * @param baseUrl - The base URL of the API.
 * @param moreOptions - This is an object that contains any additional options you want to pass to the
 * axios instance.
 * @returns An axios instance
 */
const createInstance = (baseUrl, moreOptions) => {
    return axios.create({
        baseURL: baseUrl,
        ...moreOptions
    })
}

const HttpClient = {
    get,
    post,
    put,
    patch,
    delete: deleteReq
}

export default HttpClient
export { createInstance }
