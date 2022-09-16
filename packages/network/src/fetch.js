import { methods, request } from './base'

const get = async (url, options) => {
    return request(methods.GET, url, undefined, options)
}

const post = async (url, body, options) => {
    return request(methods.POST, url, body, options)
}

const put = async (url, body, options) => {
    return request(methods.PUT, url, body, options)
}

const patch = async (url, body, options) => {
    return request(methods.PATCH, url, body, options)
}

const deleteReq = async (url, options) => {
    return request(methods.DELETE, url, undefined, options)
}

const connection = {
    get,
    post,
    put,
    patch,
    delete: deleteReq
}

export { get, post, put, patch, connection }
