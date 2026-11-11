
import {
    useState,
    useEffect,
    useRef,
    useLayoutEffect,
    useCallback
} from "react"
import { motion, useAnimationControls } from "motion/react"

import WingDeselected from "../../assets/Blade/blade_left_opaque.png"
import WingSelected from "../../assets/Blade/blade_left_transparent.png"
import WingTransition from "../../assets/Blade/blade_left_blank.png"
import WingMask from "../../assets/Blade/blade_mask.png"

import WingDeselectedFlipped from "../../assets/Blade/blade_left_opaque_flipped.png"
import WingSelectedFlipped from "../../assets/Blade/blade_left_transparent_flipped.png"
import WingMaskFlipped from "../../assets/Blade/blade_mask_flipped.png"

import {
    BLADE_BACKGROUND_SWIPEIN_DURATION,
    BLADE_SLIDER_BACKGROUND_Z_INDEX,
    BLADE_SWIPE_ANIMATION_DURATION,
    BLADE_WHITESPACE_LEFT,
    BLADE_WHITESPACE_RIGHT,
    BLADE_COUNT,
    BLADE_UNHIDE_ANIMATION_DURATION,
    BLADE_UNSTACK_ANIMATION_DURATION
} from "../../utils/constants"

import { sleep } from "../../utils/sleep"
import { fromGlobalStore } from "../../stores/globalStore"

import "./component.css"

