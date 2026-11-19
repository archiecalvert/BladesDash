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
    const fullyHideMenus = fromGlobalStore(state => state.fullyHideMenus)
    const initialAnimationCompleted = fromGlobalStore(state => state.initialAnimationCompleted)
    const [start, setStart] = useState<number>()
    const [end, setEnd] = useState<number>()
    const [width, setWidth] = useState<number>()
    const [duration, setDuration] = useState<number>(BLADE_BACKGROUND_SWIPEIN_DURATION)

    function SetBladeEdge(element: HTMLElement | null) {
        if(element === null) return
        bladeEdge.current = element
        if (side === SIDES.LEFT) setGlobalSelfRef(element)
    }

    function getOffsetValues() {
        if (bladeEdge?.current === null) return {w: 0, offset: 0}
        const offset = window.innerWidth * 0.035
        const w = (window.innerWidth / 2 - bladeEdge.current.getBoundingClientRect().width)

        return {w, offset}
    }
    function HideMenus() {
        const {w, offset} = getOffsetValues()
        const offset2 = 2
        setEnd(side == SIDES.LEFT ? -offset2 * w - offset  : offset2 * w + offset)
    }

    function UnhideMenus() {
        const {w, offset} = getOffsetValues()
        setStart(0)
        setWidth(w)
        setEnd(side == SIDES.LEFT ? -w - offset : w + offset)
    }

    useEffect(() => {
        function handleResize() {
            if( bladeEdge?.current == null) return
            setDuration(0)
            const {w, offset} = getOffsetValues()
            setStart(0)
            setWidth(w)
            setEnd(side == SIDES.LEFT ? -w - offset  : w + offset)
        }
        if (!bladeEdge.current) return

        window.addEventListener("resize", handleResize)
        UnhideMenus()
        return (
            window.removeEventListener("resize", handleResize)
        )
    }, [])

    useEffect(() => {
        if(!bladeEdge?.current) return
        if (fullyHideMenus) {
            HideMenus()
        } else {
            UnhideMenus()
        }
    }, [fullyHideMenus, bladeEdge])
    
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