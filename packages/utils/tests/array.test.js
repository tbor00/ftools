import { copyArray, deleteElementByIndex, isArray, isEmptyArray } from '../src/array'

describe('deleteElementByIndex function ----> works correctly', () => {
    const arr = ['0', '1', '2', '3']

    it('the functions is defined', () => {
        expect(deleteElementByIndex).toBeDefined()
    })

    it('return a new array with the element at the index removed', () => {
        expect(deleteElementByIndex(arr, 0)).toStrictEqual(['1', '2', '3'])
    })

    it('if the index of the array passed by parameter is -1, it must return the same array as the one passed by parameter', () => {
        expect(deleteElementByIndex(arr, -1)).toStrictEqual(arr)
    })
})

describe('isArray function ----> works correctly', () => {
    it('the functions is defined', () => {
        expect(isArray).toBeDefined()
    })
    it('we pass an object to our function and it should return false', () => {
        expect(isArray({ name: 'James' })).toBeFalsy()
    })

    it('we pass an array to our function and it should return true', () => {
        expect(isArray([{ name: 'James' }])).not.toBeFalsy()
    })
})

describe('copyArray function  ----> works correctly', () => {
    const arrayToCopy = ['lemon', 'apple', 'watermelon']

    it('the functions is defined', () => {
        expect(copyArray).toBeDefined()
    })

    it('if we pass it an array it returns a copy', () => {
        expect(copyArray(arrayToCopy)).toStrictEqual(arrayToCopy)
    })

    it('we could mutate elements of one without the other being affected', () => {
        const copyArr = copyArray(arrayToCopy)
        copyArr[0] = 'Lemon'

        expect(copyArr[0]).toBe('Lemon')
        expect(arrayToCopy).not.toBe('Lemon')
        expect(copyArr).not.toStrictEqual(arrayToCopy)
    })
})

describe('isEmptyArray function ----> works correctly', () => {
    it('the functions is defined', () => {
        expect(isEmptyArray).toBeDefined()
    })

    it('if we pass an empty array and it should return true', () => {
        expect(isEmptyArray([])).toBe(true)
    })

    it('if we pass an array with elements and it should return false', () => {
        expect(isEmptyArray(['fruits'])).toBeFalsy()
    })
})
