
import { UI_Z_INDEX } from "../../utils/constants"
import "./component.css"

export function MenuUnderlay({isCurrentMenu=false}) {
    return (
        <div style={{"--menu-underlay-z-index": UI_Z_INDEX}} className="menu-underlay">
        
        </div>
    )

}