import { motion, useAnimationControls } from "motion/react"
import "./component.css"
import { CSSProperties, ReactNode, useEffect } from "react"
import Shadow from "../../assets/shadow-horizontal.png"
import {UI_Z_INDEX} from "../../utils/constants"

interface GamesMenuButtonProps {
    height?: string,
    buttonHeight?: string,
    iconImage?: string,
    children: ReactNode,
    selected: boolean,
}

export function GamesMenuButton({height="5vh", buttonHeight="7vh", iconImage="", children, selected=false}: GamesMenuButtonProps) {
    const controls = useAnimationControls()

    useEffect(() => {
        async function f() {
            const D = 0.16
            if(selected) {
                await controls.start({opacity: 1, transition: {duration: D, ease: "linear"}})
            } else {
                await controls.start({opacity: 0, transition: {duration: D, ease: "linear"}})
            }
        }
        f()
    }, [selected])
    return (
        <motion.div
            className={`games-menu-button-container`}
            style={{ height, "--games-menu-z-index": UI_Z_INDEX} as CSSProperties}
        >
            <motion.div initial={{opacity: 0}} animate={controls} className="games-menu-button-container-selected"/>
            {iconImage && <img style={{height: buttonHeight}} className="games-menu-button-icon" src={iconImage} alt=""/>}
            <p className="games-menu-button-text">{children}</p>
        </motion.div>
    )
}