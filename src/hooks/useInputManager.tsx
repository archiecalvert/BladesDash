import {
    RIGHT_KEYS,
    LEFT_KEYS,
    UP_KEYS,
    DOWN_KEYS,
    BLADE_COUNT,
    THROTTLE_INPUTS,
    BLADE_SWIPE_ANIMATION_DURATION,
} from "../utils/constants"
import throttle from "lodash/throttle"
import { useRef, useEffect } from "react";
import { fromGlobalStore } from "../stores/globalStore";
import { fromMenuStore } from "../stores/menuStore";


export function useInputManager() {
    const REPEAT_SPEED = BLADE_SWIPE_ANIMATION_DURATION * 1000 + 100
    const REPEAT_PERIOD = BLADE_SWIPE_ANIMATION_DURATION * 1000 + 100

    const heldKeys = useRef<Record<string, boolean>>({})
    const repeatTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const repeatInterval = useRef<ReturnType<typeof setTimeout> | null>(null)

    const setCurrentPage = fromGlobalStore(state => state.setCurrentPage)
    const currentPage = fromGlobalStore(state => state.currentPage)
    const incrementTabIndex = fromMenuStore(state => state.incrementTabIndex)
    const decrementTabIndex = fromMenuStore(state => state.decrementTabIndex)
    const initialAnimationCompleted = fromGlobalStore(state => state.initialAnimationCompleted)
    const menuTransitionInProgress = fromGlobalStore(state => state.menuTransitionInProgress)

    useEffect(() => {
        function fireAssociatedKeyEvents(key: string) {
            if (RIGHT_KEYS.includes(key)) {
                setCurrentPage(prev => Math.min(BLADE_COUNT, prev + 1))
            }
            if (LEFT_KEYS.includes(key)) {
                setCurrentPage(prev => Math.max(1, prev - 1))
            }
            if (DOWN_KEYS.includes(key)) {
                incrementTabIndex(currentPage)
            }
            if(UP_KEYS.includes(key)) {
                decrementTabIndex(currentPage)
            }
        }
        
        if (!initialAnimationCompleted) return

        const throttleFireAssociatedKeyEvents = THROTTLE_INPUTS ?
            throttle(fireAssociatedKeyEvents, 0.3):
            fireAssociatedKeyEvents

        function handleKeyDown(e: KeyboardEvent) {
            if (heldKeys.current[e.key]) return

            heldKeys.current[e.key] = true

            throttleFireAssociatedKeyEvents(e.key)

            repeatTimer.current = setTimeout(() => {
                repeatInterval.current = setInterval(() => {
                    if (heldKeys.current[e.key]) throttleFireAssociatedKeyEvents(e.key)
                }, REPEAT_SPEED) // repeat speed
            }, REPEAT_PERIOD) // time taken to repeat
        }

        function handleKeyUp(e: KeyboardEvent) {
            heldKeys.current[e.key] = false
            clearTimeout(repeatTimer.current ?? -1)
            clearInterval(repeatInterval.current ?? -1)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
            clearTimeout(repeatTimer.current ?? -1)
            clearInterval(repeatInterval.current ?? -1)
        }
    }, [
        initialAnimationCompleted,
        menuTransitionInProgress,
        currentPage,
        incrementTabIndex,
        decrementTabIndex,
        setCurrentPage
    ])
}