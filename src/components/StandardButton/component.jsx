import { easeIn, motion, transform, useAnimationControls } from "motion/react"
import "./component.css"
import { useEffect } from "react"
import Shadow from "../../assets/shadow-horizontal.png"
import {UI_Z_INDEX} from "../../utils/constants"

export function StandardButton({height="5vh", iconImage=null, children, selected=false}) {
    const controls = useAnimationControls()

    useEffect(() => {
        async function f() {
            const D = 0.25
            if(selected) {
                await controls.start({opacity: 1, transition: {duration: D}})
            } else {
                await controls.start({opacity: 0, transition: {duration: D}})
            }
        }
        f()
    }, [selected])
    return (
        <motion.div
            className={`standard-button-container`}
            style={{ height, "--standard-button-z-index": UI_Z_INDEX}}
        >
            <motion.div initial={{opacity: 0}} animate={controls} className="standard-button-container-selected"/>
            <motion.img initial={{opacity: 0}} animate={controls} className="standard-button-shadow" src={Shadow} alt=""/>
            {iconImage && <img className="standard-button-icon" src={iconImage} alt=""/>}
            <div style={{zIndex: UI_Z_INDEX + 1}}>
                {children}
            </div>
        </motion.div>
    )
}