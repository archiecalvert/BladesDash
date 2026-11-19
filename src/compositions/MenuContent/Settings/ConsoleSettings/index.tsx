import { MenuTitle } from "../../../../components/MenuTitle/component"
import { StandardButton } from "../../../../components/StandardButton/component"
import { MenuUnderlay } from "../../../../components/MenuUnderlay/component"
import { MENU_Z_INDEX } from "../../../../utils/constants"
import type { CSSProperties } from "react"
import "./index.css"
import { MenuContentContainer } from "../../../../components/MenuContentContainer/component"

import ConsoleSettingsIcon from "../../../../assets/icons/settings/console.png"
import {strings} from "../../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../../components/ButtonGroup/component"
import { MenuTooltip } from "../../../../components/MenuTooltip/component"
import { fromGlobalStore } from "../../../../stores/globalStore"
import { fromMenuStore } from "../../../../stores/menuStore"
import { MenuComponent, StateMachineData } from "../../../../types/menus"
import { PlaySound, SOUNDS } from "../../../../utils/tauriWrapper"

export const ConsoleSettingsMenuContent: MenuComponent = Object.assign(
    function ConsoleSettingsMenuContent() {
        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const tabIndexY = currentMenuState?.tabIndexY ?? 0

        return (
            <div className="console-settings-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuUnderlay offset={4}/>
                <MenuContentContainer  index={1} offsetIndex={6}>
                    <MenuTitle title="Console Settings"/>
                    <div className="console-settings-menu-rows">
                        <div className="console-settings-menu-row" style={{alignItems: "start"}}>
                            <ButtonGroup>
                                <StandardButton selected={tabIndexY === 0} iconImage={ConsoleSettingsIcon}>Display Settings</StandardButton>
                                <StandardButton selected={tabIndexY === 1} iconImage={ConsoleSettingsIcon}>Audio</StandardButton>
                                <StandardButton selected={tabIndexY === 2} iconImage={ConsoleSettingsIcon}>Themes</StandardButton>
                                <StandardButton selected={tabIndexY === 3} iconImage={ConsoleSettingsIcon}>Languages</StandardButton>
                                <StandardButton selected={tabIndexY === 4} iconImage={ConsoleSettingsIcon}>Clock</StandardButton>
                                <StandardButton selected={tabIndexY === 5} iconImage={ConsoleSettingsIcon}>Locale</StandardButton>
                                <StandardButton selected={tabIndexY === 6} iconImage={ConsoleSettingsIcon}>Startup</StandardButton>
                                <StandardButton selected={tabIndexY === 7} iconImage={ConsoleSettingsIcon}>Shutdown</StandardButton>
                                <StandardButton selected={tabIndexY === 8} iconImage={ConsoleSettingsIcon}>Screen Saver</StandardButton>
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
            }
        }
    }
)
