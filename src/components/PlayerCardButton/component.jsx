import PlaceholderImage from "../../assets/Images/Gamerpics/placeholder2.png"
import GScoreImage from "../../assets/shdres/GScore.png"
import "./component.css"

export const ZONE = {
    PRO: "Pro",
    RECREATION: "Recreation",
    FAMILY: "Family",
    UNDERGROUND: "Underground"
}

export function PlayerCardButton({gamertag="Player", rep=5, gamerscore=0, zone=ZONE.NONE}) {
    return (
        <div className="player-card-button">
            <div className="player-card-title player-card-title-silver">
                {gamertag}
            </div>
            <div className="player-card-content">
                <div style={{display: "flex", gap: "1vh"}}>
                    <img className="player-card-gamerpic" src={PlaceholderImage}/>
                    <div>
                        <div>Games</div>
                        <div style={{display: "flex", alignItems: "center"}}><img style={{transform: "translateY(0.2vh) translateX(-0.75vh)", marginRight: "-0.85vh", height: "3.5vh", aspectRatio: "1 / 1"}} src={GScoreImage}/>amerscore</div>
                        <div>Achievements</div>
                    </div>
                </div>
            </div>
        </div>
    )
}