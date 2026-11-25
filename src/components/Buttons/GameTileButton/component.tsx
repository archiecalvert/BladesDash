import { motion, useAnimationControls } from "motion/react"
import "./component.css"
import { CSSProperties, ReactNode, useEffect } from "react"
import Shadow from "../../../assets/shadow-horizontal.png"
import {UI_Z_INDEX} from "../../../utils/constants"
import GameImg from "../../../assets/icons/games/GameImg.png"

export interface GameTileButtonProps {
    height?: string,
    buttonHeight?: string,
    iconImage?: string,
    children: ReactNode,
    selected: boolean,
    forceInstantAnimation?: boolean,
}

export function GameTileButton({buttonHeight="4.2vh", iconImage, children, selected=false, forceInstantAnimation=false}: GameTileButtonProps) {
    const controls = useAnimationControls()

    useEffect(() => {
        async function f() {
            const D = 0.25
            if(selected) {
                await controls.start({opacity: 1, transition: {duration: D, ease: "linear"}})
            } else {
                await controls.start({opacity: 0, transition: {duration: forceInstantAnimation ? 0.00 : D, ease: "linear"}})
            }
        }
        f()
    }, [selected, forceInstantAnimation])
    return (
        <motion.div
            className={`game-tile-button-container`}
            style={{"--game-tile-button-z-index": UI_Z_INDEX} as CSSProperties}
        >
            <motion.div initial={{opacity: 0}} animate={controls} className="game-tile-button-container-selected"/>
            <motion.img initial={{opacity: 0}} animate={controls} className="game-tile-button-shadow" src={Shadow} alt=""/>
            <motion.img
                className="game-tile-button-icon"
                src={iconImage || GameImg}
                alt=""
                initial={{ height: buttonHeight }}
                animate={{
                    height: selected
                        ? `calc(${buttonHeight} * 2)`
                        : buttonHeight
                }}
                transition={{
                    height: {
                        duration: forceInstantAnimation ? 0.00 : 0.05,
                        ease: "easeInOut"
                    }
                }}
            />
            <motion.div 
                initial={{ height: buttonHeight }}
                animate={{
                    height: selected
                        ? `calc(${buttonHeight} * 2)`
                        : buttonHeight
                }}
                transition={{
                    height: {
                        duration: forceInstantAnimation ? 0.00 : 0.05,
                        ease: "easeInOut"
                    }
                }}
            
            style={{zIndex: UI_Z_INDEX + 1}}>
                {children}
            </motion.div>
        </motion.div>
    )
}