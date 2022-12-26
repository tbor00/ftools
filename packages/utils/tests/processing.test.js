import { removeAccents, bytesConvert, fileSizeByteToMb, getQueryParamsWithProxy, isUndef, isFunction, isBoolean, isString } from '../src/processing'

describe('processing module', () => {
    describe('processing files work correctly', () => {
        test('bytesConver is defined', () => {
            expect(bytesConvert).toBeDefined()
        })

        test('bytesConver work as it should', () => {
            expect(bytesConvert(500)).toBe('500 Bytes')
            expect(bytesConvert(80000)).toBe('78.1 KB')
            expect(bytesConvert(100000000)).toBe('95.4 MB')
        })

        test('fileSizeByteToMb is defined', () => {
            expect(fileSizeByteToMb).toBeDefined()
            expect(fileSizeByteToMb(150000000)).toBe(143)
        })

        test('fileSizeByteToMb work as it should', () => {
            expect(fileSizeByteToMb(150000000)).toBe(143)
        })
    })

    test('removeAccents method work as it should', () => {
        expect(removeAccents('Ananá')).toBe('Anana')
    })

    test('getQueryParams work correctly', () => {
        global.window = {
            location: {
                search: {
                    id: '2000'
                }
            }
        }
        const { id, isReal } = getQueryParamsWithProxy()
        expect(id).toBe('2000')
        expect(isReal).toBeNull()
    })

    describe('isUndef', () => {
        test('when the parameter is undefined, should return true', () => {
            expect(isUndef(undefined)).toBeTruthy()
        })

        test('when the parameter is not undefined, should return false', () => {
            expect(isUndef({})).toBeFalsy()
        })
    })

    describe('isString', () => {
        test('when the parameter is string, should return true', () => {
            expect(isString('Im a string')).toBeTruthy()
        })

        test('when the parameter is not string, should return false', () => {
            expect(isString({})).toBeFalsy()
        })
    })

    describe('isBoolean', () => {
        test('when the parameter is boolean, should return true', () => {
            expect(isBoolean(true)).toBeTruthy()
            expect(isBoolean(false)).toBeTruthy()
        })

        test('when the parameter is not boolean, should return false', () => {
            expect(isBoolean({})).toBeFalsy()
            expect(isBoolean('')).toBeFalsy()
            expect(isBoolean(undefined)).toBeFalsy()
        })
    })

    describe('isFunction', () => {
        test('when the parameter is a function, should return true', () => {
            const fn = () => console.warn('This is a mock function')
            expect(isFunction(fn)).toBeTruthy()
        })

        test('when the parameter is not a function, should return false', () => {
            expect(isFunction({})).toBeFalsy()
            expect(isFunction('')).toBeFalsy()
            expect(isFunction(true)).toBeFalsy()
        })
    })
})
