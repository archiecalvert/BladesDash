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

import GamesLibraryImage from "../../../assets/icons/games/library.png"
import AchievementsImage from "../../../assets/icons/games/achievements.png"
import PlayedGamesImage from "../../../assets/icons/games/played.png"

import {strings} from "../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../components/ButtonGroup/component"

export function GamesMenuContent(isOpen=false) {

    const [currentButtonIndex, setCurrentButtonIndex] = useState(1)

    useEffect(() => {
        window.addEventListener("keydown", () => {
            setCurrentButtonIndex(2)
        })
    }, [])
    return (
        <div className="game-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
            <MenuContentContainer index={3} offsetIndex={2}>
                <MenuTitle title="Games"/>
                <DiscDrive style={{position: "absolute", width: "100%", bottom: "2.5vh"}}/>
                <div className="game-menu-rows">
                    <div className="game-menu-row">
                        <div style={{width: "50%"}}>
                            <PlayerCardButton/>
                        </div>
                        <div style={{width: "50%"}}>
                            <img style={{width: "100%", paddingLeft: "27%", paddingRight: "27%", aspectRatio: "auto", boxSizing: "border-box", filter: "drop-shadow(0 0 3px black)"}} src={Xbox360Logo}/>
                        </div>
                    </div>
                    <div className="game-menu-row" style={{alignItems: "start"}}>
                        <ButtonGroup>
                            <StandardButton selected={currentButtonIndex == 1} iconImage={GamesLibraryImage}>Games Library</StandardButton>
                            <StandardButton selected={currentButtonIndex == 2} iconImage={AchievementsImage}>Achievements</StandardButton>
                            <StandardButton selected={currentButtonIndex == 3} iconImage={PlayedGamesImage}>Played Games</StandardButton>
                        </ButtonGroup>
                        <div className="menu-description-panel" style={{width: "50%", alignSelf: "start"}}>
                            <div style={{marginLeft: "5vh"}}>
                                <p>{strings.menus.games.profile_card.title}</p>
                                <p>{strings.menus.games.profile_card.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MenuContentContainer>
        </div>
    )
}