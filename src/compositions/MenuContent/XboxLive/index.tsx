import { useEffect, useState } from "react"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { DiscDrive } from "../../../components/DiscDrive/component"
import { StandardButton } from "../../../components/Buttons/StandardButton/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX } from "../../../utils/constants"
import XboxLiveLogo from "../../../assets/Images/Xbox_Live.png"
import type { CSSProperties } from "react"
import "./index.css"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { PlayerCardButton } from "../../../components/PlayerCardButton/component"

import MessagesImage from "../../../assets/Rips/bl/friends/ico_32x_Mail.png"
import FriendsImage from "../../../assets/icons/xboxlive/friends.png"
import ChatAndImImage from "../../../assets/icons/xboxlive/chatandim.png"

import {strings} from "../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../components/Buttons/ButtonGroup/component"
import { MenuTooltip } from "../../../components/MenuTooltip/component"
import { XboxLiveButton } from "../../../components/XboxLiveButton/component"
import { fromGlobalStore } from "../../../stores/globalStore"
import { fromMenuStore } from "../../../stores/menuStore"
import { MenuComponent, StateMachineData } from "../../../types/menus"
import { PlaySound, SOUNDS } from "../../../utils/tauriWrapper"

export const XboxLiveMenuContent: MenuComponent = Object.assign(
    function XboxLiveMenuContent() {

        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const tabIndexY = currentMenuState?.tabIndexY ?? 0

        return (
            <div className="live-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuContentContainer index={1} offsetIndex={0}>
                    <MenuTitle title="Xbox LIVE"/>
                    <div className="live-menu-rows">
                        <div className="live-menu-row">
                            <PlayerCardButton selected={tabIndexY === 0} gamertag="archiecalvert"/>
                            <img style={{width: "100%", paddingLeft: "27%", paddingRight: "27%", alignSelf:"center",  aspectRatio: "auto", boxSizing: "border-box", filter: "drop-shadow(0 0 3px black)"}} src={XboxLiveLogo}/>
                        </div>
                        <div className="live-menu-row" style={{alignItems: "start"}}>
                            <ButtonGroup>
                                <StandardButton selected={tabIndexY === 1} iconImage={MessagesImage}>Messages</StandardButton>
                                <StandardButton selected={tabIndexY === 2} iconImage={FriendsImage}>Friends</StandardButton>
                                <StandardButton selected={tabIndexY === 3} iconImage={ChatAndImImage}>Chat and IM</StandardButton>
                                <XboxLiveButton selected={tabIndexY === 4}/>
                            </ButtonGroup>
                            <MenuTooltip disableSideShadow>
                            {Object.values(strings.menus.xbox_live).map((string, index) => {
                                    return index === tabIndexY ? Object.values(string).map(s => {
                                        return <p>{s}</p>
                                    }) : null
                                })}
                            </MenuTooltip>
                        </div>
                    </div>
                    <DiscDrive selected={tabIndexY === 5} style={{position: "absolute", width: "100%", bottom: "2.5vh"}}/>
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
                return undefined
            },

            triggerBackInput: (context: StateMachineData) => {

            }
        }
    }
)