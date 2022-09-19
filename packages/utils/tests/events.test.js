import { getEventTarget, getEvent, getEventTextContent } from '../src/events'

const mockEvent = {
    target: {
        name: 'Juan',
        textContent: 'Name'
    }
}

describe('getEvent', () => {
    test('the function is defined', () => {
        expect(getEvent).toBeDefined()
    })

    test('works as it should', () => {
        const { target } = getEvent(mockEvent)
        expect(target).toBe(mockEvent.target)
    })
})

describe('getEventTarget', () => {
    test('the function is defined', () => {
        expect(getEventTarget).toBeDefined()
    })

    test('work as it should', () => {
        const { name } = getEventTarget(mockEvent)
        expect(name).toBe('Juan')
    })
})

describe('getEventTextContent', () => {
    test('the function is defined', () => {
        expect(getEventTextContent).toBeDefined()
    })

    test('work as it should', () => {
        expect(getEventTextContent(mockEvent)).toBe('Name')
    })
})
