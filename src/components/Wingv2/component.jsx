import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { easeIn, motion, transform, useAnimationControls } from "motion/react"

import "./component.css"
import WingDeselected from "../../assets/Blade/blade_left_opaque.png"
import WingSelected from "../../assets/Blade/blade_left_transparent.png"
import WingTransition from "../../assets/Blade/blade_left_blank.png"
import {BLADE_BACKGROUND_SWIPEIN_DURATION,
        BLADE_SLIDER_BACKGROUND_Z_INDEX,
        BLADE_ANIMATION_KEYFRAME_DURATION,
        BLADE_SWIPE_ANIMATION_DURATION,
    }  from "../../utils/constants"
import {sleep}  from "../../utils/sleep"
import { SIDES } from "../../utils/enums"

/**
 * @param title the title which is displayed on the wing
 * @param index the index which the blade is
 * @param openPageIndex the index which page is open/visible
 * @param maximumIndex
 * @param backgroundRef a reference to the background gradient behind the wings
 */
export function Wingv2({
    title = "<placeholder>",
    index,
    openPageIndex,
    maximumIndex,
    backgroundRef
}) {
    const controls = useAnimationControls();
    
    const WHITESPACE_LEFT = 0.403
    const WHITESPACE_RIGHT = 0.18548387

    const [initing, setIniting] = useState(true)
    const [isMiddleTransitionState, setIsMiddleTransitionState] = useState(false)
    const [inTransition, setIsInTransition] = useState(false)
    const [baseX, setBaseX] = useState(0);
    const [_r, _sr] = useState();

    const selfRef = useRef(null)
    const previousOpenIndex = useRef(openPageIndex)

    // Function which causes a component rerender due to state change
    function Rerender() { _sr(null) }

    // ===========================================================================
    // ============================= EVENT LISTENERS =============================
    // ===========================================================================
    async function Resize() {
        if (index > openPageIndex) { setBaseX(window.innerWidth - _getBackgroundXPosition())}
        else { setBaseX(_getBackgroundXPosition()) }

        await animBladesIdlePosition(0)
    }

    // ===========================================================================
    // ================================= HELPERS =================================
    // ===========================================================================
    // Gets the X position of the blade background
    function _getBackgroundXPosition() {
        function _getBackgroundPositionOffset() { return window.innerWidth * 0.035 }
    
        if(!backgroundRef.current) return;
        
        return backgroundRef.current.getBoundingClientRect().width - _getBackgroundPositionOffset() - getSelfWidth() * (1 - WHITESPACE_LEFT)
    }

    function getSelfWidth() {
        if (!selfRef) return
        return selfRef.current.getBoundingClientRect().width
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

    // ===========================================================================
    // =============================== ANIMATIONS ================================
    // ===========================================================================
    async function animBladesIdlePosition(duration=0.2) {
        const [x, y] = getOffsetPosition(index, openPageIndex)
        await controls.start({x: x, y: y, transition: {duration: duration, ease: "linear"}})
    }

    async function animBladesInitHideUnhide() {
        
        // hide behind blade for now
        await controls.start({x: (index > openPageIndex ? 1 : -1) * getSelfWidth(), transition: {duration: 0, ease: "linear"}})
        await sleep(BLADE_BACKGROUND_SWIPEIN_DURATION * 1000)
        // move onto screen
        await controls.start({x: 0, transition: {duration: 0.2, ease: "linear"}})
        // place on top of background
        await controls.start({zIndex: BLADE_SLIDER_BACKGROUND_Z_INDEX})
    }


    // ===========================================================================
    // =============================== STATE LOGIC ===============================
    // ===========================================================================
    useEffect(() => {
        window.addEventListener("resize", Resize)

        async function f() {
            Resize()

            await animBladesInitHideUnhide()
            await animBladesIdlePosition()
            setIniting(false)
        }
        f()

    }, [])

    useEffect(() => {
        async function f() {
            const oldOpen = previousOpenIndex.current;
            await animBladesIdlePosition(0)

            // if <- and is now open
            if (oldOpen === index - 1 && openPageIndex == index) {
                setBaseX(0)
                const [oldX, oldY] = getOffsetPosition(oldOpen + 1, oldOpen)
                const [newX, newY] = getOffsetPosition(index, openPageIndex)
                await controls.start({x: (window.innerWidth - _getBackgroundXPosition()) + oldX, y: oldY, transition: {duration: 0.00001,  ease: "linear"}})
                await controls.start({x: _getBackgroundXPosition() + newX, y: newY, transition: {duration: BLADE_SWIPE_ANIMATION_DURATION, ease: "linear"}})

                setBaseX(_getBackgroundXPosition())
                await animBladesIdlePosition(0)
            }
            // if -> and no longer open
            else if (openPageIndex < oldOpen && index == openPageIndex + 1) {
                setBaseX(0)
                const [oldX, oldY] = getOffsetPosition(oldOpen, oldOpen)
                const [newX, newY] = getOffsetPosition(index, openPageIndex)
                await controls.start({x: _getBackgroundXPosition() + oldX, y: oldY, transition: {duration: 0.00001,  ease: "linear"}})
                await controls.start({x: window.innerWidth - _getBackgroundXPosition() + newX, y: newY, transition: {duration: BLADE_SWIPE_ANIMATION_DURATION, ease: "linear"}})

                setBaseX(window.innerWidth - _getBackgroundXPosition())
                await animBladesIdlePosition(0)
            }
            // if blade is not transitioning across screen
            else {
                await animBladesIdlePosition(BLADE_SWIPE_ANIMATION_DURATION)
            }
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
                zIndex: 4,
                scaleX: index > openPageIndex ? -1.1 : 1.1,
                scaleY: 1.1
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

            />

            <div className="blade-wing-title-anchor">
                {!inTransition && <p style={!(index <= openPageIndex ) ? {transform: `scaleX(-1) rotate(90deg) translateY(3.2vh)`} : {}} className="blade-wing-title">
                    {title}
                </p>}
            </div>
        </motion.div>
    );
}