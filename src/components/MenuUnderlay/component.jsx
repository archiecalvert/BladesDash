import {
    BLADE_BACKGROUND_SWIPEIN_DURATION,
    BLADE_SWIPE_ANIMATION_DURATION,
    UI_Z_INDEX
} from "../../utils/constants"
import "./component.css"
import underlay from "./image.svg"
import { fromGlobalStore } from "../../stores/globalStore"
import { motion } from "framer-motion"

export function MenuUnderlay({ offset = 0 }) {
    const initialAnimationCompleted = fromGlobalStore(state => state.initialAnimationCompleted)
    const currentPage = fromGlobalStore(state => state.currentPage)

    const SCALE_MAX = 1.5
    const ANIMATION_DELAY = 0.2
    const OPACITY_DURATION = 0.25

    const isActive = currentPage - offset - 1 === 0

    return (
        <motion.img
            src={underlay}
            initial={{
                scaleX: initialAnimationCompleted ? 1 : SCALE_MAX,
                scaleY: 1,
                opacity: initialAnimationCompleted ? 0 : 1
            }}
            animate={{
                scaleX: initialAnimationCompleted ? 1 : SCALE_MAX,
                scaleY: 1,
                opacity: isActive ? 1 : 0
            }}
            transition={{
                scaleX: {
                    duration: BLADE_BACKGROUND_SWIPEIN_DURATION - ANIMATION_DELAY - 0.1,
                    delay: ANIMATION_DELAY,
                    ease: "easeInOut"
                },
                opacity: {
                    duration: initialAnimationCompleted
                        ? OPACITY_DURATION
                        : BLADE_BACKGROUND_SWIPEIN_DURATION - ANIMATION_DELAY,
                    delay: initialAnimationCompleted ? BLADE_SWIPE_ANIMATION_DURATION : ANIMATION_DELAY,
                    ease: "easeOut"
                }
            }}
            style={{
                left: `calc(20.55vh + ${offset} * 6.6vh)`,
                "--menu-underlay-z-index": UI_Z_INDEX,
                "--menu-underlay-offset": offset
            }}
            className="menu-underlay"
        />
    )
}