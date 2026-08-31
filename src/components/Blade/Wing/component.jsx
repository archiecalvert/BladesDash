import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { easeIn, motion, useAnimationControls } from "motion/react"

import "./component.css"
import WingDeselected from "../../../assets/Blade/blade_left_opaque.png"
import WingSelected from "../../../assets/Blade/blade_left_transparent.png"
import WingTransition from "../../../assets/Blade/blade_left_blank.png"
import { sleep }  from "../../../utils/sleep"
import { GetDimensions }  from "../../../utils/getWindowDimensions"
import {BLADE_BACKGROUND_SWIPEIN_DURATION,
        BLADE_SLIDER_BACKGROUND_Z_INDEX,
        BLADE_ANIMATION_KEYFRAME_DURATION,
        BLADE_SWIPE_ANIMATION_DURATION
    }  from "../../../utils/constants"
import { SIDES } from "../../../utils/enums"

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
    backgroundRef
}) {
    const BLADE_SCALE = 1.1;
    const BLADE_WIDTH = 57 * BLADE_SCALE;

    const [isMiddleTransitionState, setIsMiddleTransitionState] = useState(false)
    const [inTransition, setIsInTransition] = useState(false)
    const controls = useAnimationControls();
    const [isSelected, setIsSelected] = useState(index == openPageIndex);
    const wingRef = useRef(null)
    const [x, setX] = useState(130);
    const [offsetX, setOffsetX] = useState(0)
    const [ration, setRation] = useState(1);
    const [bladeWidth, setBladeWidth] = useState(ration * BLADE_WIDTH);

    const previousOpenIndex = useRef(openPageIndex)

    /**
     * Function which extracts the top width where the curve begins on the blade
     * @returns width, ration
     */
    function getBackgroundInnerSideCoord() {
        if(!backgroundRef.current) return
        const widthClient = backgroundRef.current.getBoundingClientRect().width
        const widthFile = 256
        const ration = widthClient / widthFile
        const width = (widthClient) * ration
        
        return {width, ration}
    }

    /* 
                |======================================|
                |------------- ANIMATIONS -------------|
                |======================================|
    */

    /**
     * Function which plays the start animation where the blades go from behind the background to in-front
     * and stacked.
     * @param left 
     */
    async function InitSetBladesInfrontOfBackground(left) {
        
        const DURATION = 0.2;
        if(left) {
            await controls.start({zIndex: 0, x: -bladeWidth, transition: {duration: 0.1, ease: "easeInOut"}})
            await sleep(BLADE_BACKGROUND_SWIPEIN_DURATION * 1000 + 10)
            await controls.start({zIndex: BLADE_SLIDER_BACKGROUND_Z_INDEX - 1, x: 0, transition: {duration: DURATION, ease: "easeInOut"}})  
            await controls.start({zIndex: BLADE_SLIDER_BACKGROUND_Z_INDEX + 1})  
        }
        else {
            await controls.start({zIndex: 0, x: bladeWidth, scaleY: BLADE_SCALE, scaleX: -1 * BLADE_SCALE, transition: {duration: 0.1, ease: "easeInOut"}})
            await sleep(BLADE_BACKGROUND_SWIPEIN_DURATION * 1000 + 10)
            await controls.start({zIndex: BLADE_SLIDER_BACKGROUND_Z_INDEX - 1, x: 0, scaleY: BLADE_SCALE, scaleX: -1 * BLADE_SCALE, transition: {duration: DURATION, ease: "easeInOut"}})
            await controls.start({zIndex: BLADE_SLIDER_BACKGROUND_Z_INDEX + 1})
        }
    }

    async function SetBladePosition(duration = 0.2, width) {
        
        let offsetX = (index - 1) * width
        let offsetY = (openPageIndex -index) * 12;
        
        if (index <= openPageIndex) {
            offsetX = (index - 1) * width
            offsetY = (openPageIndex - index) * 12;
            
        }
        else {
            offsetX = -(maximumIndex - index) * width;
            offsetY = index * 12 - openPageIndex * 12;
        }
        setOffsetX(offsetX)
        await controls.start({x: offsetX, y: offsetY, scaleY: BLADE_SCALE, scaleX: index <= openPageIndex ? 1 * BLADE_SCALE : -1 * BLADE_SCALE, transition: {duration: duration, ease: "easeInOut"}});
    }

    function ResizeHandler(duration=0) {
        if(!backgroundRef.current) return
        const {width, ration} = getBackgroundInnerSideCoord()
        setX(index <= openPageIndex ? 
            backgroundRef.current.getBoundingClientRect().width - ration * 85 - window.innerWidth * 0.035:
            window.innerWidth - backgroundRef.current.getBoundingClientRect().width + ration * 85 + window.innerWidth * 0.035
        )
        setRation(ration)
        setBladeWidth(ration * BLADE_WIDTH);
        SetBladePosition(duration, ration * BLADE_WIDTH)
    }
    

    // =================================================
    // ==          KEYBOARD TRANSITION LOGIC          ==
    // =================================================

    async function transitionBlade(openPagePrev, openPageCurrent) {
        const D = BLADE_SWIPE_ANIMATION_DURATION
        const {width, ration} = getBackgroundInnerSideCoord()
        // if moved ->
        if(openPageCurrent < openPagePrev && index == openPageCurrent + 1) {
            setIsInTransition(true)
            const newOffsetX = -(maximumIndex - (index + 1)) * ration * BLADE_WIDTH;
            const newOffsetY = index * 12 - openPageIndex * 12;
            
            const finalOffset = (window.innerWidth - 2 * width) + newOffsetX
            await controls.start({x: finalOffset / 4, y: newOffsetY, scaleY: BLADE_SCALE, scaleX: 1 * BLADE_SCALE, transition: {duration: D / 4, ease: "linear"}})
            setIsMiddleTransitionState(true)
            await controls.start({x: finalOffset * 0.75, y: newOffsetY, scaleY: BLADE_SCALE, scaleX: 1 * BLADE_SCALE, transition: {duration: D / 2, ease: "linear"}})
            setIsMiddleTransitionState(false)
            await controls.start({scaleY: BLADE_SCALE, scaleX: -1 * BLADE_SCALE, transition: {duration: 0.001}})
            await controls.start({x: finalOffset, y: newOffsetY, scaleY: BLADE_SCALE, scaleX: -1 * BLADE_SCALE, transition: {duration: D / 4, ease: "linear"}})
            setIsInTransition(false)
            ResizeHandler()
        }
        // if moved <-
        else if(openPageCurrent > openPagePrev && index == openPageCurrent) {
            setIsInTransition(true)
            const newOffsetX = -((index - 2) * ration * BLADE_WIDTH)
            const newOffsetY = (openPageIndex - index) * 12;
            
            const finalOffset = (window.innerWidth - 2 * width) + newOffsetX
            await controls.start({x: -finalOffset / 4, y: newOffsetY, scaleY: BLADE_SCALE, scaleX: -1 * BLADE_SCALE, transition: {duration: D / 4, ease: "linear"}})
            setIsMiddleTransitionState(true)
            await controls.start({x: -finalOffset * 0.75, y: newOffsetY, scaleY: BLADE_SCALE, scaleX: -1 * BLADE_SCALE, transition: {duration: D / 2, ease: "linear"}})
            setIsMiddleTransitionState(false)
            await controls.start({scaleY: BLADE_SCALE, scaleX: 1 * BLADE_SCALE, transition: {duration: 0.001}})
            await controls.start({x: -finalOffset, y: newOffsetY, scaleY: BLADE_SCALE, scaleX: 1 * BLADE_SCALE, transition: {duration: D / 4, ease: "linear"}})
            ResizeHandler()
            setIsInTransition(false)
        }

        else {
            setIsMiddleTransitionState(false)
            ResizeHandler(D)
        }
    }

    useEffect(() => {
        async function f() {
            const oldOpen = previousOpenIndex.current;
            await transitionBlade(oldOpen, openPageIndex)
            previousOpenIndex.current = openPageIndex
        }
        f()

    }, [openPageIndex])


    // =================================================
    // ==                STARTUP LOGIC                ==
    // =================================================
    useEffect(() => {
        
        window.addEventListener("resize", ResizeHandler);
        async function onStart() {
            await ResizeHandler();
            const {width, ration} = getBackgroundInnerSideCoord()
            await InitSetBladesInfrontOfBackground(index <= openPageIndex);
            await sleep(10)
            await SetBladePosition(0.2, ration * BLADE_WIDTH)
        }
        
        onStart();
        return () => {
            window.removeEventListener("resize", ResizeHandler)
        }
    }, [])

    


    return (
        <motion.div
            className="blade-wing"
            style={{
                left: x,
                top: 0,
                zIndex: 4,
            }}
            animate={controls}
        >
            <img
                ref={wingRef}
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