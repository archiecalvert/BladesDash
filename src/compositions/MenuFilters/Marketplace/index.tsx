import { MENU_Z_INDEX } from "../../../utils/constants"
import "./index.css"
import type { CSSProperties } from "react"

export function MarketplaceMenu() {
    return (
        <div className="marketplace-menu" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
            
        </div>
    )
}