
import {
    RIGHT_KEYS,
    LEFT_KEYS,
    UP_KEYS,
    DOWN_KEYS,
    BLADE_COUNT,
    BLADE_SWIPE_ANIMATION_DURATION,
} from "../utils/constants"

import throttle from "lodash/throttle"
import { useRef, useEffect } from "react"
import { fromGlobalStore } from "../stores/globalStore"
import { fromMenuStore } from "../stores/menuStore"

export function useInputManager() {
    const REPEAT_SPEED = BLADE_SWIPE_ANIMATION_DURATION * 1000
    const REPEAT_PERIOD = BLADE_SWIPE_ANIMATION_DURATION * 1000

    const heldKeys = useRef<Record<string, boolean>>({})
    const repeatTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const repeatInterval = useRef<ReturnType<typeof setInterval> | null>(null)

    const setCurrentPage = fromGlobalStore(state => state.setCurrentPage)
    const currentPage = fromGlobalStore(state => state.currentPage)

    const incrementTabIndex = fromMenuStore(state => state.incrementTabIndex)
    const decrementTabIndex = fromMenuStore(state => state.decrementTabIndex)

    const initialAnimationCompleted = fromGlobalStore(state => state.initialAnimationCompleted)

    const currentPageRef = useRef(currentPage)

    useEffect(() => {
        currentPageRef.current = currentPage
    }, [currentPage])

    useEffect(() => {
        if (!initialAnimationCompleted) return

        function fireAssociatedKeyEvents(key: string) {
            if (RIGHT_KEYS.includes(key)) {
                setCurrentPage(prev => Math.min(BLADE_COUNT, prev + 1))
            }

            if (LEFT_KEYS.includes(key)) {
                setCurrentPage(prev => Math.max(1, prev - 1))
            }

            if (DOWN_KEYS.includes(key)) {
                incrementTabIndex(currentPageRef.current)
            }

            if (UP_KEYS.includes(key)) {
                decrementTabIndex(currentPageRef.current)
            }
        }

        const throttledFire = throttle(fireAssociatedKeyEvents,300,{ leading: true, trailing: false })

        function handleKeyDown(e: KeyboardEvent) {
            if (heldKeys.current[e.key]) return

            heldKeys.current[e.key] = true

            throttledFire(e.key)

            repeatTimer.current = setTimeout(() => {
                repeatInterval.current = setInterval(() => {
                    if (heldKeys.current[e.key]) {
                        throttledFire(e.key)
                    }
                }, REPEAT_SPEED)
            }, REPEAT_PERIOD)
        }

        function handleKeyUp(e: KeyboardEvent) {
            heldKeys.current[e.key] = false

            clearTimeout(repeatTimer.current ?? undefined)
            clearInterval(repeatInterval.current ?? undefined)

            repeatTimer.current = null
            repeatInterval.current = null

            throttledFire.cancel()
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)

            clearTimeout(repeatTimer.current ?? undefined)
            clearInterval(repeatInterval.current ?? undefined)

            throttledFire.cancel()
        }
    }, [
        initialAnimationCompleted,
        setCurrentPage,
        incrementTabIndex,
        decrementTabIndex,
        REPEAT_SPEED,
        REPEAT_PERIOD
    ])
}
