import "./component.css"
import bg from "../../assets/bg.mp4"
import { motion, useAnimationControls } from "motion/react"
import { fromGlobalStore } from "../../stores/globalStore"
import { useEffect } from "react"
import { MENU_TRANSITION_DURATION } from "../../utils/constants"

export function BackgroundAnimationComponent() {
    const controls = useAnimationControls()
    const fullyHideMenus = fromGlobalStore(state => state.fullyHideMenus)
    const MAX_SCALE = 1.5
    useEffect(() => {
        async function f() {
            if (fullyHideMenus) await controls.start({scaleX: MAX_SCALE, transition: {duration: MENU_TRANSITION_DURATION, ease: "linear"}})
            else await controls.start({scaleX: 1, transition: {duration: MENU_TRANSITION_DURATION, ease: "linear"}})
        }
        f()
    }, [fullyHideMenus])

    return (
        <motion.video
            initial={{scaleX: 1}}
            animate={controls}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="background-container"
            loop
            disablePictureInPicture
        >
            <source src={bg} type="video/mp4" className="bg-video-render"/>
        </motion.video>
    )
}