
import { useEffect, useState, useCallback, useRef } from "react"
import { motion, useAnimationControls } from "motion/react"

import {
    BLADE_WHITESPACE_LEFT,
    BLADE_WHITESPACE_RIGHT,
    MENU_Z_INDEX,
    BLADE_SWIPE_ANIMATION_DURATION,
    BLADE_BACKGROUND_SWIPEIN_DURATION,
    BLADE_UNSTACK_ANIMATION_DURATION,
    BLADE_UNHIDE_ANIMATION_DURATION
} from "../../utils/constants"

import { sleep } from "../../utils/sleep"
import "./component.css"
import { fromGlobalStore } from "../../stores/globalStore"

export function MenuContentContainer({
    index = 2,
    offsetIndex = 2,
    children
}) {
    const controls = useAnimationControls()

    const [width, setWidth] = useState(0)
    const [offset, setOffset] = useState(0)

    const bladeWing = fromGlobalStore(state => state.wings[index - 1])
    const bladeBackground = fromGlobalStore(state => state.bladeBackgroundRef)
    const initialAnimationCompleted = fromGlobalStore(state => state.initialAnimationCompleted)

    const initialAnimationRef = useRef(initialAnimationCompleted)

    useEffect(() => {
        initialAnimationRef.current = initialAnimationCompleted
    }, [initialAnimationCompleted])

    const getOffsetPosition = useCallback(() => {
        if (!bladeWing) return 0

        const bladeWidth = bladeWing.getBoundingClientRect().width

        return (
            (offsetIndex - 2) *
            bladeWidth *
            ((1 - BLADE_WHITESPACE_LEFT) - BLADE_WHITESPACE_RIGHT)
        )
    }, [bladeWing, offsetIndex])

    const updateDimensions = useCallback(() => {
        if (!bladeWing || !bladeBackground) return false

        const wingBounds = bladeWing.getBoundingClientRect()
        const backgroundBounds = bladeBackground.getBoundingClientRect()

        if (wingBounds.width <= 0 || backgroundBounds.width <= 0) {
            return false
        }

        const finalWidth =
            window.innerWidth -
            2 * backgroundBounds.width -
            window.innerWidth * 0.11

        setWidth(finalWidth)
        setOffset(getOffsetPosition())

        return true
    }, [bladeWing, bladeBackground, getOffsetPosition])

    useEffect(() => {
        if (!bladeWing || !bladeBackground) return

        let cancelled = false
        let started = false

        async function fadeIn() {
            // Ensure the menu starts hidden.
            controls.set({ opacity: 0 })

            const delay = (
                initialAnimationRef.current
                    ? BLADE_SWIPE_ANIMATION_DURATION
                    : BLADE_BACKGROUND_SWIPEIN_DURATION + BLADE_UNHIDE_ANIMATION_DURATION
            ) * 1000

            await sleep(delay)

            if (cancelled) return

            await controls.start({
                opacity: 1,
                transition: {
                    duration: BLADE_UNSTACK_ANIMATION_DURATION,
                    delay: 0
                }
            })
        }

        function initialise() {
            if (cancelled || started) return
            if (!updateDimensions()) return

            started = true
            fadeIn()
        }

        function handleResize() {
            if (!started) {
                initialise()
                return
            }

            updateDimensions()
        }

        const observer = new ResizeObserver(handleResize)

        observer.observe(bladeWing)
        observer.observe(bladeBackground)

        window.addEventListener("resize", handleResize)

        initialise()

        const frame = requestAnimationFrame(initialise)

        return () => {
            cancelled = true
            cancelAnimationFrame(frame)
            observer.disconnect()
            window.removeEventListener("resize", handleResize)
            controls.stop()
        }
    }, [
        bladeWing,
        bladeBackground,
        updateDimensions,
        controls
    ])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            style={{
                width,
                marginLeft: offset,
                "--menu-content-container-z-index": MENU_Z_INDEX + 1
            }}
            className="menu-content-container"
        >
            {children}
        </motion.div>
    )
}
