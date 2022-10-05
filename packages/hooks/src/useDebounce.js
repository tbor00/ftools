import { useEffect, useState, useRef } from 'react'

/**
 *  A custom hook that is used to delay the execution of a function.
 * @param {any} value - The value to debounce.
 * @param {number} waitTime - The number of milliseconds to delay.
 */
export default function (value, waitTime) {
    const [_value, setValue] = useState(value)
    const mountedRef = useRef(false)
    const timeRef = useRef(null)

    const cancel = () => window.clearTimeout(timeRef.current)

    useEffect(() => {
        cancel()
        timeRef.current = window.setTimeout(() => {
            setValue(value)
        }, waitTime)
    }, [value])

    useEffect(() => {
        mountedRef.current = true
        return cancel
    }, [])

    return [_value, cancel]
}
