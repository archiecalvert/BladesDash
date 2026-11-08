import { useEffect, useState } from "react"
import { easeIn, motion, transform, useAnimationControls } from "motion/react"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX, BLADE_SWIPE_ANIMATION_DURATION } from "../../utils/constants"
import { sleep } from "../../utils/sleep"

import "./component.css"
import { fromGlobalStore } from "../../stores/globalStore"

export function MenuContentContainer({index=2, offsetIndex=2, children}) {
    const controls = useAnimationControls();
    const [width, setWidth] = useState(0)
    const [offset, setOffset] = useState(0)
    const bladeWing = fromGlobalStore(state => state.wings[index - 1])
    const bladeBackground = fromGlobalStore(state => state.bladeBackgroundRef)
     /**
     * 
     * @param i the index which we want to calculate the offset for
     * @param cur the currently active page index
     */
    function getOffsetPosition(i) {
        function getSelfWidth() {
            return bladeWing.getBoundingClientRect().width;
        }
        const bladeWidth = getSelfWidth() * ((1 - BLADE_WHITESPACE_LEFT) - BLADE_WHITESPACE_RIGHT)

        return (i - 1) * bladeWidth
    }

    useEffect(() => {
        async function fadeIn() {
            await controls.start({opacity: 0})
            await sleep(BLADE_SWIPE_ANIMATION_DURATION * 1000)
            await controls.start({opacity: 1, transition: {duration: 0.15, delay: 0.1}})

        }

        function ResizeHandler() {
            const backgroundWidth = bladeBackground.getBoundingClientRect().width;
            const final = window.innerWidth - 2 * backgroundWidth - window.innerWidth * 0.15;
            setWidth(final)
            setOffset(getOffsetPosition(offsetIndex))
        }

        if (!(bladeWing && bladeBackground)) return
        if (bladeWing === null) return
        if (bladeBackground === null) return

        const backgroundWidth = bladeBackground.getBoundingClientRect().width;
        console.log(backgroundWidth)
        console.log(backgroundWidth)
        const final = window.innerWidth - 2 * backgroundWidth - window.innerWidth * 0.15;
        setWidth(final)
        setOffset(getOffsetPosition(offsetIndex))
        fadeIn()
        window.addEventListener("resize", ResizeHandler)

        return () => {
            window.removeEventListener("resize", ResizeHandler)
        }
    }, [bladeWing, bladeBackground, offsetIndex])

    return (
        <motion.div initial={{opacity: 0}} animate={controls} style={{width: width, marginLeft: offset, "--menu-content-container-z-index": MENU_Z_INDEX + 1}} className="menu-content-container">
            {children}
        </motion.div>
    )
}