import wingImage from "../../../assets/Blade/background.png"
import plainBackground from "../../../assets/Blade/background_gradient.png"
import "./component.css"
import { SIDES } from "../../../utils/enums"
import { BLADE_BACKGROUND_SWIPEIN_DURATION, BLADE_SLIDER_BACKGROUND_Z_INDEX } from "../../../utils/constants"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { fromGlobalStore } from "../../../stores/globalStore"
export function BladeBackground({side = SIDES.LEFT }) {
    
    const bladeEdge = useRef<HTMLElement | null>(null)
    const setGlobalSelfRef = fromGlobalStore(state => state.setBladeBackgroundRef)
    const [start, setStart] = useState<number>()
    const [end, setEnd] = useState<number>()
    const [width, setWidth] = useState<number>()
    const [duration, setDuration] = useState<number>(BLADE_BACKGROUND_SWIPEIN_DURATION)

    function SetBladeEdge(element: HTMLElement | null) {
        if(element === null) return
        bladeEdge.current = element
        if (side === SIDES.LEFT) setGlobalSelfRef(element)
    }

    useEffect(() => {
        function handleResize() {
            if( bladeEdge?.current == null) return
            setDuration(0)
            const offset = window.innerWidth * 0.035
            const w = (window.innerWidth / 2 - bladeEdge.current.getBoundingClientRect().width)
            setStart(0)
            setWidth(w)
            setEnd(side == SIDES.LEFT ? -w - offset  : w + offset)
        }
        if (!bladeEdge.current) return

        window.addEventListener("resize", handleResize)
        const offset = window.innerWidth * 0.035
        const w = (window.innerWidth / 2 - bladeEdge.current.getBoundingClientRect().width)
        setStart(0)
        setWidth(w)
        setEnd(side == SIDES.LEFT ? -w - offset  : w + offset)

        return (
            window.removeEventListener("resize", handleResize)
        )
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
                position: "absolute",
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