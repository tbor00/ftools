import { useState, useRef, useCallback } from 'react'

/**
 * It returns a state, a setState, and a getState function that always returns the current state
 * @param initialState - The initial state of the component.
 * @returns A function that returns the current state.
 */
export default function useGetState(initialState) {
    const [state, setState] = useState(initialState)
    const stateRef = useRef(state)
    stateRef.current = state

    const getState = useCallback(() => stateRef.current, [])

    return [state, setState, getState]
}
