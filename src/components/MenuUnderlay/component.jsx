
import { useEffect, useState } from "react"
import { UI_Z_INDEX } from "../../utils/constants"
import "./component.css"
import underlay from "./image.svg"
import { useGlobalStore } from "../../stores/globalStore"

export function MenuUnderlay({offset=0}) {
    const initialAnimationCompleted = useGlobalStore(state => state.initialAnimationCompleted)

    useEffect(() => {
        
    }, [initialAnimationCompleted])

    return (
        !initialAnimationCompleted && <img src={underlay} style={{left: `calc(20vh + ${offset} * 6.75vh)` ,"--menu-underlay-z-index": UI_Z_INDEX, "--menu-underlay-offset": offset}} className="menu-underlay"/>
    )

}