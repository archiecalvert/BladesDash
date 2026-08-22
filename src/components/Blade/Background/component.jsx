import wingImage from "../../../assets/Blade/background.png"
import plainBackground from "../../../assets/Blade/background_gradient.png"
import "./component.css"
import { SIDES } from "../../../utils/enums"
import { BLADE_BACKGROUND_SWIPEIN_TIME, BLADE_BACKGROUND_Z_INDEX } from "../../../utils/constants"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
export function BladeBackground({side = SIDES.LEFT}) {
    
    const MAX_BLADE_SCALE = 10
    const bladeEdge = useRef(null)

    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [width, setWidth] = useState()

    useEffect(() => {
        if(bladeEdge.current === undefined) return

        const w = window.innerWidth / 2 - bladeEdge.current.getBoundingClientRect().width
        setStart(0)
        setWidth(w)
        setEnd(side == SIDES.LEFT ? -w : w)
    }, [])
    
    return (
        <motion.div
            style={{
                scaleX: side == SIDES.LEFT ? 1 : -1, 
                scaleY: 1.2, 
                top: 50,
                left: side == SIDES.LEFT ? start : "unset", 
                right: side == SIDES.RIGHT ? start : "unset",
                height: "100%", 
                zIndex: BLADE_BACKGROUND_Z_INDEX, 
                display: "flex", 
                position: "absolute"
            }}
            animate={{x: end, transition: {duration: BLADE_BACKGROUND_SWIPEIN_TIME}}}
        >
            <motion.img
                src={plainBackground}
                className={`blade-background-extension`}
                style={{width: width}}
            />
            <motion.img
                ref={bladeEdge}
                className={`blade-background-${side}`}
                id={`blade-background-${side}`}
                src={wingImage}/>
        </motion.div>

    )

}