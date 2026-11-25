
import { create } from "zustand"
import type { ReactElement } from "react"
import { BaseMenuData } from "../../data/baseMenuData"
import { MenuComponent, MenuStateMachineActions } from "../../types/menus"
import { GlobalState } from "../globalStore"

export interface MenuState {
    menuData: BladeData[]

    pushMenuData: (
        page: number,
        maxTabIndexX: number | undefined,
        maxTabIndexY: number | undefined,
        subMenu: MenuComponent,
        startTabIndexX?: number,
        startTabIndexY?: number
    ) => void

    popMenuData: (page: number) => void
    peekTopMenu: (page: number) => MenuDataState | undefined

    // Dynamically update navigation boundaries
    setNavigationBounds: (
        page: number,
        maxTabIndexX?: number,
        maxTabIndexY?: number
    ) => void

    increaseTabIndexX: (page: number, amount: number) => boolean
    decreaseTabIndexX: (page: number, amount: number) => boolean
    increaseTabIndexY: (page: number, amount: number) => boolean
    decreaseTabIndexY: (page: number, amount: number) => boolean
    resetTabIndexX: (page: number) => void
    resetTabIndexY: (page: number) => void

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
    maxTabIndexX?: number
    maxTabIndexY?: number
    content: MenuComponent
}

export const fromMenuStore = create<MenuState>((set, get) => ({
    menuData: Object.values(BaseMenuData),

    pushMenuData: (
        page,
        maxTabIndexX,
        maxTabIndexY,
        subMenu,
        startTabIndexX = 0,
        startTabIndexY = 0
    ) => {
        set((state) => ({
            menuData: state.menuData.map((menu, index) =>
                index !== page - 1
                    ? menu
                    : {
                        ...menu,
                        content: [
                            ...menu.content,
                            {
                                content: subMenu,
                                tabIndexX: startTabIndexX,
                                tabIndexY: startTabIndexY,
                                maxTabIndexX,
                                maxTabIndexY,
                            }
                        ]
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
        const menuData = get().menuData[page - 1]?.content
        return menuData?.[menuData.length - 1]
    },

    // Update the navigation boundaries of the active submenu
    setNavigationBounds: (page, maxTabIndexX, maxTabIndexY) => {
        set((state) => ({
            menuData: state.menuData.map((menu, index) => {
                if (index !== page - 1) return menu

                const lastIndex = menu.content.length - 1

                if (lastIndex < 0) return menu

                return {
                    ...menu,
                    content: menu.content.map((subMenu, subIndex) => {
                        if (subIndex !== lastIndex) return subMenu

                        return {
                            ...subMenu,

                            maxTabIndexX,
                            maxTabIndexY,

                            // Clamp current selection only when bounded
                            tabIndexX: maxTabIndexX === undefined
                                ? subMenu.tabIndexX
                                : Math.min(
                                    subMenu.tabIndexX,
                                    Math.max(0, maxTabIndexX)
                                ),

                            tabIndexY: maxTabIndexY === undefined
                                ? subMenu.tabIndexY
                                : Math.min(
                                    subMenu.tabIndexY,
                                    Math.max(0, maxTabIndexY)
                                )
                        }
                    })
                }
            })
        }))
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
                                        const nextIndex =
                                            subMenu.maxTabIndexX === undefined
                                                ? subMenu.tabIndexX + amount
                                                : Math.min(
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
                                        const prevIndex = subMenu.maxTabIndexX !== undefined 
                                            ? Math.max( subMenu.tabIndexX - amount, 0 )
                                            : subMenu.tabIndexX - amount

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
                                        const nextIndex =
                                            subMenu.maxTabIndexY === undefined
                                                ? subMenu.tabIndexY + amount
                                                : Math.min(subMenu.tabIndexY + amount, subMenu.maxTabIndexY)

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
                                        const prevIndex = subMenu.maxTabIndexY !== undefined
                                            ? Math.max( subMenu.tabIndexY - amount, 0 )
                                            : subMenu.tabIndexY - amount

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

    resetTabIndexX: (page) => {
        const content = get().menuData[page - 1]?.content
        const tabIndexX = content[content.length - 1].tabIndexX
        get().decreaseTabIndexX(page, tabIndexX)
        
    },

    resetTabIndexY: (page) => {
        const content = get().menuData[page - 1]?.content
        const tabIndexY = content[content.length - 1].tabIndexY
        get().decreaseTabIndexY(page, tabIndexY)
    },

    triggerMenuInput: (page, globalStore, input) => {
        const currentMenu = get().peekTopMenu(page)

        if (!currentMenu) return

        const { content, tabIndexX, tabIndexY } = currentMenu
        const menuStore = get()

        content.stateMachine[input]({
            tabIndexX,
            tabIndexY,
            globalStore,
            menuStore
        })
    },
}))
