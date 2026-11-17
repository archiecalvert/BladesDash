import { MenuTitle } from "../../../components/MenuTitle/component"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { MENU_Z_INDEX } from "../../../utils/constants"
import type { CSSProperties } from "react"

import "./index.css"

export function MarketplaceMenuContent() {
    
    return (
        <div className="marketplace-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
            <MenuUnderlay offset={0}/>
            <MenuContentContainer  index={1} offsetIndex={-2}>
                <MenuTitle title="Marketplace"/>
            </MenuContentContainer>
        </div>
    )
}