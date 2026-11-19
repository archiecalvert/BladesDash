
import {
    BLADE_BACKGROUND_SWIPEIN_DURATION,
    BLADE_SWIPE_ANIMATION_DURATION,
    BLADE_UNHIDE_ANIMATION_DURATION,
    BLADE_UNSTACK_ANIMATION_DURATION,
    MENU_TRANSITION_DURATION,
    MENU_TRANSITION_DELAY,
    UI_Z_INDEX
} from "../../utils/constants"
import "./component.css"
import underlay from "./image.svg"
import { fromGlobalStore } from "../../stores/globalStore"
import { motion } from "framer-motion"
import { CSSProperties, useEffect, useRef, useState } from "react"

interface MenuUnderlayProps {
    offset: number,
}

export function MenuUnderlay({ offset = 0 }: MenuUnderlayProps) {
    const initialAnimationCompleted = fromGlobalStore(state => state.initialAnimationCompleted)
    const currentPage = fromGlobalStore(state => state.currentPage)
    const fullyHideMenus = fromGlobalStore(state => state.fullyHideMenus)

    const [rerender, forceRerender] = useState(0)
    const [animateScale, setAnimateScale] = useState(false)
    const [menuTransition, setMenuTransition] = useState(false)

    const SCALE_MAX = 1.66
    const ANIMATION_DELAY = 0.2
    const OPACITY_DURATION = 0.25

    const isActive = currentPage - offset - 1 === 0
    const previousFullyHideMenus = useRef(fullyHideMenus)

    useEffect(() => {
        const visibilityChanged = previousFullyHideMenus.current !== fullyHideMenus

        if (!fullyHideMenus && previousFullyHideMenus.current) {
            setAnimateScale(true)
        }

        setMenuTransition(visibilityChanged)
        previousFullyHideMenus.current = fullyHideMenus

        forceRerender(prev => prev === 0 ? 1 : 0)
    }, [offset, fullyHideMenus])

    return (
        <motion.img
            src={underlay}
            key={rerender}
            initial={{
                scaleX: initialAnimationCompleted
                    ? (animateScale ? SCALE_MAX : 1)
                    : SCALE_MAX,
                scaleY: 1,
                opacity: initialAnimationCompleted
                    ? (fullyHideMenus || animateScale ? 1 : 0)
                    : 1
            }}
            animate={{
                scaleX: initialAnimationCompleted && !fullyHideMenus ? 1 : SCALE_MAX,
                scaleY: 1,
                opacity: isActive || animateScale ? 1 : 0,
                left: fullyHideMenus ? "26.2vh" : `calc(14vh + ${offset} * 6.1vh)`,
                transition: {delay: menuTransition && !fullyHideMenus ? MENU_TRANSITION_DELAY : 0, ease: "linear"}
            }}
            onAnimationComplete={() => {
                if (animateScale) {
                    setAnimateScale(false)
                }
                if (menuTransition) {
                    setMenuTransition(false)
                }
            }}
            transition={{
                scaleX: {
                    duration: menuTransition
                        ? MENU_TRANSITION_DURATION * 0.01
                        : BLADE_UNHIDE_ANIMATION_DURATION + BLADE_UNSTACK_ANIMATION_DURATION - ANIMATION_DELAY,
                    delay: menuTransition && !fullyHideMenus ? MENU_TRANSITION_DELAY : 0,
                    ease: "easeOut"
                },
                opacity: {
                    duration: menuTransition
                        ? MENU_TRANSITION_DURATION * 0.01
                        : initialAnimationCompleted
                            ? OPACITY_DURATION
                            : BLADE_BACKGROUND_SWIPEIN_DURATION - ANIMATION_DELAY,
                    delay: menuTransition && !fullyHideMenus
                        ? MENU_TRANSITION_DELAY
                        : initialAnimationCompleted
                            ? BLADE_SWIPE_ANIMATION_DURATION
                            : ANIMATION_DELAY,
                    ease: "easeOut"
                },
                left: {
                    duration: menuTransition ? MENU_TRANSITION_DURATION * 0.01 : 0,
                    delay: menuTransition && !fullyHideMenus ? MENU_TRANSITION_DELAY : 0,
                    ease: "easeOut"
                }
            }}
            style={{
                left: `calc(14vh + ${offset} * 6.1vh)`,
                "--menu-underlay-z-index": UI_Z_INDEX - 2,
                "--menu-underlay-offset": offset
            } as CSSProperties}
            className="menu-underlay"
        />
    )
}
