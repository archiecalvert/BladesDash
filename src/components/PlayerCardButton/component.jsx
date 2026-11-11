import PlaceholderImage from "../../assets/Images/Gamerpics/placeholder3.png"
import GScoreImage from "../../assets/shdres/GScore.png"
import "./component.css"
import { Field } from "./Field"

export const ZONE = {
    PRO: "Pro",
    RECREATION: "Recreation",
    FAMILY: "Family",
    UNDERGROUND: "Underground"
}

const gamerscoreText = <p><img style={{transform: "translateY(1.05vh) translateX(-0.75vh)", marginRight: "-0.85vh", height: "4.5vh", marginTop: "-1vh", aspectRatio: "1 / 1"}} src={GScoreImage}/>amerscore</p>
export function PlayerCardButton({gamertag="<placeholder>", rep=5, gamerscore=0, zone=ZONE.NONE}) {
    return (
        <div className="player-card-button">
            <div className="player-card-title player-card-title-silver">
                {gamertag}
            </div>
            <div className="player-card-content">
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