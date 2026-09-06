import { useEffect, useState } from "react"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX } from "../../../utils/constants"

import "./index.css"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"

export function GamesMenuContent(isOpen=false) {

    useEffect(() => {
        
    }, [])
    return (
        <div className="game-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
            <MenuContentContainer index={3} offsetIndex={2}>
                <MenuTitle title="Games"/>
            </MenuContentContainer>
        </div>
    )
}