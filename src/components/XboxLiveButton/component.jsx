import XboxLiveLogo from "../../assets/Images/Xbox_Live.png"
import "./component.css"

export function XboxLiveButton() {

    return (
        <div className="xbox-live-button">
            <img className="xbox-live-logo" src={XboxLiveLogo}/>
        </div>
    )
}