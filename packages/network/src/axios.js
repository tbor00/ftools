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

const HttpClient = {
    get,
    post,
    put,
    patch,
    delete: deleteReq
}

export default HttpClient
