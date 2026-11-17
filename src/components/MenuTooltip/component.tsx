import { ReactNode } from "react"
import ShadowHorizontal from "../../assets/shadow-horizontal.png"
import ShadowVertical from "../../assets/shadow-vertical.png"
import "./component.css"

interface MenuTooltipProps {
    children: ReactNode,
    disableTopShadow?: boolean,
    disableSideShadow?: boolean,
}

export function MenuTooltip({children, disableTopShadow=false, disableSideShadow=false}: MenuTooltipProps) {
    return (
        <div className="menu-tooltip-panel">
            {!disableTopShadow && <img className="menu-tooltip-shadow-top" src={ShadowHorizontal}/>}
            {!disableSideShadow && <img className="menu-tooltip-shadow-left" src={ShadowVertical}/>}
            <div className="menu-tooltip-panel-content">
                {children}
            </div>
        </div>
    )
}