import { methods, request } from '../src/base'

const goodResponse = {
    data: {
        site: 'Google',
        mocked: true
    }
}

const axios = jest.fn(() => {
    return Promise.resolve(goodResponse)
})

global.fetch = jest.fn(() => {
    return Promise.resolve(goodResponse)
})

describe('methods object work correctly', () => {
    test('exits all keys on object methods', () => {
        expect(Object.keys(methods).length).toBe(5)
    })

    test('all methods contain the values ​​they must have', () => {
        expect(methods.GET).toBe('GET')
        expect(methods.POST).toBe('POST')
        expect(methods.PUT).toBe('PUT')
        expect(methods.PATCH).toBe('PATCH')
        expect(methods.DELETE).toBe('DELETE')
    })
})

describe('request function work correctly', () => {
    beforeEach(() => {
        axios.mockClear()
        fetch.mockClear()
    })

    test('it should work with fetch', async () => {
        const resolv = await request(methods.GET, 'google.com', undefined, {})
        expect(Object.keys(resolv.data).length).toBe(2)
    })

    test('it should work the same with axios', async () => {
        const resolv = await request(methods.GET, 'google.com', undefined, {}, axios)
        expect(Object.keys(resolv.data).length).toBe(2)
    })
})
