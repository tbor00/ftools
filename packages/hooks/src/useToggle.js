import { useMemo, useState } from 'react'

/**
 * It returns a state and an object with functions to toggle, set, setLeft and setRight
 * @param [defaultValue=false] - The default value of the toggle.
 * @param reverseValue - The value to toggle to. If not provided, it will be the opposite of the
 * defaultValue.
 * @returns An array with two elements. The first element is the state, the second element is an object
 * with four properties.
 */
export default function useToggle(defaultValue = false, reverseValue) {
    const [state, setState] = useState(defaultValue)

    const actions = useMemo(() => {
        const reverseValueOrigin = reverseValue === undefined ? !defaultValue : reverseValue

        return {
            toggle: () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue)),
            set: (value) => setState(value),
            setLeft: () => setState(defaultValue),
            setRight: () => setState(reverseValueOrigin)
        }
    }, [])

    return [state, actions]
}
