import { useEffect, useState } from "react"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { DiscDrive } from "../../../components/DiscDrive/component"
import { StandardButton } from "../../../components/StandardButton/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { MENU_Z_INDEX } from "../../../utils/constants"
import Xbox360Logo from "../../../assets/Images/Xbox_360.png"
import type { CSSProperties } from "react"
import "./index.css"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { PlayerCardButton } from "../../../components/PlayerCardButton/component"

import GamesLibraryImage from "../../../assets/icons/games/library.png"
import AchievementsImage from "../../../assets/icons/games/achievements.png"
import PlayedGamesImage from "../../../assets/icons/games/played.png"

import {strings} from "../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../components/ButtonGroup/component"
import { MenuTooltip } from "../../../components/MenuTooltip/component"
import { fromMenuStore } from "../../../stores/menuStore"
import { fromGlobalStore } from "../../../stores/globalStore"

export function GamesMenuContent() {

    
    const currentOpenPage = fromGlobalStore(state => state.currentPage)
    const currentMenuState = fromMenuStore(state => {
        const content = state.menuData[currentOpenPage - 1]?.content
        return content?.[content.length - 1]
    })
    const tabIndex = currentMenuState?.tabIndex ?? 0
    
    return (
        <div className="game-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
            <MenuUnderlay offset={2}/>
            <MenuContentContainer index={3} offsetIndex={2}>
                <MenuTitle title="Games"/>
                <DiscDrive selected={tabIndex === 4} style={{position: "absolute", width: "100%", bottom: "2.5vh"}}/>
                <div className="game-menu-rows">
                    <div className="game-menu-row">
                        <div style={{width: "50%"}}>
                            <PlayerCardButton selected={tabIndex === 0} gamertag="archiecalvert"/>
                        </div>
                        <div style={{width: "50%"}}>
                            <img style={{width: "100%", paddingLeft: "27%", paddingRight: "27%", aspectRatio: "auto", boxSizing: "border-box", filter: "drop-shadow(0 0 3px black)"}} src={Xbox360Logo}/>
                        </div>
                    </div>
                    <div className="game-menu-row" style={{alignItems: "start"}}>
                        <ButtonGroup>
                            <StandardButton selected={tabIndex === 1} iconImage={GamesLibraryImage}>Games Library</StandardButton>
                            <StandardButton selected={tabIndex === 2} iconImage={AchievementsImage}>Achievements</StandardButton>
                            <StandardButton selected={tabIndex === 3} iconImage={PlayedGamesImage}>Played Games</StandardButton>
                        </ButtonGroup>
                        <MenuTooltip>
                            {Object.values(strings.menus.games).map((string, index) => {
                                return index === tabIndex ? Object.values(string).map(s => {
                                    return <p>{s}</p>
                                }) : null
                            })}
                        </MenuTooltip>
                    </div>
                </div>
            </MenuContentContainer>
        </div>
    )
}