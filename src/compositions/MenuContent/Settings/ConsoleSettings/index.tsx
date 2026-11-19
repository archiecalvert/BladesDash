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
import { MenuComponent } from "../../../../types/menus"

export const ConsoleSettingsMenuContent: MenuComponent = Object.assign(
    function ConsoleSettingsMenuContent() {
        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const tabIndex = currentMenuState?.tabIndex ?? 0

        return (
            <div className="console-settings-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuUnderlay offset={4}/>
                <MenuContentContainer  index={1} offsetIndex={6}>
                    <MenuTitle title="Console Settings"/>
                    <div className="console-settings-menu-rows">
                        <div className="console-settings-menu-row" style={{alignItems: "start"}}>
                            <ButtonGroup>
                                <StandardButton selected={tabIndex === 0} iconImage={ConsoleSettingsIcon}>Display Settings</StandardButton>
                                <StandardButton selected={tabIndex === 1} iconImage={ConsoleSettingsIcon}>Audio</StandardButton>
                                <StandardButton selected={tabIndex === 2} iconImage={ConsoleSettingsIcon}>Themes</StandardButton>
                                <StandardButton selected={tabIndex === 3} iconImage={ConsoleSettingsIcon}>Languages</StandardButton>
                                <StandardButton selected={tabIndex === 4} iconImage={ConsoleSettingsIcon}>Clock</StandardButton>
                                <StandardButton selected={tabIndex === 5} iconImage={ConsoleSettingsIcon}>Locale</StandardButton>
                                <StandardButton selected={tabIndex === 6} iconImage={ConsoleSettingsIcon}>Startup</StandardButton>
                                <StandardButton selected={tabIndex === 7} iconImage={ConsoleSettingsIcon}>Shutdown</StandardButton>
                                <StandardButton selected={tabIndex === 8} iconImage={ConsoleSettingsIcon}>Screen Saver</StandardButton>
                            </ButtonGroup>
                            <MenuTooltip disableTopShadow disableSideShadow>
                                {Object.values(strings.menus.settings).map((string, index) => {
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
    },
    {
        getNextMenu: (_: number) => {
            return null
        },
        // triggerLeft: () => {},
        // triggerRight: () => {}
    }
)
