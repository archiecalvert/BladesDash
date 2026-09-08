import { useEffect, useState } from "react"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { DiscDrive } from "../../../components/DiscDrive/component"
import { StandardButton } from "../../../components/StandardButton/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX } from "../../../utils/constants"
import XboxLiveLogo from "../../../assets/Images/Xbox_Live.png"

import "./index.css"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { PlayerCardButton } from "../../../components/PlayerCardButton/component"

import MessagesImage from "../../../assets/Images/DefaultIcons/ico_32x_Mail.png"
import FriendsImage from "../../../assets/Images/DefaultIcons/ico_64x_friend.png"
import ChatAndImImage from "../../../assets/Images/DefaultIcons/icon-games.png"

import {strings} from "../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../components/ButtonGroup/component"

export function XboxLiveMenuContent(isOpen=false) {

    useEffect(() => {
        
    }, [])
    return (
        <div className="live-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
            <MenuContentContainer index={1} offsetIndex={0}>
                <MenuTitle title="Xbox LIVE"/>
                <div className="live-menu-rows">
                    <div className="live-menu-row">
                        <div style={{width: "50%"}}>
                            <PlayerCardButton/>
                        </div>
                        <div style={{width: "50%"}}>
                            <img style={{width: "100%", paddingLeft: "27%", paddingRight: "27%", aspectRatio: "auto", boxSizing: "border-box", filter: "drop-shadow(0 0 3px black)"}} src={XboxLiveLogo}/>
                        </div>
                    </div>
                    <div className="live-menu-row">
                        <ButtonGroup>
                            <StandardButton iconImage={MessagesImage}>Messages</StandardButton>
                            <StandardButton iconImage={FriendsImage}>Friends</StandardButton>
                            <StandardButton iconImage={ChatAndImImage}>Chat and IM</StandardButton>
                        </ButtonGroup>
                        <div className="menu-description-panel" style={{width: "50%", marginLeft: "5vh"}}>
                            <p>{strings.menus.games.profile_card.title}</p>
                            <p>{strings.menus.games.profile_card.description}</p>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: "26vh"}}>
                    <DiscDrive style={{}} />
                </div>
            </MenuContentContainer>
        </div>
    )
}