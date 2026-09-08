import { useEffect, useState } from "react"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { DiscDrive } from "../../../components/DiscDrive/component"
import { StandardButton } from "../../../components/StandardButton/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX } from "../../../utils/constants"
import Xbox360Logo from "../../../assets/Images/Xbox_360.png"

import "./index.css"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { PlayerCardButton } from "../../../components/PlayerCardButton/component"

import MessagesImage from "../../../assets/Images/DefaultIcons/ico_32x_Mail.png"
import FriendsImage from "../../../assets/Images/DefaultIcons/ico_64x_friend.png"
import ChatAndImImage from "../../../assets/Images/DefaultIcons/icon-games.png"

import {strings} from "../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../components/ButtonGroup/component"

export function SettingsMenuContent() {
    return (
        <div className="settings-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
            <MenuContentContainer  index={1} offsetIndex={6}>
                <MenuTitle title="Settings"/>
                <div className="settings-menu-rows">
                    <div className="media-menu-row">
                        <ButtonGroup>
                            <StandardButton iconImage={MessagesImage}>Console Settings</StandardButton>
                            <StandardButton iconImage={FriendsImage}>Family Settings</StandardButton>
                            <StandardButton iconImage={ChatAndImImage}>Memory</StandardButton>
                            <StandardButton iconImage={ChatAndImImage}>Network Settings</StandardButton>
                            <StandardButton iconImage={ChatAndImImage}>Computers</StandardButton>
                            <StandardButton iconImage={ChatAndImImage}>Xbox LIVE Vision</StandardButton>
                            <StandardButton iconImage={ChatAndImImage}>Initial Setup</StandardButton>
                        </ButtonGroup>
                        <div className="menu-description-panel" style={{width: "50%", marginLeft: "5vh"}}>
                            <p>{strings.menus.games.profile_card.title}</p>
                            <p>{strings.menus.games.profile_card.description}</p>
                        </div>
                    </div>
                </div>
            </MenuContentContainer>
        </div>
    )
}

