import { MenuTitle } from "../../../../../components/MenuTitle/component"
import { MENU_Z_INDEX } from "../../../../../utils/constants"
import { useEffect, useState, type CSSProperties } from "react"
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
import { LimitedButtonGroup } from "../../../../../components/Buttons/LimitedButtonGroup/component"

export const GamesLibraryMyGamesMenuContent: MenuComponent = Object.assign(
    function GamesLibraryMyGamesMenuContent() {
        const GAMES = [
            ["Halo 3", "Gears of War 2", "Forza Motorsport 4", "Fable II", "Call of Duty: Black Ops", "Red Dead Redemption", "Minecraft: Xbox 360 Edition", "Skate 3", "Left 4 Dead 2", "GTA IV", "Halo Reach", "Portal 2"],
            ["GTA V", "Halo 3", "Forza Horizon", "Fable III", "Call of Duty: Modern Warfare 2", "Skate 3", "Mass Effect 2", "Gears of War 3", "Batman: Arkham City", "Bioshock Infinite", "Red Dead Redemption", "Far Cry 3"],
            ["Gears of War", "Halo Reach", "Assassin's Creed II", "Forza Motorsport 4", "Call of Duty: Black Ops II", "Borderlands 2", "Minecraft: Xbox 360 Edition", "Fable II", "Dead Space", "Alan Wake", "Portal 2", "Saints Row: The Third"],
            ["Halo 4", "GTA V", "Gears of War 3", "Forza Horizon", "Skate 2", "Fallout 3", "Call of Duty: Modern Warfare 3", "Red Dead Redemption", "Batman: Arkham Asylum", "Left 4 Dead 2", "Bioshock", "Crackdown"]
        ];

        const [gamesList, setGamesList] = useState<string[]>(GAMES[0])

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
        const resetTabIndexY = fromMenuStore(state => state.resetTabIndexY)
        const tabIndexY = currentMenuState?.tabIndexY ?? 0
        const tabIndexX = currentMenuState?.tabIndexX ?? 0


        useEffect(() => {
            setNavigationBounds(
                currentOpenPage,
                undefined,
                gamesList.length - 1
            )
        }, [currentOpenPage, gamesList.length, setNavigationBounds])

        useEffect(() => {
            setGamesList(GAMES[Math.abs(tabIndexX % GAMES.length)])
            resetTabIndexY(currentOpenPage)
        }, [tabIndexX])
    

        return (
            <div className="games-library-my-games-menu-content" style={{"--menu-z-index": MENU_Z_INDEX} as CSSProperties}>
                <MenuContentContainer  index={1} offsetIndex={6}>
                    <MenuTitle title="My Games"/>
                    <div className="games-library-my-games-menu-rows">
                        <MenuSelectionCarousel menuNames={menuNames}/>
                        <div className="games-library-my-games-menu-row" style={{alignItems: "start"}}>
                            <LimitedButtonGroup limit={8} tabIndex={tabIndexY}>
                                {gamesList.map((game, _) => {
                                    return <GameTileButton selected={false}>{game}</GameTileButton>
                                })}
                            </LimitedButtonGroup>
                        </div>
                        <div style={{height: "100%"}} className="games-library-my-games-menu-row">
                            <p className="games-library-my-games-title-position-text">{tabIndexY + 1} of {gamesList.length}</p>
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
