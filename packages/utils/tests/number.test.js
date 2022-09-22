import { isRealNumber, percentage, float } from '../src/number'

describe('isRealNumber helper', () => {
    it('if we pass a string it should return false', () => {
        expect(isRealNumber('32')).toBeFalsy()
    })

    it('if we pass a number it should return true', () => {
        expect(isRealNumber(2)).toBe(true)
    })
})

describe('percentage helper', () => {
    it('when we pass it valid values it should return x percentage', () => {
        expect(percentage(0.1, 1, '--')).toBe('10.0%')
    })

    it('when we pass invalid values it should return the placeholder we are passing as a parameter', () => {
        expect(percentage('000.2', 1, '--')).toBe('--')
    })
})

describe('float helper', () => {
    it('when we pass it valid values it should return x float', () => {
        expect(float(10, 1, '--')).toBe('10.0')
    })

    it('if we change the presicion to 2 it should give us back n.xx', () => {
        expect(float(10, 2, '--')).toBe('10.00')
    })

    it('when we pass invalid values it should return the placeholder we are passing as a parameter', () => {
        expect(float('000.2', 1, '--')).toBe('--')
    })
})
