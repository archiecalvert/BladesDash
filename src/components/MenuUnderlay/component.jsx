
import { useState } from "react"
import { UI_Z_INDEX } from "../../utils/constants"
import "./component.css"
import underlay from "./image.svg"

export function MenuUnderlay({offset=0}) {

    return (
        <img src={underlay} style={{left: `calc(20.5vh + ${offset} * 6.8vh)` ,"--menu-underlay-z-index": UI_Z_INDEX, "--menu-underlay-offset": offset}} className="menu-underlay"/>
    )

}