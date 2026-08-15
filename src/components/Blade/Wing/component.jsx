import { useState, useEffect } from "react"
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


export function Wing({
    title = "<placeho>",
    currentIndex,
    maximumIndex,
    pageActiveIndex
}) {
    const BLADE_WIDTH_PIXELS = 61
    const controls = useAnimationControls();
    const [isLeft, setIsLeft] = useState(true);
    const [isSelected, setIsSelected] = useState(false);

    const [x, setX] = useState(130);
    const [y, setY] = useState(0);
    function setPosition(x, y) { setX(x); setY(y) };

    async function LoadOnScreen() {

        if(currentIndex <= pageActiveIndex) {
            // wait for backgrounds to settle
            await controls.start({zIndex: -1})
            await sleep(BLADE_BACKGROUND_SWIPEIN_TIME * 1000)

            // appear from behind and then set to be on top
            await controls.start({zIndex: currentIndex })
            await controls.start({left: x + BLADE_WIDTH_PIXELS, transition: {duration: BLADE_ANIMATION_KEYFRAME_DURATION} })
            await controls.start({zIndex: BLADE_BACKGROUND_Z_INDEX + currentIndex })
    
            // set positions
            await controls.start({
                    left: x + (BLADE_WIDTH_PIXELS * (currentIndex - pageActiveIndex + 1)),
                    top: y - (25 * (currentIndex - pageActiveIndex)),
                    transition: {duration: 0.1 * ((pageActiveIndex - currentIndex))} 
            })
        }
        else {
            // wait for backgrounds to settle
            await controls.start({zIndex: -1, right: x})
            await sleep(BLADE_BACKGROUND_SWIPEIN_TIME * 1000)

            // appear from behind and then set to be on top
            await controls.start({zIndex: (maximumIndex - currentIndex) + 1})
            await controls.start({right: x + BLADE_WIDTH_PIXELS, transition: {duration: BLADE_ANIMATION_KEYFRAME_DURATION} })
            await controls.start({zIndex: BLADE_BACKGROUND_Z_INDEX + (maximumIndex - currentIndex) + 1})
    
            // set positions
            await controls.start({
                    right: x - (BLADE_WIDTH_PIXELS * (currentIndex - pageActiveIndex - 2)),
                    top: y - (15 * (pageActiveIndex - currentIndex)),
                    transition: {duration: 0.1 * (maximumIndex - currentIndex + 1)} 
            })
        }
    
    }

    // STARTUP LOGIC
    useEffect(() => {
        async function f() {
            setIsLeft(currentIndex <= pageActiveIndex)
            setIsSelected(currentIndex == pageActiveIndex)
            await LoadOnScreen()
        }

        f();
    }, [])

    return (
        <motion.div
            className="blade-wing"
            style={{
                transform: `scaleX(${isLeft ? 1 : -1})`,
                left: x,
                top: y
            }}
            animate={controls}
        >
            <img
                className="blade-wing-image"
                src={isSelected ? WingSelected : WingDeselected}
            />

            <div className="blade-wing-title-anchor">
                <p style={!isLeft ? {transform: "scaleX(-1) rotate(90deg) translateY(35px)"} : {}} className="blade-wing-title">
                    {title}
                </p>
            </div>
        </motion.div>
    );
}