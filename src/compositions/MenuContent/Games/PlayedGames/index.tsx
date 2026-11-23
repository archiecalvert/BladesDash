import { MenuTitle } from "../../../../components/MenuTitle/component"
import { StandardButton } from "../../../../components/Buttons/StandardButton/component"
import { MenuUnderlay } from "../../../../components/MenuUnderlay/component"
import { MENU_Z_INDEX } from "../../../../utils/constants"
import type { CSSProperties } from "react"
import "./index.css"
import { MenuContentContainer } from "../../../../components/MenuContentContainer/component"

import {strings} from "../../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../../components/Buttons/ButtonGroup/component"
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

export const PlayedGamesMenuContent: MenuComponent = Object.assign(
    function PlayedGamesMenuContent() {
        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const tabIndexY = currentMenuState?.tabIndexY ?? 0

        return (
            <div className="played-games-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuContentContainer  index={1} offsetIndex={6}>
                    <MenuTitle title="Played Games"/>
                    <div className="played-games-menu-rows">
                        <p style={{display: "flex", textAlign:"center", width: "max-content"}}>Your games will be listed here.</p>
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
                PlaySound(SOUNDS.SECOND_LEVEL_CLOSE)
            }
        }
    }
)
