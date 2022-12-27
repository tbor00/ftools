import HttpClient, { createInstance } from '../src/axios'

describe('axios module', () => {
    test('HttpClient contains all methods', () => {
        expect(HttpClient.hasOwnProperty('get')).toBeTruthy()
        expect(HttpClient.hasOwnProperty('post')).toBeTruthy()
        expect(HttpClient.hasOwnProperty('put')).toBeTruthy()
        expect(HttpClient.hasOwnProperty('patch')).toBeTruthy()
        expect(HttpClient.hasOwnProperty('delete')).toBeTruthy()
    })

    describe('ftools instance', () => {
        const apiUrl = 'https://ftools-suit.api'
        const ftoolsInstance = createInstance(apiUrl)

        test('should be defined', () => {
            expect(ftoolsInstance).toBeDefined()
        })

        test('the baseUrl should be the one defined above ', () => {
            const expectedUrl = ftoolsInstance.defaults.baseURL
            expect(expectedUrl).toBe(apiUrl)
        })

        test('all methods should be defined', () => {
            expect(ftoolsInstance.get).toBeDefined()
            expect(ftoolsInstance.post).toBeDefined()
            expect(ftoolsInstance.put).toBeDefined()
            expect(ftoolsInstance.patch).toBeDefined()
            expect(ftoolsInstance.delete).toBeDefined()
        })
    })
})
