import { useCallback, useEffect, useState } from 'react'

const VISIBILITY_STATE_SUPPORTED = typeof window === 'object'?'visibilityState' in document: false;

function isWindowVisible() {
    return !VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden'
}

/**
 * Returns whether the window is currently visible to the user.
 */
export default function useIsWindowVisible() {
    const [focused, setFocused] = useState(isWindowVisible())
    const listener = useCallback(() => {
        setFocused(isWindowVisible())
    }, [setFocused])

    useEffect(() => {
        if (!VISIBILITY_STATE_SUPPORTED) return undefined

        document.addEventListener('visibilitychange', listener)
        return () => {
            document.removeEventListener('visibilitychange', listener)
        }
    }, [listener])

    return focused
}
