import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { easeIn, motion, transform, useAnimationControls } from "motion/react"

import WingDeselected from "../../assets/Blade/blade_left_opaque.png"
import WingSelected from "../../assets/Blade/blade_left_transparent.png"
import WingTransition from "../../assets/Blade/blade_left_blank.png"
import WingMask from "../../assets/Blade/blade_mask.png"

import {BLADE_BACKGROUND_SWIPEIN_DURATION,
    BLADE_SLIDER_BACKGROUND_Z_INDEX,
    BLADE_ANIMATION_KEYFRAME_DURATION,
    BLADE_SWIPE_ANIMATION_DURATION,
}  from "../../utils/constants"
import {sleep}  from "../../utils/sleep"
import { SIDES } from "../../utils/enums"
import "./component.css"

/**
 * @param title the title which is displayed on the wing
 * @param index the index which the blade is
 * @param openPageIndex the index which page is open/visible
 * @param maximumIndex
 * @param backgroundRef a reference to the background gradient behind the wings
 */
export function Wing({
    title = "<placeholder>",
    index,
    openPageIndex,
    maximumIndex,
    backgroundRef,
    color="#ff0000"
}) {
    const controls = useAnimationControls();
    
    const WHITESPACE_LEFT = 0.403
    const WHITESPACE_RIGHT = 0.18548387

    const [initing, setIniting] = useState(true)
    const [isMiddleTransitionState, setIsMiddleTransitionState] = useState(false)
    const [inTransition, setIsInTransition] = useState(false)
    const [isLeft, setIsLeft] = useState(index <= openPageIndex)
    const [baseX, setBaseX] = useState(0);

    const selfRef = useRef(null)
    const previousOpenIndex = useRef(openPageIndex)
    
    // ===========================================================================
    // ============================= EVENT LISTENERS =============================
    // ===========================================================================
    async function Resize() {
        if (index > openPageIndex) { setBaseX(window.innerWidth - getBackgroundXPosition())}
        else { setBaseX(getBackgroundXPosition()) }

        await animBladesIdlePosition(0)
    }

    // ===========================================================================
    // ================================= HELPERS =================================
    // ===========================================================================
    // Gets the X position of the blade background
    function getBackgroundXPosition() {
        function _getBackgroundPositionOffset() { return window.innerWidth * 0.035 }
    
        if(!backgroundRef.current || !window) return;
        
        return backgroundRef.current.getBoundingClientRect().width - _getBackgroundPositionOffset() - getSelfWidth() * (1 - WHITESPACE_LEFT)
    }

    function getSelfWidth() {
        if (!selfRef.current) return
        return selfRef.current.getBoundingClientRect().width
    }

    function calculateZIndex(left, current) {
        return BLADE_SLIDER_BACKGROUND_Z_INDEX + (left ? current : maximumIndex - current)
    }
    /**
     * 
     * @param i the index which we want to calculate the offset for
     * @param cur the currently active page index
     */
    function getOffsetPosition(i, cur) {
        const bladeWidth = getSelfWidth() * ((1 - WHITESPACE_LEFT) - WHITESPACE_RIGHT)

        // if right
        if (i > cur) {
            const offsetX = (maximumIndex - i) * bladeWidth
            const offsetY = (maximumIndex - cur - i) * 5
            return [-offsetX, -offsetY]
        }
        else {
            const offsetX = -(i - 1) * bladeWidth
            const offsetY = (cur - i - 1) * 10
            return [-offsetX, offsetY]
        }
    }

    function waitForLayout() {
        return new Promise(resolve => {
            const check = () => {
                if (
                    backgroundRef.current &&
                    selfRef.current &&
                    backgroundRef.current.getBoundingClientRect().width > 0 &&
                    selfRef.current.getBoundingClientRect().width > 0
                ) {
                    resolve()
                } else {
                    requestAnimationFrame(check)
                }
            }

            check()
        })
    }

    // ===========================================================================
    // =============================== ANIMATIONS ================================
    // ===========================================================================
    async function animBladesIdlePosition(duration=0.2) {
        const [x, y] = getOffsetPosition(index, openPageIndex)
        await controls.start({x: x, y: y, transition: {duration: duration, ease: "linear"}})
    }

    async function animBladesInitHideUnhide() {
        
        // hide behind blade for now
        await controls.start({zIndex: calculateZIndex(isLeft, index) - maximumIndex * 2, x: (index > openPageIndex ? 1 : -1) * getSelfWidth(), transition: {duration: 0, ease: "linear"}})
        await sleep(BLADE_BACKGROUND_SWIPEIN_DURATION * 1000)
        // move onto screen
        await controls.start({x: 0, transition: {duration: 0.2, ease: "linear"}})
        // place on top of background
        await controls.start({zIndex: calculateZIndex(isLeft, index)})
    }


    // ===========================================================================
    // =============================== STATE LOGIC ===============================
    // ===========================================================================
    useEffect(() => {
        window.addEventListener("resize", Resize)

        async function f() {
            await waitForLayout()
            if (index > openPageIndex) { setBaseX(window.innerWidth - getBackgroundXPosition())}
            else { setBaseX(getBackgroundXPosition()) }
            console.log(getBackgroundXPosition())
            await animBladesInitHideUnhide()
            await animBladesIdlePosition()
            setIniting(false)
        }
        f()

    }, [])

    useEffect(() => {
        async function f() {
            const oldOpen = previousOpenIndex.current;

            // if <- and is now open
            if (oldOpen === index - 1 && openPageIndex == index) {
                setBaseX(0)
                setIsInTransition(true)
                const [oldX, oldY] = getOffsetPosition(oldOpen + 1, oldOpen)
                const [newX, newY] = getOffsetPosition(index, openPageIndex)

                const start = (window.innerWidth - getBackgroundXPosition()) + oldX
                const end = (getBackgroundXPosition() + newX)
                const total_distance = start - end
                const x1 = start - total_distance / 4
                const x2 = start - total_distance * 0.75

                await controls.start({zIndex: calculateZIndex(false, index), x: start, y: oldY, transition: {duration: 0.00000001,  ease: "linear"}})
                await controls.start({x: x1, y: newY, transition: {duration: BLADE_SWIPE_ANIMATION_DURATION / 4, ease: "linear"}})
                setIsMiddleTransitionState(true)
                await controls.start({zIndex: calculateZIndex(true, index), x: x2, y: newY, transition: {duration: BLADE_SWIPE_ANIMATION_DURATION / 2, ease: "linear"}})
                setIsMiddleTransitionState(false)
                setIsLeft(true)
                await controls.start({x: end, y: newY, transition: {duration: BLADE_SWIPE_ANIMATION_DURATION / 4, ease: "linear"}})

                setBaseX(getBackgroundXPosition())
                await animBladesIdlePosition(0)
                setIsInTransition(false)
            }
            // if -> and no longer open
            else if (openPageIndex < oldOpen && index == openPageIndex + 1) {
                setBaseX(0)
                setIsInTransition(true)
                const [oldX, oldY] = getOffsetPosition(oldOpen, oldOpen)
                const [newX, newY] = getOffsetPosition(index, openPageIndex)

                const start = getBackgroundXPosition() + oldX
                const end = window.innerWidth - getBackgroundXPosition() + newX
                const total_distance = end - start
                const x1 = start + total_distance / 4
                const x2 = end - total_distance / 4

                await controls.start({zIndex: calculateZIndex(true, index), x: start, y: oldY, transition: {duration: 0,  ease: "linear"}})
                await controls.start({x: x1, y: newY, transition: {duration: BLADE_SWIPE_ANIMATION_DURATION / 4, ease: "linear"}})
                setIsMiddleTransitionState(true)
                await controls.start({zIndex: calculateZIndex(false, index), x: x2, y: newY, transition: {duration: BLADE_SWIPE_ANIMATION_DURATION / 2, ease: "linear"}})
                setIsMiddleTransitionState(false)
                setIsLeft(false)
                await controls.start({x: end, y: newY, transition: {duration: BLADE_SWIPE_ANIMATION_DURATION / 4, ease: "linear"}})

                setBaseX(window.innerWidth - getBackgroundXPosition())
                await animBladesIdlePosition(0)
                setIsInTransition(false)
            }
            // if blade is not transitioning across screen
            else {
                await animBladesIdlePosition(BLADE_SWIPE_ANIMATION_DURATION)
            }
            await animBladesIdlePosition(0)
            setIsMiddleTransitionState(false)
            setIsInTransition(false)

            Resize()
            previousOpenIndex.current = openPageIndex
        }

        // disable transitions if the initial animation is loading
        if(!initing) f()
    }, [index, openPageIndex])

    return (
        <motion.div
            className="blade-wing"
            style={{
                left: baseX,
                top: 0,
                scaleX: !isLeft ? -1.1 : 1.1,
                scaleY: 1.1,
                filter: index == openPageIndex
                    ?  "drop-shadow(-12px -2px 5px rgba(40,40,40,0.6)) drop-shadow(12px -2px 5px rgba(40,40,40,0.8))"
                    :  "drop-shadow(-12px -2px 5px rgba(40,40,40,0.6)) drop-shadow(12px -2px 5px rgba(40,40,40,0.6))",
            }}
            animate={controls}
        >
            <img
                ref={selfRef}
                className="blade-wing-image"
                src={
                    isMiddleTransitionState
                        ? WingTransition
                        : (index == openPageIndex ? WingSelected : WingDeselected)
                }
                style={
                    !isMiddleTransitionState ?
                        {
                            backgroundColor: index == openPageIndex ? color : "rgb(205, 205, 205)",
                            
                            maskImage: `url(${WingMask})`,
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                            maskSize: "100% 100%",

                            WebkitMaskImage: `url(${WingMask})`,
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskPosition: "center",
                            WebkitMaskSize: "100% 100%",
                        }
                        : {}
                }
            />

            <div className="blade-wing-title-anchor">
                {!isMiddleTransitionState && <p style={!isLeft ? {transform: `scaleX(-1) rotate(90deg) translateY(3.0vh) translateX(-5%)`} : {}} className="blade-wing-title">
                    {title}
                </p>}
            </div>
        </motion.div>
    );
}