import { BLADE_BACKGROUND_SWIPEIN_DURATION, BLADE_SLIDER_BACKGROUND_Z_INDEX } from "../../utils/constants";
import "./component.css"
import { motion } from "motion/react"

export function InitialFadeIn({}) {
    const DELAY = 0
    return (
        <motion.div style={{zIndex: BLADE_SLIDER_BACKGROUND_Z_INDEX - 1}}
                    initial={{opacity: 0.8}}
                    animate={{opacity: 0, transition: {delay: DELAY, duration: BLADE_BACKGROUND_SWIPEIN_DURATION * 0.85, ease: "linear"}}}
                    className="initial-page-fade-in">

        </motion.div>
    );
}