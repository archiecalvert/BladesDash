
import wingImage from "../../../assets/Blade/background.png"
import plainBackground from "../../../assets/Blade/background_gradient.png"
import "./component.css"

import { SIDES } from "../../../utils/enums"

import {
    BLADE_BACKGROUND_SWIPEIN_DURATION,
    BLADE_SLIDER_BACKGROUND_Z_INDEX,
    MENU_TRANSITION_DURATION
} from "../../../utils/constants"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { fromGlobalStore } from "../../../stores/globalStore"

export function BladeBackground({ side = SIDES.LEFT }) {

    const bladeEdge = useRef<HTMLElement | null>(null)

    const setGlobalSelfRef = fromGlobalStore(state => state.setBladeBackgroundRef)
    const fullyHideMenus = fromGlobalStore(state => state.fullyHideMenus)

    const [position, setPosition] = useState({
        visible: 0,
        hidden: 0,
        width: 0,
        ready: false
    })

    const [duration, setDuration] = useState(
        BLADE_BACKGROUND_SWIPEIN_DURATION
    )

    const isLeft = side === SIDES.LEFT

    const SetBladeEdge = useCallback((element: HTMLImageElement | null) => {
        if (!element) return

        bladeEdge.current = element

        if (isLeft) {
            setGlobalSelfRef(element)
        }
    }, [isLeft, setGlobalSelfRef])

    const calculatePositions = useCallback(() => {
        if (!bladeEdge.current) return

        const element = bladeEdge.current

        const offset = window.innerWidth * 0.035

        const w = window.innerWidth / 2 -
            element.getBoundingClientRect().width

        const width = w + element.offsetWidth

        setPosition({
            visible: (isLeft ? -w - offset - window.innerWidth * 0.015 : w + offset - window.innerWidth * 0.006),
            hidden: isLeft ? -width : width,
            width: w,
            ready: true
        })
    }, [isLeft])

    useEffect(() => {
        const element = bladeEdge.current

        if (!element) return

        // Wait until the image has its actual dimensions.

        element.addEventListener("load", calculatePositions)
        

        function handleResize() {
            setDuration(0)
            calculatePositions()
        }

        window.addEventListener("resize", handleResize)

        return () => {
            element.removeEventListener("load", calculatePositions)
            window.removeEventListener("resize", handleResize)
        }
    }, [calculatePositions])

    useEffect(() => {
        if (!position.ready) return

        setDuration(MENU_TRANSITION_DURATION)
    }, [fullyHideMenus, position.ready])

    const targetPosition = fullyHideMenus
        ? position.hidden
        : position.visible

    return (
        <motion.div
            style={{
                scaleX: isLeft ? 1 : -1,
                scaleY: 1.2,
                top: "10%",
                left: isLeft ? 0 : "unset",
                right: !isLeft ? 0 : "unset",
                height: "100%",
                zIndex: BLADE_SLIDER_BACKGROUND_Z_INDEX,
                display: "flex",
                position: "absolute",
            }}
            animate={{
                x: position.ready ? targetPosition : 0,
                transition: {
                    duration
                }
            }}
        >
            <motion.img
                src={plainBackground}
                className="blade-background-extension"
                style={{
                    width: position.width
                }}
            />

            <motion.img
                ref={SetBladeEdge}
                className={`blade-background-${side}`}
                id={`blade-background-${side}`}
                src={wingImage}
            />
        </motion.div>
    )
}
