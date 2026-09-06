import PlaceholderImage from "../../assets/Images/Gamerpics/placeholder1.png"
import "./component.css"

export function PlayerCardButton({gamertag="Player"}) {
    return (
        <div className="player-card-button">
            <div className="player-card-title">
                {gamertag}
            </div>
            <div className="player-card-content">
                <div style={{display: "flex", gap: "1vh"}}>
                    <img className="player-card-gamerpic" src={PlaceholderImage}/>
                    <div>
                        <div>Rep</div>
                        <div>Gamerscore</div>
                        <div>Zone</div>
                    </div>
                </div>
            </div>
        </div>
    )
}