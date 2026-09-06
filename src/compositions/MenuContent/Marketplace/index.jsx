import { useEffect, useState } from "react"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX } from "../../../utils/constants"

import "./index.css"

export function MarketplaceMenuContent({index=2}) {
    useEffect(() => {

    }, [])
    return (
        <div className="marketplace-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
            <MenuContentContainer  index={1} offsetIndex={-2}>
                <MenuTitle title="Marketplace"/>
            </MenuContentContainer>
        </div>
    )
}