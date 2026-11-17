import { useEffect, useState } from "react"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { DiscDrive } from "../../../components/DiscDrive/component"
import { StandardButton } from "../../../components/StandardButton/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX } from "../../../utils/constants"
import XboxLiveLogo from "../../../assets/Images/Xbox_Live.png"
import type { CSSProperties } from "react"
import "./index.css"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { PlayerCardButton } from "../../../components/PlayerCardButton/component"

import MessagesImage from "../../../assets/icons/xboxlive/messages.png"
import FriendsImage from "../../../assets/icons/xboxlive/friends.png"
import ChatAndImImage from "../../../assets/icons/xboxlive/chatandim.png"

import {strings} from "../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../components/ButtonGroup/component"
import { MenuTooltip } from "../../../components/MenuTooltip/component"
import { XboxLiveButton } from "../../../components/XboxLiveButton/component"
import { fromGlobalStore } from "../../../stores/globalStore"
import { fromMenuStore } from "../../../stores/menuStore"

export function XboxLiveMenuContent() {

    const currentOpenPage = fromGlobalStore(state => state.currentPage)
    const currentMenuState = fromMenuStore(state => {
        const content = state.menuData[currentOpenPage - 1]?.content
        return content?.[content.length - 1]
    })
    const tabIndex = currentMenuState?.tabIndex ?? 0

    return (
        <div className="live-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
            <MenuUnderlay offset={1}/>
            <MenuContentContainer index={1} offsetIndex={0}>
                <MenuTitle title="Xbox LIVE"/>
                <div className="live-menu-rows">
                    <div className="live-menu-row">
                        <div style={{width: "50%"}}>
                            <PlayerCardButton gamertag="archiecalvert"/>
                        </div>
                        <div style={{width: "50%"}}>
                            <img style={{width: "100%", paddingLeft: "27%", paddingRight: "27%", aspectRatio: "auto", boxSizing: "border-box", filter: "drop-shadow(0 0 3px black)"}} src={XboxLiveLogo}/>
                        </div>
                    </div>
                    <div className="live-menu-row" style={{alignItems: "start"}}>
                        <ButtonGroup>
                            <StandardButton selected={tabIndex == 1} iconImage={MessagesImage}>Messages</StandardButton>
                            <StandardButton selected={tabIndex == 2} iconImage={FriendsImage}>Friends</StandardButton>
                            <StandardButton selected={tabIndex == 3} iconImage={ChatAndImImage}>Chat and IM</StandardButton>
                            <XboxLiveButton/>
                        </ButtonGroup>
                        <MenuTooltip disableSideShadow>
                            <p>{strings.menus.games.profile_card.title}</p>
                            <p>{strings.menus.games.profile_card.description}</p>
                        </MenuTooltip>
                    </div>
                </div>
                <DiscDrive style={{position: "absolute", width: "100%", bottom: "2.5vh"}}/>
            </MenuContentContainer>
        </div>
    )
}