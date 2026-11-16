
import { CSSProperties } from "react"
import { UI_Z_INDEX } from "../../utils/constants"
import "./component.css"



export function MenuUnderlay() {
    return (
        <div style={{"--menu-underlay-z-index": UI_Z_INDEX} as CSSProperties} className="menu-underlay">
        
        </div>
    )

}