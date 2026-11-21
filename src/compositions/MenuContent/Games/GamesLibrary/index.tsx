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
import { fromMenuStore } from "../../../../stores/menuStore"
import { MenuComponent, StateMachineData } from "../../../../types/menus"
import { PlaySound, SOUNDS } from "../../../../utils/tauriWrapper"
import { GamesMenuButton } from "../../../../components/GamesMenuButton/component"
import { GamesMenuXboxLiveButton } from "../../../../components/GamesMenuXboxLiveButton/component"
import MyGames from "../../../../assets/icons/games/played.png"
import LastPlayedIcon from "../../../../assets/icons/games/played.png"
import FriendsPlayingNowIcon from "../../../../assets/icons/games/friends-now.png"
import GamesStoreIcon from "../../../../assets/icons/games/played.png"
import AutoDownloadsIcon from "../../../../assets/icons/games/auto-downloads.png"

export const GamesLibraryMenuContent: MenuComponent = Object.assign(
    function GamesLibraryMenuContent() {
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
                                {Object.values(strings.menus.settings).map((string, index) => {
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
            },

            triggerRightInput: (context: StateMachineData) => {

            },

            triggerEnterInput: (context: StateMachineData) => {
                return undefined
            },

            triggerBackInput: (context: StateMachineData) => {
                const currentPage = context.globalStore.currentPage
                context.menuStore.popMenuData(currentPage)
                context.globalStore.setFullyHideMenus(false)
                PlaySound(SOUNDS.BACK)
            }
        }
    }
)
