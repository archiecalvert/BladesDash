import { motion, useAnimationControls } from "motion/react"
import PlaceholderImage from "../../assets/Images/Gamerpics/placeholder3.png"
import GScoreImage from "../../assets/shdres/GScore.png"
import "./component.css"
import { Field } from "./Field"
import { useEffect } from "react"
import { UI_Z_INDEX } from "../../utils/constants"

interface PlayerCardButtonProps {
    selected: boolean,
    gamertag?: string,
    rep?: number,
    gamerscore?: number,
    zone?: string,
}

export const ZONE = {
    PRO: "Pro",
    RECREATION: "Recreation",
    FAMILY: "Family",
    UNDERGROUND: "Underground",
    NONE: "None",
}

const gamerscoreText = <p><img style={{transform: "translateY(1.05vh) translateX(-0.75vh)", marginRight: "-0.85vh", height: "4.5vh", marginTop: "-1vh", aspectRatio: "1 / 1"}} src={GScoreImage}/>amerscore</p>
export function PlayerCardButton({selected, gamertag="<placeholder>", rep=5, gamerscore=0, zone=ZONE.NONE} : PlayerCardButtonProps) {
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
        <div className="player-card-button">
            <motion.div animate={controls} style={{zIndex: UI_Z_INDEX}} initial={{opacity: 0}} className="player-card-selected"/>
            <div style={{zIndex: UI_Z_INDEX + 1}} className="player-card-title player-card-title-silver">
                {gamertag}
            </div>
            <div style={{zIndex: UI_Z_INDEX + 1}} className="player-card-content">
                <div style={{display: "flex", gap: "1.5vh", flex: "70% 30%"}}>
                    <img className="player-card-gamerpic" src={PlaceholderImage}/>
                    <div style={{width: "100%"}}>
                        <Field label="Games" value="0"/>
                        <Field label={gamerscoreText} value="0"/>
                        <Field label="Achievements" value="0"/>
                    </div>
                </div>
            </div>
        </div>
    )
}