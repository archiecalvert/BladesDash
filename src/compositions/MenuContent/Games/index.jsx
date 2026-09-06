import { useEffect, useState } from "react"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX } from "../../../utils/constants"
import Xbox360Logo from "../../../assets/Images/Xbox_360.png"

import "./index.css"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { PlayerCardButton } from "../../../components/PlayerCardButton/component"

export function GamesMenuContent(isOpen=false) {

    useEffect(() => {
        
    }, [])
    return (
        <div className="game-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
            <MenuContentContainer index={3} offsetIndex={2}>
                <MenuTitle title="Games"/>
                <div className="game-menu-rows">
                    <div className="game-menu-row">
                        <div style={{width: "50%"}}>
                        <PlayerCardButton/>
                        </div>
                        <div style={{width: "50%"}}>
                            <img style={{width: "100%", paddingLeft: "25%", paddingRight: "25%", aspectRatio: "auto", boxSizing: "border-box", filter: "drop-shadow(0 0 3px black)"}} src={Xbox360Logo}/>
                        </div>
                    </div>
                </div>
            </MenuContentContainer>
        </div>
    )
}