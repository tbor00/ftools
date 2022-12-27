import { connection, deleteReq, get, patch, post, put } from '../src/fetch'

describe('fetch module', () => {
    test('connection contains all methods', () => {
        expect(connection.hasOwnProperty('get')).toBeTruthy()
        expect(connection.hasOwnProperty('post')).toBeTruthy()
        expect(connection.hasOwnProperty('put')).toBeTruthy()
        expect(connection.hasOwnProperty('patch')).toBeTruthy()
        expect(connection.hasOwnProperty('delete')).toBeTruthy()
    })

    test('get should be defined', () => {
        expect(get).toBeDefined()
    })

    test('post should be defined', () => {
        expect(post).toBeDefined()
    })

    test('put should be defined', () => {
        expect(put).toBeDefined()
    })

    test('patch should be defined', () => {
        expect(patch).toBeDefined()
    })

    test('delete should be defined', () => {
        expect(deleteReq).toBeDefined()
    })
})
