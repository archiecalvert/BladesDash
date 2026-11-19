import { MenuTitle } from "../../../components/MenuTitle/component"
import { StandardButton } from "../../../components/StandardButton/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { MENU_Z_INDEX } from "../../../utils/constants"
import type { CSSProperties } from "react"
import "./index.css"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"

import ConsoleSettingsIcon from "../../../assets/icons/settings/console.png"
import FamilySettingsIcon from "../../../assets/icons/settings/family.png"
import MemoryImage from "../../../assets/icons/settings/memory.png"
import NetworkSettingsIcon from "../../../assets/icons/settings/network.png"
import ComputersIcon from "../../../assets/icons/settings/computers.png"
import VisionSettingsIcon from "../../../assets/icons/settings/vision.png"
import InitialSetupImage from "../../../assets/icons/settings/initialsetup.png"
import {strings} from "../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../components/ButtonGroup/component"
import { MenuTooltip } from "../../../components/MenuTooltip/component"
import { fromGlobalStore } from "../../../stores/globalStore"
import { fromMenuStore, MenuDataState } from "../../../stores/menuStore"
import { MenuComponent } from "../../../types/menus"
import { ConsoleSettingsMenuContent } from "./ConsoleSettings"

export const SettingsMenuContent: MenuComponent = Object.assign(
    function SettingsMenuContent() {
        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const tabIndex = currentMenuState?.tabIndex ?? 0

        return (
            <div className="settings-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuUnderlay offset={4}/>
                <MenuContentContainer  index={1} offsetIndex={6}>
                    <MenuTitle title="Settings"/>
                    <div className="settings-menu-rows">
                        <div className="settings-menu-row" style={{alignItems: "start"}}>
                            <ButtonGroup>
                                <StandardButton selected={tabIndex === 0} iconImage={ConsoleSettingsIcon}>Console Settings</StandardButton>
                                <StandardButton selected={tabIndex === 1} iconImage={FamilySettingsIcon}>Family Settings</StandardButton>
                                <StandardButton selected={tabIndex === 2} iconImage={MemoryImage}>Memory</StandardButton>
                                <StandardButton selected={tabIndex === 3} iconImage={NetworkSettingsIcon}>Network Settings</StandardButton>
                                <StandardButton selected={tabIndex === 4} iconImage={ComputersIcon}>Computers</StandardButton>
                                <StandardButton selected={tabIndex === 5} iconImage={VisionSettingsIcon}>Xbox LIVE Vision</StandardButton>
                                <StandardButton selected={tabIndex === 6} iconImage={InitialSetupImage}>Initial Setup</StandardButton>
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
        getNextMenu: (tabIndex: number) => {
            const menus: Record<number, MenuDataState> = {
                0: {
                    tabIndex: 0,
                    maxTabIndex: 8,
                    content: ConsoleSettingsMenuContent
                } as MenuDataState,
            }
            
            return menus[tabIndex]
        }
    }
)
