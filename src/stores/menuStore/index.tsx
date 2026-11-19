
import { create } from "zustand"
import type { ReactElement } from "react"
import { BaseMenuData } from "../../data/baseMenuData"
import { MenuComponent, MenuStateMachineActions, StateMachineData } from "../../types/menus"
import { GlobalState } from "../globalStore"

export interface MenuState {
    menuData: BladeData[]
    pushMenuData: (page: number,
                   maxTabIndexX: number,
                   maxTabIndexY: number,
                   subMenu: MenuComponent,
                   startTabIndexX?: number,
                   startTabIndexY?: number) => void
    popMenuData: (page: number) => void
    peekTopMenu: (page: number) => MenuDataState
    increaseTabIndexX: (page: number, amount: number) => boolean
    decreaseTabIndexX: (page: number, amount: number) => boolean
    increaseTabIndexY: (page: number, amount: number) => boolean
    decreaseTabIndexY: (page: number, amount: number) => boolean
    triggerMenuInput: (
        page: number,
        globalStore: GlobalState,
        input: keyof MenuStateMachineActions,
    ) => void
}

export interface BladeData {
    content: MenuDataState[]
    filter: ReactElement
}

export interface MenuDataState {
    tabIndexX: number
    tabIndexY: number
    maxTabIndexX: number
    maxTabIndexY: number
    content: MenuComponent
}

export const fromMenuStore = create<MenuState>((set, get) => ({
    menuData: Object.values(BaseMenuData),

    pushMenuData: (page, maxTabIndexX, maxTabIndexY, subMenu, startTabIndexX = 0, startTabIndexY = 0) => {
        set((state) => ({
            menuData: state.menuData.map((menu, index) =>
                index !== page - 1
                    ? menu
                    : {
                        ...menu,
                        content: [...menu.content, {
                            content: subMenu,
                            tabIndexX: startTabIndexX,
                            tabIndexY: startTabIndexY,
                            maxTabIndexX,
                            maxTabIndexY,
                        }]
                    }
            )
        }))
    },

    popMenuData: (page) => {
        set((state) => ({
            menuData: state.menuData.map((menu, index) =>
                index !== page - 1
                    ? menu
                    : {
                        ...menu,
                        content: menu.content.slice(0, -1)
                    }
            )
        }))
    },
    peekTopMenu: (page) => {
        const menuData = get().menuData[page - 1].content
        const len = menuData.length ?? 0
        return menuData[len - 1]
    },
    increaseTabIndexX: (page, amount) => {
        let updated = false

        set((state) => ({
            menuData: state.menuData.map((menu, index) =>
                index !== page - 1
                    ? menu
                    : {
                        ...menu,
                        content: menu.content.map((subMenu, subIndex) =>
                            subIndex !== menu.content.length - 1
                                ? subMenu
                                : {
                                    ...subMenu,
                                    tabIndexX: (() => {
                                        const nextIndex = Math.min(
                                            subMenu.tabIndexX + amount,
                                            subMenu.maxTabIndexX
                                        )

                                        updated = nextIndex !== subMenu.tabIndexX
                                        return nextIndex
                                    })()
                                }
                        )
                    }
            )
        }))

        return updated
    },
    decreaseTabIndexY: (page, amount) => {
        let updated = false

        set((state) => ({
            menuData: state.menuData.map((menu, index) =>
                index !== page - 1
                    ? menu
                    : {
                        ...menu,
                        content: menu.content.map((subMenu, subIndex) =>
                            subIndex !== menu.content.length - 1
                                ? subMenu
                                : {
                                    ...subMenu,
                                    tabIndexY: (() => {
                                        const prevIndex = Math.max(
                                            subMenu.tabIndexY - amount,
                                            0
                                        )

                                        updated = prevIndex !== subMenu.tabIndexY
                                        return prevIndex
                                    })()
                                }
                        )
                    }
            )
        }))

        return updated
    },

    decreaseTabIndexX: (page, amount) => {
        let updated = false

        set((state) => ({
            menuData: state.menuData.map((menu, index) =>
                index !== page - 1
                    ? menu
                    : {
                        ...menu,
                        content: menu.content.map((subMenu, subIndex) =>
                            subIndex !== menu.content.length - 1
                                ? subMenu
                                : {
                                    ...subMenu,
                                    tabIndexX: (() => {
                                        const prevIndex = Math.max(
                                            subMenu.tabIndexX - amount,
                                            0
                                        )

                                        updated = prevIndex !== subMenu.tabIndexX
                                        return prevIndex
                                    })()
                                }
                        )
                    }
            )
        }))

        return updated
    },
    increaseTabIndexY: (page, amount) => {
        let updated = false

        set((state) => ({
            menuData: state.menuData.map((menu, index) =>
                index !== page - 1
                    ? menu
                    : {
                        ...menu,
                        content: menu.content.map((subMenu, subIndex) =>
                            subIndex !== menu.content.length - 1
                                ? subMenu
                                : {
                                    ...subMenu,
                                    tabIndexY: (() => {
                                        const nextIndex = Math.min(
                                            subMenu.tabIndexY + amount,
                                            subMenu.maxTabIndexY
                                        )

                                        updated = nextIndex !== subMenu.tabIndexY
                                        return nextIndex
                                    })()
                                }
                        )
                    }
            )
        }))

        return updated
    },

    triggerMenuInput: (page, globalStore, input) => {
        const currentMenu = get().peekTopMenu(page)
        if (!currentMenu) return
        const { content, tabIndexX, tabIndexY } = currentMenu
        const menuStore = get()
        content.stateMachine[input]({tabIndexX, tabIndexY, globalStore, menuStore})
    },
}))

