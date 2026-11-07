import {
    RIGHT_KEYS,
    LEFT_KEYS,
    UP_KEYS,
    DOWN_KEYS,
    BLADE_COUNT,
    THROTTLE_INPUTS,
    BLADE_SWIPE_ANIMATION_DURATION,
} from "./constants"
import throttle from "lodash/throttle"
import { useRef, useEffect } from "react";
import { useGlobalStore } from "../stores/globalStore";


export function InputManager() {
    const heldKeys = useRef({})
    const repeatTimer = useRef(null)
    const repeatInterval = useRef(null)

    const setCurrentPage = useGlobalStore((state) => state.setCurrentPage)

    useEffect(() => {
        function fireAssociatedKeyEvents(key) {
            if (RIGHT_KEYS.includes(key)) {
                setCurrentPage(prev => Math.min(BLADE_COUNT, prev + 1))
            }
            if (LEFT_KEYS.includes(key)) {
                setCurrentPage(prev => Math.max(1, prev - 1))
            }
        }

        const throttleFireAssociatedKeyEvents = THROTTLE_INPUTS ?
            throttle(fireAssociatedKeyEvents,BLADE_SWIPE_ANIMATION_DURATION * 1000 * 1.75):
            fireAssociatedKeyEvents

        function handleKeyDown(e) {
            if (heldKeys.current[e.key]) return

            heldKeys.current[e.key] = true

            throttleFireAssociatedKeyEvents(e.key)

            repeatTimer.current = setTimeout(() => {
                repeatInterval.current = setInterval(() => {
                    if (heldKeys.current[e.key]) throttleFireAssociatedKeyEvents(e.key)
                }, BLADE_SWIPE_ANIMATION_DURATION * 1000 + 100) // repeat speed
            }, BLADE_SWIPE_ANIMATION_DURATION * 1000 + 100) // time taken to repeat
        }

        function handleKeyUp(e) {
            heldKeys.current[e.key] = false
            clearTimeout(repeatTimer.current)
            clearInterval(repeatInterval.current)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
            clearTimeout(repeatTimer.current)
            clearInterval(repeatInterval.current)
        }
    }, [])
}