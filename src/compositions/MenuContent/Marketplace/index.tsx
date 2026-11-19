import { MenuTitle } from "../../../components/MenuTitle/component"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { MENU_Z_INDEX } from "../../../utils/constants"
import type { CSSProperties } from "react"

import "./index.css"
import { fromGlobalStore } from "../../../stores/globalStore"
import { fromMenuStore } from "../../../stores/menuStore"
import { StandardButton } from "../../../components/StandardButton/component"
import { ButtonGroup } from "../../../components/ButtonGroup/component"
import { MenuTooltip } from "../../../components/MenuTooltip/component"
import { strings } from "../../../assets/Texts/en_strings"
import { MarketplaceXboxLiveContainer } from "../../../components/MarketplaceXboxLiveContainer/component"

import JoinXBLImage from "../../../assets/icons/marketplace/join_xbl.png"
import { MenuComponent, StateMachineData } from "../../../types/menus"
import { PlaySound, SOUNDS } from "../../../utils/tauriWrapper"

export const MarketplaceMenuContent: MenuComponent = Object.assign(
     function MarketplaceMenuContent() {  
        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const tabIndexY = currentMenuState?.tabIndexY ?? 0
        return (
            <div className="marketplace-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuContentContainer  index={1} offsetIndex={-2}>
                    <MenuTitle title="Marketplace"/>
                    <div className="marketplace-rows" style={{alignItems: "start"}}>
                        <div className="marketplace-row" style={{alignItems: "start"}}>
                            <MenuTooltip disableSideShadow disableTopShadow disablePadding>
                                {Object.values(strings.menus.marketplace).map((string, index) => {
                                    return index === tabIndexY ? Object.values(string).map(s => {
                                        return <p>{s}</p>
                                    }) : null
                                })}
                            </MenuTooltip>
                            <ButtonGroup>
                            <MarketplaceXboxLiveContainer selected={tabIndexY === 0}/>
                                <StandardButton height="7vh" buttonHeight="9vh" selected={tabIndexY === 1} iconImage={JoinXBLImage}>Join Xbox LIVE</StandardButton>
                            </ButtonGroup>
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
                context.globalStore.setCurrentPage(prev => prev + 1)
            },

            triggerEnterInput: (context: StateMachineData) => {
                return undefined
            },

            triggerBackInput: (context: StateMachineData) => {
                
            }
        }
    }
)