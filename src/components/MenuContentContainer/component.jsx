import { useEffect, useState } from "react"
import { easeIn, motion, transform, useAnimationControls } from "motion/react"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX, BLADE_SWIPE_ANIMATION_DURATION } from "../../utils/constants"
import { sleep } from "../../utils/sleep"

import "./component.css"

export function MenuContentContainer({index=2, offsetIndex=2, children}) {
    const controls = useAnimationControls();
    const [width, setWidth] = useState(0)
    const [offset, setOffset] = useState(0)

     /**
     * 
     * @param i the index which we want to calculate the offset for
     * @param cur the currently active page index
     */
    function getOffsetPosition(i) {
        function getSelfWidth() {
            return document.getElementById(`blade-wing-image-` + index).getBoundingClientRect().width;
        }
        const bladeWidth = getSelfWidth() * ((1 - BLADE_WHITESPACE_LEFT) - BLADE_WHITESPACE_RIGHT)

        return (i - 1) * bladeWidth
    }

    function waitForLayout() {
        return new Promise(resolve => {
            const check = () => {
                if (
                    document.getElementById("blade-wing-image-" + index).getBoundingClientRect() &&
                    document.getElementById("blade-background-left").getBoundingClientRect()
                ) {
                    resolve()
                } else {
                    requestAnimationFrame(check)
                }
            }

            check()
        })
    }

    useEffect(() => {
        async function fadeIn() {
            await controls.start({opacity: 0})
            await sleep(BLADE_SWIPE_ANIMATION_DURATION * 1000)
            await controls.start({opacity: 1, transition: {duration: 0.15}})

        }

        waitForLayout()
        const backgroundWidth = document.getElementById("blade-background-left").getBoundingClientRect().width;
        const final = window.innerWidth - 2 * backgroundWidth - window.innerWidth * 0.15;
        setWidth(final)
        setOffset(getOffsetPosition(offsetIndex))
        fadeIn()
        
    }, [])

    return (
        <motion.div initial={{opacity: 0}} animate={controls} style={{width: width, marginLeft: offset, "--menu-content-container-z-index": MENU_Z_INDEX + 1}} className="menu-content-container">
            {children}
        </motion.div>
    )
}