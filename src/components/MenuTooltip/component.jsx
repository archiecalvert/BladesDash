import ShadowHorizontal from "../../assets/shadow-horizontal.png"
import ShadowVertical from "../../assets/shadow-vertical.png"
import "./component.css"

export function MenuTooltip({children, disableTopShadow=false, disableSideShadow=false}) {
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