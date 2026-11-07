import wingImage from "../../../assets/Blade/background.png"
import plainBackground from "../../../assets/Blade/background_gradient.png"
import "./component.css"
import { SIDES } from "../../../utils/enums"
import { BLADE_BACKGROUND_SWIPEIN_DURATION, BLADE_SLIDER_BACKGROUND_Z_INDEX } from "../../../utils/constants"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useGlobalStore } from "../../../stores/globalStore"
export function BladeBackground({side = SIDES.LEFT }) {
    
    const MAX_BLADE_SCALE = 10
    const bladeEdge = useRef(null)
    const setGlobalSelfRef = useGlobalStore(state => state.setBladeBackgroundRef)
    const setAnimationCompleted = useGlobalStore(state => state.setInitialAnimationCompleted)
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [width, setWidth] = useState()
    const [duration, setDuration] = useState(BLADE_BACKGROUND_SWIPEIN_DURATION)

    function SetBladeEdge(element) {
        if(element === null) return
        bladeEdge.current = element
        if (side === SIDES.LEFT) setGlobalSelfRef(element)
    }

    useEffect(() => {
        if (!bladeEdge.current) return

        window.addEventListener("resize", () => {
            setDuration(0)
            const offset = window.innerWidth * 0.035
            const w = (window.innerWidth / 2 - bladeEdge.current.getBoundingClientRect().width)
            setStart(0)
            setWidth(w)
            setEnd(side == SIDES.LEFT ? -w - offset  : w + offset)
        })
        const offset = window.innerWidth * 0.035
        const w = (window.innerWidth / 2 - bladeEdge.current.getBoundingClientRect().width)
        setStart(0)
        setWidth(w)
        setEnd(side == SIDES.LEFT ? -w - offset  : w + offset)
        setTimeout(() => {setAnimationCompleted()}, 1000 * duration)
    }, [])
    
    return (
        <motion.div
            style={{
                scaleX: side === SIDES.LEFT ? 1 : -1,
                scaleY: 1.2,
                top: "10%",
                left: side === SIDES.LEFT ? start : "unset",
                right: side === SIDES.RIGHT ? start : "unset",
                height: "100%",
                zIndex: BLADE_SLIDER_BACKGROUND_Z_INDEX,
                display: "flex",
                position: "absolute"
            }}
            animate={{
                x: end,
                transition: {
                    duration: duration
                }
            }}
        >
            <motion.img
                src={plainBackground}
                className="blade-background-extension"
                style={{ width }}
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