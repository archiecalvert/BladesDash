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
import { MenuComponent, StateMachineData } from "../../../types/menus"
import { ConsoleSettingsMenuContent } from "./ConsoleSettings"
import { PlaySound, SOUNDS } from "../../../utils/tauriWrapper"
import { FamilySettingsMenuContent } from "./FamilySettings"
import { MemorySettingsMenuContent } from "./Memory"
import { NetworkSettingsMenuContent } from "./NetworkSettings"
import { ComputersSettingsMenuContent } from "./Computers"
import { VisionSettingsMenuContent } from "./Vision"

export const SettingsMenuContent: MenuComponent = Object.assign(
    function SettingsMenuContent() {
        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const tabIndexY = currentMenuState?.tabIndexY ?? 0

        return (
            <div className="settings-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuContentContainer  index={1} offsetIndex={6}>
                    <MenuTitle title="Settings"/>
                    <div className="settings-menu-rows">
                        <div className="settings-menu-row" style={{alignItems: "start"}}>
                            <ButtonGroup>
                                <StandardButton selected={tabIndexY === 0} iconImage={ConsoleSettingsIcon}>Console Settings</StandardButton>
                                <StandardButton selected={tabIndexY === 1} iconImage={FamilySettingsIcon}>Family Settings</StandardButton>
                                <StandardButton selected={tabIndexY === 2} iconImage={MemoryImage}>Memory</StandardButton>
                                <StandardButton selected={tabIndexY === 3} iconImage={NetworkSettingsIcon}>Network Settings</StandardButton>
                                <StandardButton selected={tabIndexY === 4} iconImage={ComputersIcon}>Computers</StandardButton>
                                <StandardButton selected={tabIndexY === 5} iconImage={VisionSettingsIcon}>Xbox LIVE Vision</StandardButton>
                                <StandardButton selected={tabIndexY === 6} iconImage={InitialSetupImage}>Initial Setup</StandardButton>
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
                context.globalStore.setCurrentPage(prev => prev - 1)
            },
            
            triggerRightInput: (context: StateMachineData) => {
            },

            triggerEnterInput: (context: StateMachineData) => {
                PlaySound(SOUNDS.SELECT)    
                const menus: Record<number, MenuDataState> = {
                    0: {
                        tabIndexX: 0,
                        tabIndexY: 0,
                        maxTabIndexX: 0,
                        maxTabIndexY: 8,
                        content: ConsoleSettingsMenuContent
                    } as MenuDataState,
                    1: {
                        tabIndexX: 0,
                        tabIndexY: 0,
                        maxTabIndexX: 0,
                        maxTabIndexY: 1,
                        content: FamilySettingsMenuContent,
                    } as MenuDataState,
                    2: {
                        tabIndexX: 0,
                        tabIndexY: 0,
                        maxTabIndexX: 0,
                        maxTabIndexY: 0,
                        content: MemorySettingsMenuContent
                    } as MenuDataState,
                    3: {
                        tabIndexX: 0,
                        tabIndexY: 0,
                        maxTabIndexX: 0,
                        maxTabIndexY: 4,
                        content: NetworkSettingsMenuContent
                    } as MenuDataState,
                    4: {
                        tabIndexX: 0,
                        tabIndexY: 0,
                        maxTabIndexX: 0,
                        maxTabIndexY: 0,
                        content: ComputersSettingsMenuContent
                    } as MenuDataState,
                    5: {
                        tabIndexX: 0,
                        tabIndexY: 0,
                        maxTabIndexX: 0,
                        maxTabIndexY: 0,
                        content: VisionSettingsMenuContent
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
                PlaySound(SOUNDS.SECOND_LEVEL_OPEN)
            },

            triggerBackInput: (context: StateMachineData) => {

            }
        }
    }
)
