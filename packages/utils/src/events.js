/**
 * It returns the left and top position of the center of the element that was clicked
 * @param {any} event - any - The event that triggered the function.
 * @returns An object with two properties, left and top.
 */
const getLeftAndTopScreen = (event) => {
    const rect = event.target.getBoundingClientRect()
    const left = rect.x + rect.width / 2
    const top = rect.y + window.scrollY
    return { left, top }
}

/**
 * It returns a new object that has the same properties as the event object, but with a getter that
 * returns the property value
 * @param event - The event object that is passed to the event handler.
 * @returns A proxy object that has a get method that returns the value of the property that is being
 * accessed.
 */
const getEvent = (event) => {
    const evt = new Proxy(event, {
        get: (eventParams, prop) => {
            return eventParams[prop]
        }
    })
    return evt
}

/**
 * It returns the event target with a proxy that allows you to access the event target's properties
 * @param event - The event object that is passed to the event handler.
 * @returns A proxy object that is a copy of the event.target object.
 */
const getEventTarget = (event) => {
    const target = new Proxy(event.target, {
        get: (targetParams, prop) => {
            return targetParams[prop]
        }
    })
    return target
}

/**
 * It returns the text content of the event's target, if the event and target exist
 * @param event - The event object that was passed to the event handler.
 * @returns The text content of the event target.
 */
const getEventTextContent = (event) => {
    const { textContent } = getEventTarget(event)
    return textContent
}

export { getLeftAndTopScreen, getEventTarget, getEvent, getEventTextContent }
