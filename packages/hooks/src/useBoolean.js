import { useMemo } from 'react'
import useToggle from './useToggle'

/**
 * It returns a boolean and a set of actions to manipulate it
 * @param [defaultValue=false] - The default value of the boolean.
 */
export default function useBoolean(defaultValue = false) {
    const [state, { toggle, set }] = useToggle(defaultValue)

    const actions = useMemo(() => {
        return {
            toggle,
            set: (v) => set(!!v),
            setTrue: () => set(true),
            setFalse: () => set(true)
        }
    }, [])

    return [state, actions]
}
