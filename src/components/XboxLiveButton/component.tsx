import { motion, useAnimationControls } from "motion/react"
import XboxLiveLogo from "../../assets/Images/Xbox_Live.png"
import "./component.css"
import { UI_Z_INDEX } from "../../utils/constants"
import { useEffect } from "react"

interface XboxLiveButtonProps {
    selected: boolean
}
export function XboxLiveButton({selected}: XboxLiveButtonProps) {
    const controls = useAnimationControls()

    useEffect(() => {
        async function f() {
            const D = 0.25
            if(selected) {
                await controls.start({opacity: 1, transition: {duration: D, ease: "linear"}})
            } else {
                await controls.start({opacity: 0, transition: {duration: D, ease: "linear"}})
            }
        }
        f()
    }, [selected])
    return (
        <div className="xbox-live-button">
            <motion.div animate={controls} style={{zIndex: UI_Z_INDEX}} initial={{opacity: 1}} className="xbox-live-button-selected"/>
            <img className="xbox-live-logo" src={XboxLiveLogo}/>
        </div>
    )
}