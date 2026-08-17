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
    startIndex,
    maximumIndex,
    pageActiveIndex
}) {

    const [BACKGROUND_X, set_BACKGROUND_X] = useState(0);
    const [BLADE_WIDTH_PIXELS, setBLADE_WIDTH_PIXELS] = useState(BACKGROUND_X);
    const controls = useAnimationControls();
    const [isLeft, setIsLeft] = useState(true);
    const [isSelected, setIsSelected] = useState(false);
    const [windowDimensions, setWindowsDimensions] = useState({width: 0 , height: 0})
    const [currentIndex, setCurrentIndex] = useState(startIndex)

    const [x, setX] = useState(130);
    const [y, setY] = useState(0);

    function setBladeWidthOnClient() {
        // divide by the images height in px
        const ratio = height / windowDimensions.height;
        // apply scaling to the image width
        setBLADE_WIDTH_PIXELS(ratio * 51)
    }

    async function MoveBladesOnTransition(left) {
        if(left) {

        }
        else {

        }
    }  


    async function InitBladesAnimation(left) {
        
        /**
         * Load the blades from behind the background to stack on top of each other
         * @param {boolean} left Whether the blade is a left blade or right blade
         */
        async function BringWingsOnScreen(left) {
            if(left) {
                await controls.start({zIndex: -1})
                await sleep(BLADE_BACKGROUND_SWIPEIN_TIME * 1000)
                // appear from behind and then set to be on top
                await controls.start({zIndex: currentIndex })
                await controls.start({left: x + BLADE_WIDTH_PIXELS, transition: {duration: BLADE_ANIMATION_KEYFRAME_DURATION} })
                await controls.start({zIndex: BLADE_BACKGROUND_Z_INDEX + currentIndex })
            }
            else {
                // wait for backgrounds to settle
                await controls.start({zIndex: -1, right: x, transition: {duration: 0} })
                await sleep(BLADE_BACKGROUND_SWIPEIN_TIME * 1000)
                // appear from behind and then set to be on top
                await controls.start({zIndex: currentIndex })
                await controls.start({right: x + BLADE_WIDTH_PIXELS, transition: {duration: BLADE_ANIMATION_KEYFRAME_DURATION} })
                await controls.start({zIndex: BLADE_BACKGROUND_Z_INDEX + currentIndex })
            }
        }

        await BringWingsOnScreen(left)
        if(left) {
            // set positions
            await controls.start({
                    left: x + (BLADE_WIDTH_PIXELS * (currentIndex - pageActiveIndex + 1)),
                    top: y + (25 * (pageActiveIndex - currentIndex)),
                    transition: {duration: 0.1 * ((pageActiveIndex - currentIndex))} 
            })
        }
        else {
            // set positions
            await controls.start({
                    right: x - (BLADE_WIDTH_PIXELS * (currentIndex - maximumIndex - 1)),
                    top: y - (10 * (pageActiveIndex - currentIndex)),
                    transition: {duration: 0.1 * (maximumIndex - currentIndex + 1)} 
            })
        }
    
    }

    async function SetBladePosition(newIndex, oldIndex) {
        // if the blade is moving towards the right
        if (newIndex > oldIndex) {
            // if the blade was the active blade, then move to the right side
            if (oldIndex == pageActiveIndex) {
                await controls.start({right: BACKGROUND_X - (BLADE_WIDTH_PIXELS * (currentIndex - maximumIndex - 1))})
            }
        }
    }

    // STARTUP LOGIC
    useEffect(() => {

        function ResizeLogic() {
            setWindowsDimensions({width: window.innerWidth, height: window.innerHeight})
            setBladeWidthOnClient()
        }
        async function start() {
            
            setIsLeft(currentIndex <= pageActiveIndex)
            setIsSelected(currentIndex == pageActiveIndex)
            await InitBladesAnimation(currentIndex <= pageActiveIndex)
        }
        
        window.addEventListener("resize", () => {
            ResizeLogic()
        })
        start();
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