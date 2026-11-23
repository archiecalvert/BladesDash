import { MenuTitle } from "../../../../../components/MenuTitle/component"
import { MENU_Z_INDEX } from "../../../../../utils/constants"
import { useEffect, type CSSProperties } from "react"
import "./index.css"
import { MenuContentContainer } from "../../../../../components/MenuContentContainer/component"
import { fromGlobalStore } from "../../../../../stores/globalStore"
import { fromMenuStore } from "../../../../../stores/menuStore"
import { MenuComponent, StateMachineData } from "../../../../../types/menus"
import { PlaySound, SOUNDS } from "../../../../../utils/tauriWrapper"
import { MenuSelectionCarousel } from "../../../../../components/MenuSelectionCarousel/component"
import { ButtonGroup } from "../../../../../components/Buttons/ButtonGroup/component"
import { StandardButton } from "../../../../../components/Buttons/StandardButton/component"
import { GameTileButton } from "../../../../../components/Buttons/GameTileButton/component"

export const GamesLibraryMyGamesMenuContent: MenuComponent = Object.assign(
    function GamesLibraryMyGamesMenuContent() {
    
        const menuNames = [
            "All Games",
            "Arcade",
            "Demos",
            "Recently Downloaded",
            "Recently Played",
        ]

        const currentOpenPage = fromGlobalStore(state => state.currentPage)
        const currentMenuState = fromMenuStore(state => {
            const content = state.menuData[currentOpenPage - 1]?.content
            return content?.[content.length - 1]
        })
        const setNavigationBounds = fromMenuStore(
            state => state.setNavigationBounds
        )
        const tabIndexY = currentMenuState?.tabIndexY ?? 0
        const tabIndexX = currentMenuState?.tabIndexX ?? 0

        const games = ["s1", "s2", "s1", "s2", "s1", "s2", "s2", "s2"]

        useEffect(() => {
            setNavigationBounds(
                currentOpenPage,
                undefined,
                games.length - 1    // Maximum Y index
            )
        }, [currentOpenPage, games.length, setNavigationBounds])

    

        return (
            <div className="games-library-my-games-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuContentContainer  index={1} offsetIndex={6}>
                    <MenuTitle title="My Games"/>
                    <div className="games-library-my-games-menu-rows">
                        <MenuSelectionCarousel menuNames={menuNames}/>
                        <div className="games-library-my-games-menu-row" style={{alignItems: "start"}}>
                            <ButtonGroup>
                                {games.map((game, index) => {
                                    return <GameTileButton selected={tabIndexY == index}>{game}</GameTileButton>
                                })}
                            </ButtonGroup>
                        </div>
                        <div style={{height: "100%"}} className="games-library-my-games-menu-row">
                            <p className="games-library-my-games-title-position-text">{tabIndexY + 1} of {games.length}</p>
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
                const currentPage = context.globalStore.currentPage
                if (context.menuStore.decreaseTabIndexX(currentPage, 1)) PlaySound(SOUNDS.MENU_NAVIGATION)
            },

            triggerRightInput: (context: StateMachineData) => {
                const currentPage = context.globalStore.currentPage
                if (context.menuStore.increaseTabIndexX(currentPage, 1)) PlaySound(SOUNDS.MENU_NAVIGATION)
            },

            triggerEnterInput: (context: StateMachineData) => {
                return undefined
            },

            triggerBackInput: (context: StateMachineData) => {
                const currentPage = context.globalStore.currentPage
                context.menuStore.popMenuData(currentPage)
                PlaySound(SOUNDS.BACK)
            }
        }
    }
)
