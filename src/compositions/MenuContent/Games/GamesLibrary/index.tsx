import { MenuTitle } from "../../../../components/MenuTitle/component"
import { StandardButton } from "../../../../components/StandardButton/component"
import { MenuUnderlay } from "../../../../components/MenuUnderlay/component"
import { MENU_Z_INDEX } from "../../../../utils/constants"
import type { CSSProperties } from "react"
import "./index.css"
import { MenuContentContainer } from "../../../../components/MenuContentContainer/component"

import {strings} from "../../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../../components/ButtonGroup/component"
import { MenuTooltip } from "../../../../components/MenuTooltip/component"
import { fromGlobalStore } from "../../../../stores/globalStore"
import { fromMenuStore, MenuDataState } from "../../../../stores/menuStore"
import { MenuComponent, StateMachineData } from "../../../../types/menus"
import { PlaySound, SOUNDS } from "../../../../utils/tauriWrapper"
import { GamesMenuButton } from "../../../../components/GamesMenuButton/component"
import { GamesMenuXboxLiveButton } from "../../../../components/GamesMenuXboxLiveButton/component"
import MyGames from "../../../../assets/icons/games/played.png"
import LastPlayedIcon from "../../../../assets/icons/games/played.png"
import FriendsPlayingNowIcon from "../../../../assets/icons/games/friends-now.png"
import GamesStoreIcon from "../../../../assets/icons/games/played.png"
import AutoDownloadsIcon from "../../../../assets/icons/games/auto-downloads.png"
import { GamesLibraryMyGamesMenuContent } from "./MyGames"

export const GamesLibraryMenuContent: MenuComponent = Object.assign(
    function GamesLibraryMenuContent() {
        const myGamesText = {
            title:  strings.menus.games$games_library.my_games.title,
            description: strings.menus.games$games_library.my_games.description(3)
        }
        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const tabIndexY = currentMenuState?.tabIndexY ?? 0

        return (
            <div className="games-library-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuContentContainer  index={1} offsetIndex={6}>
                    <MenuTitle title="Games Library"/>
                    <div className="games-library-menu-rows">
                        <div className="games-library-menu-row" style={{alignItems: "start"}}>
                            <ButtonGroup style={{justifyContent: "space-around", height: "calc(69vh - 3vh)", alignItems: "stretch", gap: "1vh"}}>
                                <GamesMenuXboxLiveButton selected={tabIndexY === 0}/>
                                <GamesMenuButton selected={tabIndexY === 1} iconImage={MyGames}>My Games</GamesMenuButton>
                                <GamesMenuButton selected={tabIndexY === 2} iconImage={LastPlayedIcon}>Last Played Game</GamesMenuButton>
                                <GamesMenuButton selected={tabIndexY === 3} iconImage={FriendsPlayingNowIcon}>Friends Playing Now</GamesMenuButton>
                                <GamesMenuButton selected={tabIndexY === 4} iconImage={GamesStoreIcon}>Games Store</GamesMenuButton>
                                <GamesMenuButton selected={tabIndexY === 5} iconImage={AutoDownloadsIcon}>Auto Downloads</GamesMenuButton>
                            </ButtonGroup>
                            <MenuTooltip disableTopShadow disableSideShadow>
                                {Object.values(strings.menus.games$games_library).map((string, index) => {
                                    if (index === tabIndexY) {
                                        if(index === 1) {
                                            return Object.values(myGamesText).map(s => {
                                                return <p>{s}</p>
                                            })
                                        }
                                        return Object.values(string).map(s => {
                                            if (typeof s !== "string") return null
                                            return <p>{s}</p>
                                        })
                                    }
                                    return null
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
            },

            triggerRightInput: (context: StateMachineData) => {

            },

            triggerEnterInput: (context: StateMachineData) => {
                PlaySound(SOUNDS.SELECT)    
                const menus: Record<number, MenuDataState> = {
                    1: {
                        tabIndexX: 0,
                        tabIndexY: 0,
                        content: GamesLibraryMyGamesMenuContent
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
                const currentPage = context.globalStore.currentPage
                context.menuStore.popMenuData(currentPage)
                context.globalStore.setFullyHideMenus(false)
                PlaySound(SOUNDS.BACK)
                PlaySound(SOUNDS.SECOND_LEVEL_CLOSE)
            }
        }
    }
)
