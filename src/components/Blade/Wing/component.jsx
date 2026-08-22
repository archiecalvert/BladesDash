import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { easeIn, motion, useAnimationControls } from "motion/react"

import "./component.css"
import WingDeselected from "../../../assets/Blade/blade_left_opaque.png"
import WingSelected from "../../../assets/Blade/blade_left_transparent.png"
import { sleep }  from "../../../utils/sleep"
import { GetDimensions }  from "../../../utils/getWindowDimensions"
import {BLADE_BACKGROUND_SWIPEIN_TIME,
        BLADE_BACKGROUND_Z_INDEX,
        BLADE_ANIMATION_KEYFRAME_DURATION
    }  from "../../../utils/constants"
import { SIDES } from "../../../utils/enums"


export function Wing({
    title = "<placeho>",
    startIndex,
    maximumIndex,
    pageActiveIndex
}) {
    const BLADE_WIDTH = 55;// 42;

    const controls = useAnimationControls();
    const [currentIndex, setCurrentIndex] = useState(startIndex)
    const [activeIndex, setActiveIndex] = useState(pageActiveIndex)
    const [isSelected, setIsSelected] = useState(currentIndex == activeIndex);

    const [x, setX] = useState(130);
    const [ration, setRation] = useState(1);
    const [bladeWidth, setBladeWidth] = useState(ration * BLADE_WIDTH);

    /**
     * Function which extracts the top width where the curve begins on the blade
     * @returns width, ration
     */
    function getBackgroundInnerSideCoord() {
        const widthClient = document.getElementById("blade-background-left").getBoundingClientRect().width
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
        
        const DURATION = 0.25;
        if(left) {
            await controls.start({zIndex: 0, x: -bladeWidth, transition: {duration: 0.1, ease: "easeInOut"}})
            await sleep(BLADE_BACKGROUND_SWIPEIN_TIME * 1000 + 10)
            await controls.start({zIndex: BLADE_BACKGROUND_Z_INDEX - 1, x: 0, transition: {duration: DURATION, ease: "easeInOut"}})  
            await controls.start({zIndex: BLADE_BACKGROUND_Z_INDEX + 1})  
        }
        else {
            await controls.start({zIndex: 0, x: bladeWidth, scaleX: -1, transition: {duration: 0.1, ease: "easeInOut"}})
            await sleep(BLADE_BACKGROUND_SWIPEIN_TIME * 1000 + 10)
            await controls.start({zIndex: BLADE_BACKGROUND_Z_INDEX - 1, x: 0, scaleX: -1, transition: {duration: DURATION, ease: "easeInOut"}})
            await controls.start({zIndex: BLADE_BACKGROUND_Z_INDEX + 1})
        }
    }

    async function SetBladePosition(duration = 0.2, width) {
        
        let offsetX = (currentIndex - 1) * width
        let offsetY = (activeIndex -currentIndex) * 12;
        
        if (currentIndex <= activeIndex) {
            offsetX = (currentIndex - 1) * width
            offsetY = (activeIndex - currentIndex) * 12;
            
        }
        else {
            offsetX = -(maximumIndex - currentIndex) * width;
            offsetY = currentIndex * 12 - activeIndex * 12;
        }
        await controls.start({x: offsetX, y: offsetY, scaleX: currentIndex <= activeIndex ? 1 : -1, transition: {duration: duration, ease: "easeInOut"}});
    }

    function ResizeHandler() {
        const {width, ration} = getBackgroundInnerSideCoord()
        setX(document.getElementById("blade-background-left").getBoundingClientRect().width - ration * 83)
        setRation(ration)
        setBladeWidth(ration * BLADE_WIDTH);
        SetBladePosition(0, ration * BLADE_WIDTH)
    }
    
    window.addEventListener("resize", ResizeHandler);


    useEffect(() => {
        async function onStart() {
            const {width, ration} = getBackgroundInnerSideCoord()
            await InitSetBladesInfrontOfBackground(currentIndex <= activeIndex);
            await sleep(100)
            await SetBladePosition(0.2, ration * BLADE_WIDTH)
        }
        
        ResizeHandler();
        onStart();
    }, [])


    return (
        <motion.div
            className="blade-wing"
            style={{
                left:   currentIndex <= activeIndex   ? x : "unset",
                right: !(currentIndex <= activeIndex) ? x : "unset",
                top: 0,
                zIndex: 4
            }}
            animate={controls}
        >
            <img
                className="blade-wing-image"
                src={currentIndex == activeIndex ? WingSelected : WingDeselected}
            />

            <div className="blade-wing-title-anchor">
                <p style={!(currentIndex <= activeIndex ) ? {transform: "scaleX(-1) rotate(90deg) translateY(35px)"} : {}} className="blade-wing-title">
                    {title}
                </p>
            </div>
        </motion.div>
    );
}