export function Wing({
    title = "<placeholder>",
    index,
    color = "#ff0000",
}) {
    const controls = useAnimationControls()

    const openPageIndex = fromGlobalStore(state => state.currentPage)
    const backgroundRef = fromGlobalStore(state => state.bladeBackgroundRef)
    const setGlobalRef = fromGlobalStore(state => state.setWing)
    const setInitialAnimationCompleted = fromGlobalStore(state => state.setInitialAnimationCompleted)


    const [isMiddleTransitionState, setIsMiddleTransitionState] = useState(false)
    const [isLeft, setIsLeft] = useState(index <= openPageIndex)
    const [hasSettled, setHasSettled] = useState(true)

    const selfRef = useRef(null)
    const [selfElement, setSelfElement] = useState(null)
    const animationId = useRef(0)
    const previousOpenIndex = useRef(openPageIndex)
    const initialised = useRef(false)

    const NORMAL_SCALE = 1.00
    const SELECTED_SCALE = 1.05
    
    // ===========================================================================
    // ================================= HELPERS =================================
    // ===========================================================================

    /**
     * Gets the width of the blade element.
     * @returns The width of the blade element.
     */
    function getSelfWidth() {
        return selfRef.current?.offsetWidth ?? 0
    }

    function getTargetScale() {
        return index === openPageIndex && hasSettled ? SELECTED_SCALE : NORMAL_SCALE
    }

    /**
     * Gets the width of the blade element after scaling.
     * @returns The width of the blade element, scaled.
     */
    function getBladeScaledWidth(scale = getTargetScale()) {
        return getSelfWidth() * scale
    }

    function getBackgroundXPosition() {
        if (!backgroundRef || !selfRef.current) return 0

        const backgroundWidth = backgroundRef.getBoundingClientRect().width
        const offset = window.innerWidth * 0.038

        return (
            backgroundWidth -
            offset -
            getBladeScaledWidth() * (1 - BLADE_WHITESPACE_LEFT)
        )
    }

    // Returns the absolute X position of the blade's base.
    function getBaseX(left) {
        const backgroundX = getBackgroundXPosition()

        return left
            ? backgroundX
            : window.innerWidth - backgroundX - getSelfWidth()
    }

    function calculateZIndex(left, current) {
        return BLADE_SLIDER_BACKGROUND_Z_INDEX +
            (left ? current : BLADE_COUNT - current)
    }

    const setRefs = useCallback((element) => {
        selfRef.current = element
        setSelfElement(element)
        setGlobalRef(index - 1, element)
    }, [index, setGlobalRef])

    function getOffsetPosition(i, cur) {
        const bladeWidth = getBladeScaledWidth() *
            ((1 - BLADE_WHITESPACE_LEFT) - BLADE_WHITESPACE_RIGHT)

        if (i > cur) {
            const offsetX = (BLADE_COUNT - i) * bladeWidth
            const offsetY = (BLADE_COUNT - cur - i + 1) * 5

            return [-offsetX, -offsetY]
        }

        const offsetX = -(i - 2) * bladeWidth - getSelfWidth() * 0.05
        const offsetY = (cur - i - 1) * 10

        if (i == cur) {
            const adjustX = (i / BLADE_COUNT) * (SELECTED_SCALE - 1) * (offsetX * 0.85)
            const adjustY = (i / BLADE_COUNT) * (SELECTED_SCALE - 1) * (offsetY * 0.55)
            return [-offsetX + adjustX, offsetY - adjustY]
        }

        return [-offsetX, offsetY]
    }

    /** 
     * Returns the final absolute position of the blade.
     * @param index the index which we want to calculate the offset for
     * @param currentOpenPage the currently active page index
     * */ 
    function getTargetPosition(index, currentOpenPage) {
        const left = index <= currentOpenPage
        const baseX = getBaseX(left)
        const [offsetX, offsetY] = getOffsetPosition(index, currentOpenPage)

        return { x: baseX + offsetX, y: offsetY, left }
    }

    /**
     * Gets the current position of the blade in the DOM. This is
     * used when the animation is interrupted, and can be used to recover.
     */
    function getCurrentPosition() {
        if (!selfRef.current) {
            return { x: 0, y: 0 }
        }

        const transform = window.getComputedStyle(
            selfRef.current.parentElement
        ).transform

        const matrix = transform === "none"
            ? new DOMMatrixReadOnly()
            : new DOMMatrixReadOnly(transform)

        return {
            x: matrix.m41,
            y: matrix.m42
        }
    }

    // ===========================================================================
    // ================================ ANIMATIONS ===============================
    // ===========================================================================

    /**
     * Function which sets the wing to its offset position when idle. This does not set the
     * actual page position.
     * @param {number} duration 
     */
    async function animBladesIdlePosition(duration = 0.2) {
        const target = getTargetPosition(index, openPageIndex)

        await controls.start({
            x: target.x,
            y: target.y,
            transition: {
                duration,
                ease: "linear"
            }
        })
    }

    /**
    * Updates the blades to move from being stacked ontop of eachother, to set in their default position.
    */
    async function animBladesInitHideUnhide() {
        const left = index <= openPageIndex
        const baseX = getBaseX(left)

        // hide behind blade for now behind the background
        await controls.start({
            x: baseX + (index > openPageIndex ? 0.5 : -0.5) * getSelfWidth(),
            zIndex: calculateZIndex(left, index) - BLADE_COUNT * 2,
            transition: { duration: 0 }
        })

        // wait for the blade backgrounds to enter and settle
        await sleep(BLADE_BACKGROUND_SWIPEIN_DURATION * 1000)
        // Move into the open position.
        await controls.start({ x: baseX, transition: { duration: BLADE_UNHIDE_ANIMATION_DURATION, ease: "linear" }})
        // set the z order
        await controls.start({ zIndex: calculateZIndex(left, index), transition: { duration: 0 }})
    }

    // ===========================================================================
    // =============================== STATE LOGIC ===============================
    // ===========================================================================

    useLayoutEffect(() => {
        if (!backgroundRef || !selfElement) return

        let cancelled = false
        let started = false

        async function initialise() {
            if (started || cancelled) return

            const backgroundBounds = backgroundRef.getBoundingClientRect()
            const selfBounds = selfElement.getBoundingClientRect()

            if (backgroundBounds.width <= 0 ||
                backgroundBounds.height <= 0 ||
                selfBounds.width <= 0 ||
                selfBounds.height <= 0) {
                return
            }

            started = true
            await animBladesInitHideUnhide()

            if (cancelled) return

            await animBladesIdlePosition(BLADE_UNSTACK_ANIMATION_DURATION)

            if (cancelled) return

            initialised.current = true
            animateScale(true)
            setInitialAnimationCompleted()
            
        }

        function handleResize() {
            if (!initialised.current) {
                initialise()
                return
            }

            animBladesIdlePosition(0)
        }

        const observer = new ResizeObserver(handleResize)

        observer.observe(backgroundRef)
        observer.observe(selfElement)
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
    }, [backgroundRef, selfElement])

    /**
     * Function which causes the blade to scale based if its selected and has settled
     * @param {boolean} settled Whether the blade animation has completed
     */
    async function animateScale(settled = hasSettled) {
        await controls.start({
            scale: getTargetScale(settled),
            transition: {
                scale: {
                    duration: BLADE_SWIPE_ANIMATION_DURATION,
                    ease: "easeOut"
                }
            }
        })
    }

    useEffect(() => {
        if (!initialised.current) return

        const id = ++animationId.current

        // Stop the previous animation
        controls.stop()
        const isCancelled = () => animationId.current !== id

        const oldOpen = previousOpenIndex.current
        previousOpenIndex.current = openPageIndex

        const { x: currentX, y: currentY } = getCurrentPosition()

        /**
         * Responsible for animating the blades into their correct positions
         */
        async function transition() {
            setHasSettled(false)
            setIsMiddleTransitionState(false)
            animateScale(false)

            const opening = oldOpen < index && openPageIndex >= index
            const closing = oldOpen >= index && openPageIndex < index

            if (opening || closing) {
                const target = getTargetPosition(index, openPageIndex)

                const newX = target.x
                const newY = target.y

                const distance = newX - currentX

                const x1 = currentX + distance * 0.25
                const x2 = currentX + distance * 0.75

                // Start at position of old animation
                controls.set({
                    x: currentX,
                    y: currentY,
                    zIndex: calculateZIndex(!opening, index)
                })

                // First quarter of the transition.
                await controls.start({x: x1, y: newY, transition: { duration: BLADE_SWIPE_ANIMATION_DURATION / 4, ease: "linear" }})

                if (isCancelled()) return

                setIsMiddleTransitionState(true)

                // Middle half of the transition.
                await controls.start({x: x2,y: newY,transition: { duration: BLADE_SWIPE_ANIMATION_DURATION / 2, ease: "linear" }})

                if (isCancelled()) return

                // prepare its z index
                controls.set({
                    zIndex: calculateZIndex(opening, index)
                })

                setIsLeft(opening)
                setIsMiddleTransitionState(false)

                // Final quarter of the transition.
                await controls.start({ x: newX, y: newY, transition: { duration: BLADE_SWIPE_ANIMATION_DURATION / 4, ease: "linear" }})
                
                if (isCancelled()) return

            } else {
                // Blade does not need to cross the screen.
                await animBladesIdlePosition(BLADE_SWIPE_ANIMATION_DURATION)

                if (isCancelled()) return
            }

            if (isCancelled()) return
            animateScale(true)
            setHasSettled(true)
            setIsMiddleTransitionState(false)
        }

        transition()

        return () => {
            animationId.current++
            controls.stop()
        }

    }, [index, openPageIndex])

    return (
        <motion.div
            className="blade-wing"
            style={{
                left: 0,
                top: 0,
                transformOrigin: !isLeft ? "left center" : "right center",
                filter: index === openPageIndex
                    ? "drop-shadow(-6px -2px 5px rgba(40,40,40,0.6)) drop-shadow(6px -2px 1px rgba(40,40,40,0.8))"
                    : "drop-shadow(-6px -2px 5px rgba(40,40,40,0.6)) drop-shadow(6px -2px 5px rgba(40,40,40,0.6))",
                }}
            animate={controls}
            initial={{scale: NORMAL_SCALE}}
        >
            <img
                ref={setRefs}
                className="blade-wing-image"
                id={`blade-wing-image-${index}`}
                src={
                    isMiddleTransitionState
                        ? WingTransition
                        : index === openPageIndex
                            ? (isLeft ? WingSelected : WingSelectedFlipped)
                            : (isLeft ? WingDeselected : WingDeselectedFlipped)
                }
                style={
                    !isMiddleTransitionState
                        ? {
                            backgroundColor: index === openPageIndex
                                ? color
                                : "rgb(205, 205, 205)",

                            maskImage: isLeft
                                ? `url(${WingMask})`
                                : `url(${WingMaskFlipped})`,
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                            maskSize: "100% 100%",

                            WebkitMaskImage: isLeft
                                ? `url(${WingMask})`
                                : `url(${WingMaskFlipped})`,
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskPosition: "center",
                            WebkitMaskSize: "100% 100%",
                        }
                        : {}
                }
            />

            <div className="blade-wing-title-anchor">
                {!isMiddleTransitionState && (
                    <p
                        style={!isLeft ? { transform: "rotate(90deg) translateY(2.4vh) translateX(-5%)" } : {} }
                        className="blade-wing-title"
                    >
                        {title}
                    </p>
                )}
            </div>
        </motion.div>
    )
}
