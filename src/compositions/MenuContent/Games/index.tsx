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
import { fromMenuStore, MenuDataState } from "../../../stores/menuStore"
import { fromGlobalStore } from "../../../stores/globalStore"
import { MenuComponent, StateMachineData } from "../../../types/menus"
import { PlaySound, SOUNDS } from "../../../utils/tauriWrapper"
import { GamesLibraryMenuContent } from "./GamesLibrary"
import { AchievementsMenuContent } from "./Achievements"
import { PlayedGamesMenuContent, RecentlyPlayedMenuContent } from "./PlayedGames"

export const GamesMenuContent: MenuComponent = Object.assign(
    function GamesMenuContent() {
        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const tabIndexY = currentMenuState?.tabIndexY ?? 0
        
        return (
            <div className="game-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuContentContainer index={3} offsetIndex={2}>
                    <MenuTitle title="Games"/>
                    <DiscDrive selected={tabIndexY === 4} style={{position: "absolute", width: "100%", bottom: "2.5vh"}}/>
                    <div className="game-menu-rows">
                        <div className="game-menu-row">
                            <PlayerCardButton selected={tabIndexY === 0} gamertag="archiecalvert"/>
                            <img style={{width: "100%", paddingLeft: "27%", paddingRight: "27%", alignSelf: "center", aspectRatio: "auto", boxSizing: "border-box", filter: "drop-shadow(0 0 3px black)"}} src={Xbox360Logo}/>
                        </div>
                        <div className="game-menu-row" style={{alignItems: "start"}}>
                            <ButtonGroup>
                                <StandardButton selected={tabIndexY === 1} iconImage={GamesLibraryImage}>Games Library</StandardButton>
                                <StandardButton selected={tabIndexY === 2} iconImage={AchievementsImage}>Achievements</StandardButton>
                                <StandardButton selected={tabIndexY === 3} iconImage={PlayedGamesImage}>Played Games</StandardButton>
                            </ButtonGroup>
                            <MenuTooltip>
                                {Object.values(strings.menus.games).map((string, index) => {
                                    return index === tabIndexY ? Object.values(string).map(s => {
                                        return <p>{s}</p>
                                    }) : null
                                })}
                            </MenuTooltip>
                        </div>
                    </div>
                </MenuContentContainer>
            </div>
        )
    },
    {
        stateMachine: {
            triggerUpInput: (context: StateMachineData) => {
                const currentPage = context.globalStore.currentPage
                if (context.menuStore.decreaseTabIndexY(currentPage, 1)) PlaySound(SOUNDS.MENU_NAVIGATION)
            },

            triggerDownInput: (context: StateMachineData) => {
                const currentPage = context.globalStore.currentPage
                if (context.menuStore.increaseTabIndexY(currentPage, 1)) PlaySound(SOUNDS.MENU_NAVIGATION)
            },

            triggerLeftInput: (context: StateMachineData) => {
                context.globalStore.setCurrentPage(prev => prev - 1)
            },
            
            triggerRightInput: (context: StateMachineData) => {
                context.globalStore.setCurrentPage(prev => prev + 1)
            },

            triggerEnterInput: (context: StateMachineData) => {
                PlaySound(SOUNDS.SELECT)    
                const menus: Record<number, MenuDataState> = {
                    1: {
                        tabIndexX: 0,
                        tabIndexY: 1,
                        maxTabIndexX: 0,
                        maxTabIndexY: 5,
                        content: GamesLibraryMenuContent
                    } as MenuDataState,
                    2: {
                        tabIndexX: 0,
                        tabIndexY: 0,
                        maxTabIndexX: 0,
                        maxTabIndexY: 0,
                        content: AchievementsMenuContent
                    } as MenuDataState,
                    3: {
                        tabIndexX: 0,
                        tabIndexY: 0,
                        maxTabIndexX: 0,
                        maxTabIndexY: 0,
                        content: PlayedGamesMenuContent
                    } as MenuDataState,
                }
                
                const pushMenuData = context.menuStore.pushMenuData
                const currentPage = context.globalStore.currentPage
                const params = menus[context.tabIndexY]
                pushMenuData(
                    currentPage,
                    params.maxTabIndexX,
                    params.maxTabIndexY,
                    params.content,
                    params.tabIndexX,
                    params.tabIndexY
                )
                context.globalStore.setFullyHideMenus(true)
            },

            triggerBackInput: (context: StateMachineData) => {
                
            }
        }
    }
)