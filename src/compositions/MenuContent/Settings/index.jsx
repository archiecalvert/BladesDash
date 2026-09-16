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

import ConsoleSettingsIcon from "../../../assets/icons/settings/console.png"
import FamilySettingsIcon from "../../../assets/icons/settings/family.png"
import MemoryImage from "../../../assets/icons/settings/memory.png"
import NetworkSettingsIcon from "../../../assets/icons/settings/network.png"
import VisionSettingsIcon from "../../../assets/icons/settings/vision.png"
import InitialSetupImage from "../../../assets/icons/settings/initialsetup.png"


import {strings} from "../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../components/ButtonGroup/component"

export function SettingsMenuContent() {
    return (
        <div className="settings-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
            <MenuContentContainer  index={1} offsetIndex={6}>
                <MenuTitle title="Settings"/>
                <div className="settings-menu-rows">
                    <div className="media-menu-row" style={{alignItems: "start"}}>
                        <ButtonGroup>
                            <StandardButton iconImage={ConsoleSettingsIcon}>Console Settings</StandardButton>
                            <StandardButton iconImage={FamilySettingsIcon}>Family Settings</StandardButton>
                            <StandardButton iconImage={MemoryImage}>Memory</StandardButton>
                            <StandardButton iconImage={NetworkSettingsIcon}>Network Settings</StandardButton>
                            <StandardButton iconImage={NetworkSettingsIcon}>Computers</StandardButton>
                            <StandardButton iconImage={VisionSettingsIcon}>Xbox LIVE Vision</StandardButton>
                            <StandardButton iconImage={InitialSetupImage}>Initial Setup</StandardButton>
                        </ButtonGroup>
                        <div className="menu-description-panel" style={{width: "50%", alignSelf: "start"}}>
                            <div style={{marginLeft: "5vh"}}>
                                <p>{strings.menus.games.profile_card.title}</p>
                                <p>{strings.menus.games.profile_card.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MenuContentContainer>
        </div>
    )
}

