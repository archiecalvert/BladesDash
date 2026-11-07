import { useEffect, useState } from "react"
import { easeIn, motion, transform, useAnimationControls } from "motion/react"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX, BLADE_SWIPE_ANIMATION_DURATION } from "../../utils/constants"
import { sleep } from "../../utils/sleep"

import "./component.css"
import { useGlobalStore } from "../../stores/globalStore"

export function MenuContentContainer({index=2, offsetIndex=2, children}) {
    const controls = useAnimationControls();
    const [width, setWidth] = useState(0)
    const [offset, setOffset] = useState(0)
    const bladeWing = useGlobalStore(state => state.wings[index - 1])
    const bladeBackground = useGlobalStore(state => state.bladeBackgroundRef)
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

        if (!(bladeWing && bladeBackground)) return
        const backgroundWidth = bladeBackground.getBoundingClientRect().width;
        const final = window.innerWidth - 2 * backgroundWidth - window.innerWidth * 0.15;
        setWidth(final)
        setOffset(getOffsetPosition(offsetIndex))
        fadeIn()
        window.addEventListener("resize", () => {
            const backgroundWidth = bladeBackground.getBoundingClientRect().width;
            const final = window.innerWidth - 2 * backgroundWidth - window.innerWidth * 0.15;
            setWidth(final)
            setOffset(getOffsetPosition(offsetIndex))
        })
    }, [bladeWing, bladeBackground])

    return (
        <motion.div initial={{opacity: 0}} animate={controls} style={{width: width, marginLeft: offset, "--menu-content-container-z-index": MENU_Z_INDEX + 1}} className="menu-content-container">
            {children}
        </motion.div>
    )
}