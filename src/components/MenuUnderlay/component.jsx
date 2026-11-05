
import { UI_Z_INDEX } from "../../utils/constants"
import "./component.css"
import underlay from "./image.svg"

export function MenuUnderlay({offset=0}) {
    return (
        <img src={underlay} style={{left: `calc(2.1vw + ${offset} * 3.8vw)` ,"--menu-underlay-z-index": UI_Z_INDEX, "--menu-underlay-offset": offset}} className="menu-underlay"/>
    )

}