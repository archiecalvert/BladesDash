import { useEffect, useState } from "react"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { DiscDrive } from "../../../components/DiscDrive/component"
import { StandardButton } from "../../../components/Buttons/StandardButton/component"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX } from "../../../utils/constants"
import Xbox360Logo from "../../../assets/Images/Xbox_360.png"
import type { CSSProperties } from "react"

import "./index.css"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import { PlayerCardButton } from "../../../components/PlayerCardButton/component"

import MusicIcon from "../../../assets/icons/media/music.png"
import PicturesIcon from "../../../assets/icons/media/pictures.png"
import VideosIcon from "../../../assets/icons/media/videos.png"
import VideosStoreIcon from "../../../assets/icons/media/store.png"
import MediaCenterIcon from "../../../assets/icons/media/center.png"

import {strings} from "../../../assets/Texts/en_strings"
import { ButtonGroup } from "../../../components/Buttons/ButtonGroup/component"
import { MenuTooltip } from "../../../components/MenuTooltip/component"
import { fromMenuStore } from "../../../stores/menuStore"
import { fromGlobalStore } from "../../../stores/globalStore"
import { MenuComponent, StateMachineData } from "../../../types/menus"
import { PlaySound, SOUNDS } from "../../../utils/tauriWrapper"

export const MediaMenuContent: MenuComponent = Object.assign(
    function MediaMenuContent() {
        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const tabIndexY = currentMenuState?.tabIndexY ?? 0
            
        return (
            <div className="media-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuContentContainer index={1} offsetIndex={4}>
                    <MenuTitle title="Media"/>
                    <div className="media-menu-rows">
                        <div className="media-menu-row">
                            <PlayerCardButton selected={tabIndexY === 0} gamertag="archiecalvert"/>
                            <img style={{width: "100%", paddingLeft: "27%", paddingRight: "27%", alignSelf: "center", aspectRatio: "auto", boxSizing: "border-box", filter: "drop-shadow(0 0 3px black)"}} src={Xbox360Logo}/>
                        </div>
                        <div className="media-menu-row" style={{alignItems: "start"}}>
                            <ButtonGroup>
                                <StandardButton selected={tabIndexY == 1} iconImage={MusicIcon}>Music</StandardButton>
                                <StandardButton selected={tabIndexY == 2} iconImage={PicturesIcon}>Pictures</StandardButton>
                                <StandardButton selected={tabIndexY == 3} iconImage={VideosIcon}>Videos</StandardButton>
                                <StandardButton selected={tabIndexY == 4} iconImage={VideosStoreIcon}>Video Store</StandardButton>
                                <StandardButton selected={tabIndexY == 5} iconImage={MediaCenterIcon}>Media Center</StandardButton>
                            </ButtonGroup>
                            <MenuTooltip>
                            {Object.values(strings.menus.media).map((string, index) => {
                                    return index === tabIndexY ? Object.values(string).map(s => {
                                        return <p>{s}</p>
                                    }) : null
                                })}
                            </MenuTooltip>
                        </div>
                    </div>
                    <DiscDrive selected={tabIndexY === 6} style={{position: "absolute", width: "100%", bottom: "2.5vh"}}/>
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