import { removeAccents, bytesConvert, fileSizeByteToMb, getQueryParamsWithProxy } from '../src/processing'

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
