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

export function MediaMenuContent(isOpen=false) {

    useEffect(() => {
        
    }, [])
    return (
        <div className="media-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
            <MenuContentContainer index={1} offsetIndex={4}>
                <MenuTitle title="Media"/>
                <div className="media-menu-rows">
                    <div className="media-menu-row">
                        <div style={{width: "50%"}}>
                            <PlayerCardButton/>
                        </div>
                        <div style={{width: "50%"}}>
                            <img style={{width: "100%", paddingLeft: "27%", paddingRight: "27%", aspectRatio: "auto", boxSizing: "border-box", filter: "drop-shadow(0 0 3px black)"}} src={Xbox360Logo}/>
                        </div>
                    </div>
                    <div className="media-menu-row">
                        <ButtonGroup>
                            <StandardButton iconImage={MessagesImage}>Music</StandardButton>
                            <StandardButton iconImage={FriendsImage}>Pictures</StandardButton>
                            <StandardButton iconImage={ChatAndImImage}>Videos</StandardButton>
                            <StandardButton iconImage={ChatAndImImage}>Video Store</StandardButton>
                            <StandardButton iconImage={ChatAndImImage}>Media Center</StandardButton>
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