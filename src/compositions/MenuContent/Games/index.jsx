import { useEffect, useState } from "react"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { DiscDrive } from "../../../components/DiscDrive/component"
import { StandardButton } from "../../../components/StandardButton/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX } from "../../../utils/constants"
import Xbox360Logo from "../../../assets/Images/Xbox_360.png"

import "./index.css"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { PlayerCardButton } from "../../../components/PlayerCardButton/component"

import GamesLibraryImage from "../../../assets/Images/DefaultIcons/icon-emulators.png"
import AchievementsImage from "../../../assets/Images/DefaultIcons/ico_64x_trophy.png"
import PlayedGamesImage from "../../../assets/Images/DefaultIcons/icon-games.png"

import {strings} from "../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../components/ButtonGroup/component"

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
                            <img style={{width: "100%", paddingLeft: "27%", paddingRight: "27%", aspectRatio: "auto", boxSizing: "border-box", filter: "drop-shadow(0 0 3px black)"}} src={Xbox360Logo}/>
                        </div>
                    </div>
                    <div className="game-menu-row">
                        <ButtonGroup>
                            <StandardButton iconImage={GamesLibraryImage}>Games Library</StandardButton>
                            <StandardButton iconImage={AchievementsImage}>Achievements</StandardButton>
                            <StandardButton iconImage={PlayedGamesImage}>Played Games</StandardButton>
                        </ButtonGroup>
                        <div className="menu-description-panel" style={{width: "50%", marginLeft: "5vh"}}>
                            <p>{strings.menus.games.profile_card.title}</p>
                            <p>{strings.menus.games.profile_card.description}</p>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: "26vh"}}>
                    <DiscDrive style={{}} />
                </div>
            </MenuContentContainer>
        </div>
    )
}